import { theme } from '@remix-practice/design-system/styles';
import { style } from '@vanilla-extract/css';

import { anchor } from '~/styles/utils/anchor.css';

export const box = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: theme.color['primary-gradient'],
});

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '48px 0',
});

export const title = style({
  lineHeight: 0.5,
  textAlign: 'center',
  textShadow: '0 3px 0 rgba(0, 0, 0, 0.75)',
});

export const emphasis = style({
  display: 'block',
  fontSize: 72,
  lineHeight: 1,
  textTransform: 'uppercase',
  textShadow: '0 0.2em 0.5em rgba(0, 0, 0, 0.5), 0 5px 0 rgba(0, 0, 0, 0.75)',
  '@media': {
    'print, (min-width: 640px)': {
      fontSize: 96,
    },
    'screen and (min-width: 1024px)': {
      fontSize: 128,
    },
  },
});

export const list = style({
  display: 'flex',
  gap: 16,
  fontSize: 18,
  lineHeight: 1,
  '@media': {
    'print, (min-width: 640px)': {
      fontSize: 20,
    },
  },
});

export const link = anchor;
