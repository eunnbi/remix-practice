import { Button } from '@remix-practice/design-system';
import { Form, Link } from '@remix-run/react';

import * as styles from './Joke.css';

interface JokeProps {
  name: string;
  content: string;
  isOwner: boolean;
  ownerName?: string;
}

export const Joke = ({ name, content, isOwner, ownerName }: JokeProps) => {
  return (
    <div className={styles.box}>
      <p className={styles.content}>{content}</p>
      {ownerName && <span>-{ownerName}-</span>}
      <Link to='.' className={styles.link}>
        &ldquo;{name}&ldquo; Permalink
      </Link>
      {isOwner ? (
        <Form method='post'>
          <Button
            name='intent'
            value='delete'
            type='submit'
            className={styles.button}
          >
            Delete
          </Button>
        </Form>
      ) : null}
    </div>
  );
};
