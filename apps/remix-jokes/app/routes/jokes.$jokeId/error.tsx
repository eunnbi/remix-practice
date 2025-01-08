import {
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from '@remix-run/react';

import { ErrorBox } from '~/components/ErrorBox/ErrorBox';

export function ErrorBoundary() {
  const { jokeId } = useParams();
  const error = useRouteError();
  console.error(error);

  const getErrorMessage = (status?: number) => {
    switch (status) {
      case 404:
        return `Huh? What the heck is "${jokeId}"?.`;
      case 400:
        return "What you're trying to do is not allowed.";
      case 403:
        return `Sorry, but "${jokeId}" is not your joke.`;
      default:
        return `Something went wrong. Please refresh or try again later.`;
    }
  };

  if (!isRouteErrorResponse(error)) {
    return <ErrorBox>{getErrorMessage()}</ErrorBox>;
  }

  return <ErrorBox>{error.data ?? getErrorMessage(error.status)}</ErrorBox>;
}
