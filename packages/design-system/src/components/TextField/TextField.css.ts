import { style } from '@vanilla-extract/css';

import { theme } from '~/styles/theme/theme.css';

export const label = style({
  display: 'block',
  marginBottom: 4,
  color: theme.color.primary,
});

export const input = style({
  width: '100%',
  height: 40,
  padding: '8px 12px',
  border: `1px solid ${theme.color.border}`,
  color: theme.color.secondary,
  backgroundColor: 'hsl(0 0% 100% / 10%)',
  borderRadius: 4,
  fontSize: 16,
  lineHeight: 1.5,
  selectors: {
    '&:autofill': {
      WebkitTextFillColor: theme.color.secondary,
      caretColor: theme.color.secondary,
      backgroundClip: 'text',
    },
    '&[aria-invalid=true]': {
      border: `1px solid ${theme.color.invalid}`,
    },
    '&:focus': {
      outline: `${theme.color.secondary} solid 2px`,
      outlineOffset: 2,
    },
    '&::placeholder': {
      color: 'hsl(0 0% 100% / 65%)',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: '0.7',
    },
    '&[readonly]': {
      cursor: 'not-allowed',
      opacity: '0.7',
    },
  },
});

export const message = style({
  height: 18,
  marginTop: 4,
  fontSize: 12,
  selectors: {
    '&[role="alert"]': {
      color: theme.color.invalid,
    },
  },
});
