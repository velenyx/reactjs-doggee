import React from 'react';

import { Button } from '@common/buttons';
import { CheckBox, Input, PasswordInput } from '@common/fields';
import { IntlText } from '@features';
import { api } from '@utils/api';
import { setCookie } from '@utils/helpers';
import { useForm, useMutation } from '@utils/hooks';
import { useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validateUsername = (value: string) => validateIsEmpty(value);

const validatePassword = (value: string) => validateIsEmpty(value);

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword,
  test: 123
};

// const validateLoginForm = (name: 'username' | 'password', value: string) =>
//   loginFormValidateSchema[name](value);

interface FormValues {
  username: string;
  password: string;
  isNotMyDevice: boolean;
}

interface User {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  // isLoading: authLoading
  const { mutationAsync: authMutation } = useMutation<FormValues, ApiResponse<User[]>>((values) =>
    api.post('login', values)
  );

  const { values, errors, setFieldValue, handleSubmit } = useForm<FormValues>({
    initialValues: {
      username: '',
      password: '',
      isNotMyDevice: false
    },
    validateSchema: loginFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log('@values', values);
      const response = await authMutation(values);

      if (response && values.isNotMyDevice) {
        setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
      }
      // const response = await query();
      console.log('@response', response);
    }
  });

  // const { data, isLoading } = useQuery<User[]>(() => api.get('users'));
  // console.log('@data', data);
  // const { query, isLoading } = useQueryLazy<User[]>(() => api.get('users'));
  // console.log('@query', query);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header__container}>DOGGEE</div>
        <form className={styles.form__container} onSubmit={handleSubmit}>
          <div className={styles.input__container}>
            <Input
              // disabled={authLoading}
              value={values?.username}
              label='username'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFieldValue('username', username);
              }}
              {...(!!errors?.username && {
                isError: !!errors.username,
                helperText: errors.username
              })}
            />
          </div>
          <div className={styles.input__container}>
            <PasswordInput
              // disabled={authLoading}
              value={values?.password}
              label='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFieldValue('password', password);
              }}
              {...(!!errors?.password && {
                isError: !!errors.password,
                helperText: errors.password
              })}
            />
          </div>
          <div>
            <CheckBox
              // disabled={authLoading}
              checked={values?.isNotMyDevice}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const notMyComputer = event.target.checked;
                setFieldValue('isNotMyDevice', notMyComputer);
              }}
            />
          </div>
          <div>
            {/* isLoading={isSubmiting} */}
            <Button type='submit'>
              <IntlText path='button.signIn' />
            </Button>
          </div>
        </form>
        <div
          aria-hidden
          role='link'
          tabIndex={0}
          className={styles.signup__container}
          onClick={() => navigate('/registration')}
        >
          <IntlText path='page.login.createNewAccount' />
        </div>
      </div>
    </div>
  );
};
