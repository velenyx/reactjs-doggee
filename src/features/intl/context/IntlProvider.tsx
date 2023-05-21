import React from 'react';

import type { IntlContextProps } from './IntlContext';
import { IntlContext } from './IntlContext';

interface IntlProviderProps extends IntlContextProps {
  children: JSX.Element;
}

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, messages, children }) => {
  return <IntlContext.Provider value={{ locale, messages }}>{children}</IntlContext.Provider>;
};
