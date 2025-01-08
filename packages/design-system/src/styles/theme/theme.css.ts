import { createGlobalTheme } from '@vanilla-extract/css';

import { COLORS } from './color';

export const theme = createGlobalTheme(':root', {
  color: COLORS,
});
