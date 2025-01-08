import { Button, TextField } from '@remix-practice/design-system';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';

import { action } from './action';
import * as styles from './route.css';

export { action };

export default function SignInRoute() {
  const data = useActionData<typeof action>();
  const { state } = useNavigation();
  const submitting = state === 'submitting';
  return (
    <div className={styles.box} data-light=''>
      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>
        <Form method='post' className={styles.form}>
          <TextField.Root isError={Boolean(data?.errors.username)}>
            <TextField.Label htmlFor='username'>Username</TextField.Label>
            <TextField.Input id='username' name='username' />
            <TextField.Message>{data?.errors.username}</TextField.Message>
          </TextField.Root>
          <TextField.Root isError={Boolean(data?.errors?.password)}>
            <TextField.Label htmlFor='password'>Password</TextField.Label>
            <TextField.Input id='password' name='password' type='password' />
            <TextField.Message>{data?.errors.password}</TextField.Message>
          </TextField.Root>
          <p className={styles.errorMessage}>{data?.errors.form}</p>
          <Button type='submit' className='button' disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
        <ul className={styles.links}>
          <li>
            <Link to='/' className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/jokes' className={styles.link}>
              Jokes
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
