import React, { FC } from 'react';

import './Button.css';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ children }) => <button>{children}</button>;
