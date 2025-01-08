import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { deleteJoke, getJoke } from '~/models/joke.server';
import { getUserId } from '~/session.server';

import type { ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.jokeId, 'params.jokeId is required');

  const form = await request.formData();
  const intent = form.get('intent');

  if (intent !== 'delete') {
    throw new Response(`The intent ${intent} is not supported`, {
      status: 400,
    });
  }

  const userId = await getUserId(request, { redirect: true });
  const joke = await getJoke(params.jokeId);

  if (joke === null) {
    throw new Response("Can't delete what does not exist", {
      status: 404,
    });
  }

  if (joke.jokesterId !== userId) {
    throw new Response("Pssh, nice try. That's not your joke", { status: 403 });
  }

  await deleteJoke(params.jokeId);
  return redirect('/jokes');
};
