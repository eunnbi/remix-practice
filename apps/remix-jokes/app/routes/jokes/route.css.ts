import { theme } from '@remix-practice/design-system/styles';
import { style } from '@vanilla-extract/css';

import { anchor } from '~/styles/utils/anchor.css';
import { container } from '~/styles/utils/container.css';

export const box = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '16px 0',
  borderBottom: `1px solid ${theme.color.border}`,
});

export const headerContainer = style([
  container,
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
]);

export const homeLink = style({
  fontSize: 48,
  '@media': {
    'print, (min-width: 640px)': {
      fontSize: 96,
    },
    'screen and (min-width: 1024px)': {
      fontSize: 128,
    },
  },
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const link = anchor;

export const main = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '32px 0',
  flex: '1 1 100%',
});

export const mainContainer = style([
  container,
  {
    display: 'flex',
    gap: 16,
    '@media': {
      '(max-width: 639px)': {
        flexDirection: 'column',
      },
    },
  },
]);

export const listBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  maxWidth: 216,
});

export const outletBox = style({
  flex: 1,
  padding: '0 32px',
});

export const button = style({
  marginTop: 8,
  textDecoration: 'none',
});
