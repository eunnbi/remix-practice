import { createCookieSessionStorage, redirect } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const { getSession, commitSession, destroySession } = storage;

export const createUserSession = async (
  request: Request,
  userId: string,
  redirectTo: string
) => {
  const session = await getSession(request.headers.get('Cookie'));
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export async function getUserId(request: Request): Promise<string | null>;
export async function getUserId(
  request: Request,
  options: { redirect: true }
): Promise<string>;
export async function getUserId(
  request: Request,
  options: { redirect: false }
): Promise<string | null>;
export async function getUserId(
  request: Request,
  options: { redirect: boolean } = { redirect: false }
) {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');

  if (typeof userId !== 'string') {
    if (options.redirect) throw redirect('/sign-in');
    else return null;
  } else return userId;
}
