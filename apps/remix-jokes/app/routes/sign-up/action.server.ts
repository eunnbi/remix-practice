import { type ActionFunctionArgs, data } from '@remix-run/node';
import * as v from 'valibot';

import { createUser, getUserByName } from '~/models/user.server';
import { createUserSession } from '~/session.server';
import { getErrorMessage } from '~/utils/validation';

const payloadSchema = v.object({
  username: v.pipe(
    v.string('Username must be a string'),
    v.minLength(1, 'Username is required'),
    v.minLength(3, 'Username must be at least 3 characters long')
  ),
  password: v.pipe(
    v.string('Password must be a string'),
    v.minLength(1, 'Password is required'),
    v.minLength(6, 'Password must be at least 6 characters long')
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
        },
      },
      { status: 400 }
    );
  }

  const { username, password } = parsed.output;
  const user = await getUserByName(username);

  if (user) {
    return data(
      {
        errors: {
          username: `User with username ${username} already exists`,
          password: undefined,
        },
      },
      { status: 400 }
    );
  }

  const newUser = await createUser(username, password);
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirectTo') ?? '/jokes';
  return createUserSession(request, newUser.id, redirectTo);
};
