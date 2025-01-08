import { Button, TextField } from '@remix-practice/design-system';
import { Form, useActionData, useNavigation } from '@remix-run/react';

import * as styles from './route.css';

import type { action } from './action';

export { action } from './action';
export { ErrorBoundary } from './error';
export { loader } from './loader';

export default function JokesNewRoute() {
  const data = useActionData<typeof action>();
  const { state } = useNavigation();
  const submitting = state === 'submitting';

  return (
    <div>
      <p>Add your own hilarious joke</p>
      <Form method='post' className={styles.form}>
        <TextField.Root isError={Boolean(data?.errors.name)}>
          <TextField.Label htmlFor='name' className={styles.label}>
            Name
          </TextField.Label>
          <TextField.Input id='name' name='name' />
          <TextField.Message>{data?.errors.name}</TextField.Message>
        </TextField.Root>
        <TextField.Root isError={Boolean(data?.errors.content)}>
          <TextField.Label htmlFor='content' className={styles.label}>
            Content
          </TextField.Label>
          <TextField.Input id='content' name='content' />
          <TextField.Message>{data?.errors.content}</TextField.Message>
        </TextField.Root>
        <Button type='submit' className='button' disabled={submitting}>
          {submitting ? 'Adding...' : 'Add'}
        </Button>
      </Form>
    </div>
  );
}
