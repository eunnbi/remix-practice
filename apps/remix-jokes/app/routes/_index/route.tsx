import { Link } from '@remix-run/react';

import * as styles from './route.css';

export default function IndexRoute() {
  return (
    <div className={styles.box}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Remix <span className={styles.emphasis}>Jokes!</span>
        </h1>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link to='jokes' className={styles.link}>
                Read Jokes
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
