import resetStylesUrl from '@remix-practice/design-system/reset.css?url';
import themeStylesUrl from '@remix-practice/design-system/theme.css?url';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import typographyLargeStylesUrl from '~/styles/typography/large.css?url';
import typographyMediumStylesUrl from '~/styles/typography/medium.css?url';
import typographySmallStylesUrl from '~/styles/typography/small.css?url';

import * as styles from './root.css';

import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: resetStylesUrl },
  { rel: 'stylesheet', href: themeStylesUrl },
  { rel: 'stylesheet', href: typographySmallStylesUrl },
  {
    rel: 'stylesheet',
    href: typographyMediumStylesUrl,
    media: 'print, (min-width: 640px)',
  },
  {
    rel: 'stylesheet',
    href: typographyLargeStylesUrl,
    media: 'screen and (min-width: 1024px)',
  },
];

export default function App() {
  return (
    <html lang='en' className={styles.html}>
      <head>
        <title>Remix Jokes</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className={styles.body}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
