import { vitePlugin as remix } from '@remix-run/dev';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/node' {
  // or cloudflare, deno, etc.
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.css'],
      future: {
        v3_singleFetch: true,
      },
    }),
    tsconfigPaths(),
    vanillaExtractPlugin(),
  ],
});
