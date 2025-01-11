import { getRandomJoke } from '~/models/joke.server';
import { getUser } from '~/models/user.server';
import { getUserId } from '~/session.server';

import type { LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const joke = await getRandomJoke();
  const userId = await getUserId(request);
  const user = await getUser(joke.jokesterId);

  return {
    joke,
    owner: user,
    isOwner: userId === joke.jokesterId,
  };
};
