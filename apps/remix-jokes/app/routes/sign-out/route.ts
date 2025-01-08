import { redirect } from '@remix-run/node';

import { destroySession, getSession } from '~/session.server';

import type { ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  session.unset('userId');
  return redirect('/sign-in', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export const loader = async () => {
  return new Response(null, { status: 405 });
};
