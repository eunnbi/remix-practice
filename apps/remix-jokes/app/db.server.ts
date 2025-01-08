import { PrismaClient } from '@prisma/client';

export const singleton = <Value>(
  name: string,
  valueFactory: () => Value
): Value => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = global as any;
  g.__singletons ??= {};
  g.__singletons[name] ??= valueFactory();
  return g.__singletons[name];
};

// Hard-code a unique key, so we can look up the client when this module gets re-imported
export const db = singleton('prisma', () => new PrismaClient());
