import React, { useMemo, useState } from 'react';

import { setCookie } from '@utils/helpers';

import darkTheme from '../../../static/themes/dark/dark.module.css';
import lightTheme from '../../../static/themes/light/light.module.css';

import type { Theme, ThemingContextProps } from '.';
import { ThemeContext } from '.';

interface ThemingProviderProps extends Omit<ThemingContextProps, 'setTheme'> {
  children: JSX.Element;
}

export const ThemeProvider: React.FC<ThemingProviderProps> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const setTheme = (theme: Theme) => {
    setCookie('doggee-theme', theme);
    setCurrentTheme(theme);
  };

  const value = useMemo(() => ({ theme: currentTheme, setTheme }), []);

  return (
    <ThemeContext.Provider value={value}>
      <div className={currentTheme === 'dark' ? darkTheme.container : lightTheme.container}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
