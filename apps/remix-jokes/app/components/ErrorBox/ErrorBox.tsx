import * as styles from './ErrorBox.css';

import type { ReactNode } from 'react';

interface ErrorBoxProps {
  children: ReactNode;
}

export const ErrorBox = ({ children }: ErrorBoxProps) => {
  return <div className={styles.box}>{children}</div>;
};
