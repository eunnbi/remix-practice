import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

import * as styles from './Button.css';

import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Button = ({
  asChild,
  children,
  className,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={clsx(styles.button, className)} {...props}>
      {children}
    </Comp>
  );
};
