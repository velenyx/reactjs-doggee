import React, { useState } from 'react';

import { Button } from '@common/buttons';
import { CheckBox, Input, PasswordInput } from '@common/fields';
import { IntlText } from '@features';
import { api } from '@utils/api';
import { setCookie } from '@utils/helpers';
import { useMutation } from '@utils/hooks';
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
  password: validatePassword
};

const validateLoginForm = (name: 'username' | 'password', value: string) =>
  loginFormValidateSchema[name](value);

interface FormErrors {
  username: string | null;
  password: string | null;
}

interface User {
  username: string;
  password: string;
  _id: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    isNotMyDevice: false
  });
  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation<
    typeof formValues,
    ApiResponse<User[]>
  >((values) => api.post('login', values));

  // const { data, isLoading } = useQuery<User[]>(() => api.get('users'));
  // console.log('@data', data);
  // const { query, isLoading } = useQueryLazy<User[]>(() => api.get('users'));
  // console.log('@query', query);

  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: null,
    password: null
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header__container}>DOGGEE</div>
        <form
          className={styles.form__container}
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const response = await authMutation(formValues);

            if (response && formValues.isNotMyDevice) {
              setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
            }
            // const response = await query();
          }}
        >
          <div className={styles.input__container}>
            <Input
              disabled={authLoading}
              value={formValues.username}
              label='username'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });
                const error = validateLoginForm('username', username);
                setFormErrors({ ...formErrors, username: error });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username
              })}
            />
          </div>
          <div className={styles.input__container}>
            <PasswordInput
              disabled={authLoading}
              value={formValues.password}
              label='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });
                const error = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: error });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password
              })}
            />
          </div>
          <div>
            <CheckBox
              disabled={authLoading}
              checked={formValues.isNotMyDevice}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const notMyComputer = event.target.checked;
                setFormValues({ ...formValues, isNotMyDevice: notMyComputer });
              }}
            />
          </div>
          <div>
            <Button isLoading={authLoading} type='submit'>
              <IntlText path='button.signIn' />
            </Button>
          </div>
        </form>
        <div
          role='link'
          tabIndex={0}
          aria-hidden
          className={styles.signup__container}
          onClick={() => navigate('/registration')}
        >
          <IntlText path='page.login.createNewAccount' />
        </div>
      </div>
    </div>
  );
};
