import React from 'react';

import { IntlContext } from '../';

export const useIntl = () => {
  const intl = React.useContext(IntlContext);

  const translateMessage = (
    path: TranslateMessage['path'],
    values?: TranslateMessage['values']
  ) => {
    if (!intl.messages[path]) return path;
    if (!values) return intl.messages[path];

    const translate = intl.messages[path];
    Object.keys(values).forEach((key) => {
      translate.replace(`{${key}}`, String(values[key]));
    });

    return translate;
  };

  return { locale: intl.locale, translateMessage };
};
