import { style } from '@vanilla-extract/css';

import { theme } from '~/styles/theme/theme.css';

export const button = style({
  padding: '10px 16px',
  border: 0,
  borderRadius: 4,
  backgroundColor: theme.color.secondary,
  color: theme.color.primary,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: 1,
  boxShadow: `0 3px 0 0 ${theme.color['secondary-dark']}`,
  outlineOffset: 2,
  transform: 'translateY(0)',
  selectors: {
    '&:disabled': {
      opacity: '0.7',
      pointerEvents: 'none',
    },
    '&:hover': {
      boxShadow: `0 4px 0 0 ${theme.color['secondary-dark']}`,
      transform: 'translateY(calc(1px * -1))',
    },
  },
});
