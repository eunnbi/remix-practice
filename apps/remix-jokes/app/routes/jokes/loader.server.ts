import { getJokes } from '~/models/joke.server';
import { getUser } from '~/models/user.server';
import { getUserId } from '~/session.server';

import type { LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  const user = userId ? await getUser(userId) : null;

  const url = new URL(request.url);
  const query = url.searchParams.get('query') ?? null;
  const jokes = await getJokes({ query });

  return { jokes, user };
};
