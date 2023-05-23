import { FC } from 'react';

import styles from './CheckBox.module.css';

export const CheckBox: FC<InputProps> = ({ label, ...props }) => (
  <label htmlFor={props.id} className={styles.checkbox__container}>
    <input
      name='device'
      type='checkbox'
      className={styles.checkbox}
      checked={props.checked}
      {...props}
    />
    <span className={styles.custom__checkbox} />
    <span className={styles.checkbox__label}>{label}</span>
  </label>
);
