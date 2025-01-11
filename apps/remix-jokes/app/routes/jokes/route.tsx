import { Button } from '@remix-practice/design-system';
import { Link, Outlet, useLoaderData } from '@remix-run/react';

import { Header } from './components/Header/Header';
import { JokeList } from './components/JokeList/JokeList';
import { SearchBar } from './components/SearchBar/SearchBar';
import { loader } from './loader.server';
import * as styles from './route.css';

export { loader };

export default function JokesRoute() {
  const { jokes, user } = useLoaderData<typeof loader>();

  return (
    <div className={styles.box}>
      <Header user={user} />
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.sideBox}>
            <SearchBar />
            <p>Here are jokes to check out:</p>
            <JokeList jokes={jokes} />
            <Button asChild>
              <Link to='.'>Get a random joke</Link>
            </Button>
            <Button asChild>
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
