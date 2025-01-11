import { theme } from '@remix-practice/design-system';
import { style } from '@vanilla-extract/css';

import { anchor } from '~/styles/utils/anchor.css';

export const box = style({
  flex: 1,
  overflow: 'auto',
});

export const link = anchor;

export const emptyMessage = style({
  color: theme.color.secondary,
});
