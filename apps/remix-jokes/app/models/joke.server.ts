import { db } from '~/db.server';

import type { Joke } from '@prisma/client';

export const getJokes = async ({
  take,
  query,
}: { take?: number; query?: string | null } = {}) => {
  const jokes = await db.joke.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true },
    take,

    ...(query
      ? {
          where: {
            name: {
              contains: query,
            },
            content: {
              contains: query,
            },
          },
        }
      : undefined),
  });
  return jokes;
};

export const getJoke = async (id: string) => {
  const joke = await db.joke.findUnique({ where: { id } });
  return joke;
};

export const getRandomJoke = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    skip: randomRowNumber,
    take: 1,
  });
  return randomJoke;
};

export const createJoke = async (
  joke: Pick<Joke, 'name' | 'content' | 'jokesterId'>
) => {
  const newJoke = await db.joke.create({ data: joke });
  return newJoke;
};

export const deleteJoke = async (id: string) => {
  await db.joke.delete({ where: { id } });
};
