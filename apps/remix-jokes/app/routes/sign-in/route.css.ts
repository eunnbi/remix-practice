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
  alignItems: 'center',
  width: 400,
  maxWidth: 'calc(100% - 32px)',
  padding: '1rem',
  borderRadius: 5,
  backgroundColor: 'white',
  boxShadow: '0 0.2rem 1rem rgba(0, 0, 0, 0.5)',
  gap: 16,
});

export const title = style({
  color: theme.color.primary,
  marginBottom: 8,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

export const links = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 24,
  width: '100%',
});

export const link = anchor;
