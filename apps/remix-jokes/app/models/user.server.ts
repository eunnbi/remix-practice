import bcrypt from 'bcryptjs';

import { db } from '~/db.server';

export const login = async (username: string, password: string) => {
  const user = await db.user.findUnique({ where: { username } });
  if (user === null) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) return null;
  return { id: user.id, username };
};

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    select: { id: true, username: true },
  });
  return user;
};

export const getUserByName = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true, username: true },
  });
  return user;
};

export const createUser = async (username: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({ data: { username, passwordHash } });
  return { id: user.id, username };
};
