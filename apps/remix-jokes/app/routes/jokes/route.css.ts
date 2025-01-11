import { style } from '@vanilla-extract/css';

import { container } from '~/styles/utils/container.css';

export const box = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const main = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '32px 0',
  flex: '1 1 100%',
  maxHeight: 'calc(100% - 93px)',
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

export const sideBox = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  maxWidth: 216,
  maxHeight: '100%',
});

export const outletBox = style({
  flex: 1,
  padding: '0 32px',
});
