import { Button } from '@remix-practice/design-system';
import { Link, useFetcher } from '@remix-run/react';

import * as styles from './Header.css';

interface HeaderProps {
  user: { id: string; username: string } | null;
}

export const Header = ({ user }: HeaderProps) => {
  const fetcher = useFetcher();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link
          to='/'
          title='Remix Jokes'
          aria-label='Remix Jokes'
          className={styles.homeLink}
        >
          <h1>J🤪KES</h1>
        </Link>
        {user ? (
          <div className={styles.row}>
            <span>{`Hi ${user.username}`}</span>
            <fetcher.Form action='/sign-out' method='post'>
              <Button type='submit'>Logout</Button>
            </fetcher.Form>
          </div>
        ) : (
          <div className={styles.row}>
            <Link to='/sign-in' className={styles.link}>
              Sign in
            </Link>
            <Link to='/sign-up' className={styles.link}>
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
