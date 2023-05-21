import { FC } from 'react';

import type { TranslateMessageProps } from '../hooks/useIntl';
import { useIntl } from '../hooks/useIntl';

interface IntlTextProps extends TranslateMessageProps {
  children?: (message: string) => JSX.Element;
}

export const IntlText: FC<IntlTextProps> = ({ path, values, children }) => {
  const intl = useIntl();

  if (children && typeof children === 'function') {
    return <>{children(intl.translateMessage(`${path}`, values))}</>;
  }

  return <>{intl.translateMessage(`${path}`, values)}</>;
};
