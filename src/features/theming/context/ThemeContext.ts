import React from 'react';

export type Theme = 'light' | 'dark';

export interface ThemingContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemingContextProps>({
  theme: 'light',
  setTheme: () => {}
});
