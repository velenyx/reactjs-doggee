import React, { useState } from 'react';

import { Button } from '../../common/buttons';
import { Input } from '../../common/fields';

import './LoginPage.css';

export const LoginPage = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });

  return (
    <div className='login_page'>
      <div className='login_page_container'>
        <div>DOGGEE</div>
        <div className='login_page__form_container'>
          <div className='login_page_input_container'>
            <Input
              isError
              helperText='validation'
              value={formValues.username}
              placeholder='username'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, username: event.target.value })
              }
            />
          </div>
          <div className='login_page_input_container'>
            <Input
              value={formValues.password}
              placeholder='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, password: event.target.value })
              }
            />
          </div>
          <div>
            <Button>Sign in</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
