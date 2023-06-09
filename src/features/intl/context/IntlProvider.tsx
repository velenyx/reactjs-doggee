import React, { useMemo } from 'react';

import type { IntlContextProps } from './IntlContext';
import { IntlContext } from './IntlContext';

interface IntlProviderProps extends IntlContextProps {
  children: JSX.Element;
}

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, messages, children }) => {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);

  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
};
