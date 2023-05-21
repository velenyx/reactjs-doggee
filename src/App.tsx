import React, { useEffect, useState } from 'react';

import { IntlProvider } from '@features';
import { LoginPage, RegistrationPage } from '@pages';
import { deleteCookie, getCookies, getLocale, getMessages } from '@utils/helpers';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

const AuthRoutes = () => (
  <Routes>
    <Route path='/auth' element={<LoginPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='*' element={<Navigate to='/auth' replace />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    {/* <Route path='/404' element={<NotFoundPage />} /> */}
    <Route path='*' element={<Navigate to='/main' />} />
  </Routes>
);

export const App = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [messages, setMessages] = useState({});
  const locale = getLocale();

  useEffect(() => {
    const authCookie = getCookies('refreshToken');
    const isNotMyDevice = getCookies('doggee-isNotMyDevice');

    const deviceExpire = isNotMyDevice && new Date().getTime() > new Date(+isNotMyDevice).getTime();
    if (authCookie && deviceExpire) {
      deleteCookie('refreshToken');
      deleteCookie('doggee-isNotMyDevice');
    }

    if (authCookie && !deviceExpire) {
      setIsAuth(true);
    }

    getMessages(locale).then((messages) => {
      setMessages(messages);
      setIsLoading(false);
    });
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
    </IntlProvider>
  );
};
