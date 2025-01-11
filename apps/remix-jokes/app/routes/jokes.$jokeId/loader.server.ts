import invariant from 'tiny-invariant';

import { getJoke } from '~/models/joke.server';
import { getUser } from '~/models/user.server';
import { getUserId } from '~/session.server';

import type { LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.jokeId, 'params.jokeId is required');
  const joke = await getJoke(params.jokeId);
  const userId = await getUserId(request);

  if (joke === null) {
    throw new Response('What a joke! Not found.', {
      status: 404,
    });
  }

  const user = await getUser(joke.jokesterId);

  return {
    joke,
    owner: user,
    isOwner: userId === joke.jokesterId,
  };
};
