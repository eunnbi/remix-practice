import { theme } from '@remix-practice/design-system';
import { style } from '@vanilla-extract/css';

export const anchor = style({
  color: theme.color.secondary,
  ':hover': {
    textDecoration: 'underline',
    textDecorationStyle: 'wavy',
    textDecorationThickness: 1,
  },
});
