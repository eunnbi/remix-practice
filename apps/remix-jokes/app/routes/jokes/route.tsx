import { Button } from '@remix-practice/design-system';
import { Link, Outlet, useFetcher, useLoaderData } from '@remix-run/react';

import { loader } from './loader.server';
import * as styles from './route.css';

export { loader };

export default function JokesRoute() {
  const fetcher = useFetcher();
  const { jokes, user } = useLoaderData<typeof loader>();

  return (
    <div className={styles.box}>
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
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.listBox}>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {jokes.map(({ id, name }) => (
                <li key={id}>
                  <Link to={id} className={styles.link}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button className={styles.button} asChild>
              <Link to='.'>Get a random joke</Link>
            </Button>
            <Button className={styles.button} asChild>
              <Link to='new'>Add your own</Link>
            </Button>
          </div>
          <div className={styles.outletBox}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
