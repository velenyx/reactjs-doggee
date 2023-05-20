import React, { FC } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, isLoading = false }) => (
  <button className={styles.button} disabled={isLoading}>
    {!isLoading && children}
    {isLoading && <div className={styles.dot__flashing} />}
  </button>
);
