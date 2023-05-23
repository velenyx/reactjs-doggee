import { FC, useRef } from 'react';

import styles from '../Input.module.css';

export const Input: FC<InputProps> = ({ isError = false, helperText, label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        role='button'
        className={`${styles.input__container} ${
          isError ? styles.input__error : styles.input__container
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <input ref={inputRef} className={styles.input} {...props} />
        <label htmlFor={props.id} className={styles.input__label}>
          {label}
        </label>
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  );
};
