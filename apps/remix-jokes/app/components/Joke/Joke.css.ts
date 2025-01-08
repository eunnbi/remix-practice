import { style } from '@vanilla-extract/css';

import { anchor } from '~/styles/utils/anchor.css';

export const box = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
});

export const content = style({
  marginBottom: 8,
  fontSize: 24,
  lineHeight: 1,
  textAlign: 'center',
  '@media': {
    'print, (min-width: 640px)': {
      fontSize: 36,
    },
    'screen and (min-width: 1024px)': {
      fontSize: 48,
    },
  },
});

export const link = anchor;

export const button = style({
  marginTop: 16,
});
