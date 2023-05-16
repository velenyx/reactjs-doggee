import React, { FC } from 'react';

import './Input.css';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  isError?: boolean;
  helperText?: string;
}

export const Input: FC<InputProps> = ({ isError = false, helperText, ...props }) => {
  const className = isError ? 'input__error' : '';

  return (
    <div>
      <input className={className} {...props} />
      {isError && helperText && <div className='input__helper_text'>{helperText}</div>}
    </div>
  );
};
