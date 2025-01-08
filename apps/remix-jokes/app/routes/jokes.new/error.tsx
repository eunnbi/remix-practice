import { isRouteErrorResponse, Link, useRouteError } from '@remix-run/react';

import { ErrorBox } from '~/components/ErrorBox/ErrorBox';
import { anchor } from '~/styles/utils/anchor.css';

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <ErrorBox>
        <p>You must be signed in to create a joke.</p>
        <Link to='/sign-in' className={anchor}>
          Sign In
        </Link>
      </ErrorBox>
    );
  }

  return (
    <ErrorBox>Something unexpected went wrong. Sorry about that.</ErrorBox>
  );
}
