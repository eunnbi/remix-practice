import { type ActionFunctionArgs, data } from '@remix-run/node';
import * as v from 'valibot';

import { login } from '~/models/user.server';
import { createUserSession } from '~/session.server';
import { getErrorMessage } from '~/utils/validation';

const payloadSchema = v.object({
  username: v.pipe(
    v.string('Username must be a string'),
    v.minLength(1, 'Username is required')
  ),
  password: v.pipe(
    v.string('Password must be a string'),
    v.minLength(1, 'Password is required')
  ),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    throw new Response(null, { status: 405 });
  }
  const formData = await request.formData();

  const parsed = v.safeParse(payloadSchema, Object.fromEntries(formData));
  if (!parsed.success) {
    return data(
      {
        errors: {
          username: getErrorMessage(parsed.issues, 'username'),
          password: getErrorMessage(parsed.issues, 'password'),
          form: null,
        },
      },
      { status: 400 }
    );
  }

  const { username, password } = parsed.output;
  const user = await login(username, password);

  if (user === null) {
    return data(
      {
        errors: {
          username: null,
          password: null,
          form: 'The username or password does not match',
        },
      },
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirectTo') ?? '/jokes';
  return createUserSession(request, user.id, redirectTo);
};
