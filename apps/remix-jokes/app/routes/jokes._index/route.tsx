import { useLoaderData } from '@remix-run/react';

import { Joke } from '~/components/Joke/Joke';

import { loader } from './loader';

export { loader };

export default function JokesIndexRoute() {
  const { joke, owner, isOwner } = useLoaderData<typeof loader>();

  return (
    <Joke
      content={joke.content}
      name={joke.name}
      isOwner={isOwner}
      ownerName={owner?.username}
    />
  );
}
