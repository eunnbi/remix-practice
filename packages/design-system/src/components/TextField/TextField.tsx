import { createContext, useContext } from 'react';

import { clsx } from '~/utils/clsx';

import * as styles from './TextField.css';

import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';

const Context = createContext<Pick<RootProps, 'isError'>>({ isError: false });

interface RootProps {
  children: ReactNode;
  className?: string;
  isError: boolean;
}
export const Root = ({ children, className, ...props }: RootProps) => {
  return (
    <Context.Provider value={props}>
      <div className={className}>{children}</div>
    </Context.Provider>
  );
};

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      {children}
    </label>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Input = ({ className, ...props }: InputProps) => {
  const { isError } = useContext(Context);
  return (
    <input
      {...props}
      className={clsx(styles.input, className)}
      aria-invalid={isError}
    />
  );
};

interface MessageProps extends HTMLAttributes<HTMLParagraphElement> {}
export const Message = ({ children }: MessageProps) => {
  const { isError } = useContext(Context);
  return (
    <p className={styles.message} role={isError ? 'alert' : undefined}>
      {children}
    </p>
  );
};
