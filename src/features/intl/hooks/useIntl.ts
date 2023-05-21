/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { IntlContext } from '../';

export interface TranslateMessageProps {
  path: string;
  values?: Record<string, string | number | boolean>;
}

export const useIntl = () => {
  const intl = React.useContext(IntlContext);

  const translateMessage = (
    path: TranslateMessageProps['path'],
    values?: TranslateMessageProps['values']
  ) => {
    if (!intl.messages[path]) return path;
    if (!values) return intl.messages[path];

    let translate = intl.messages[path];
    for (const key in values) {
      translate = translate.replace(`{${key}}`, String(values[key]));
    }

    return translate;
  };

  return { locale: intl.locale, translateMessage };
};
