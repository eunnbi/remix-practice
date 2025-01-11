import { Link } from '@remix-run/react';

import * as styles from './JokeList.css';

interface JokeListProps {
  jokes: {
    id: string;
    name: string;
  }[];
}

export const JokeList = ({ jokes }: JokeListProps) => {
  return jokes.length > 0 ? (
    <ul className={styles.box}>
      {jokes.map(({ id, name }) => (
        <li key={id}>
          <Link to={id} className={styles.link}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.box}>
      <p className={styles.emptyMessage}>No results</p>
    </div>
  );
};
