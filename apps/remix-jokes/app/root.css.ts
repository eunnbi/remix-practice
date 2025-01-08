import { theme } from '@remix-practice/design-system/styles';
import { style } from '@vanilla-extract/css';

export const html = style({
  color: theme.color.white,
  backgroundColor: theme.color.primary,
});

export const body = style({
  minHeight: 'calc(100vh - env(safe-area-inset-bottom))',
});
