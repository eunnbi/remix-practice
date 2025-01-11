import { theme } from '@remix-practice/design-system';
import { style } from '@vanilla-extract/css';

import { anchor } from '~/styles/utils/anchor.css';
import { container } from '~/styles/utils/container.css';

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
