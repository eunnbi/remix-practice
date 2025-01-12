import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    react(),
    dts({ include: ['src'] }),
    libInjectCss(), // NOTE: https://github.com/emosheeep/vite-plugin-lib-inject-css
    tsconfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],

      // NOTE: https://rollupjs.org/configuration-options/#input
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx,css}', {
            ignore: ['src/**/*.d.ts'],
          })
          .map((file) => [
            // 1. The name of the entry point
            relative('src', file.slice(0, file.length - extname(file).length)),
            // 2. The absolute path to the entry file
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].[format].js',
      },
    },
  },
});
