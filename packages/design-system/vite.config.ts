import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    react(),
    dts({ rollupTypes: true }),
    libCss(),
    tsconfigPaths(),
  ],
  build: {
    lib: {
      entry: {
        components: resolve(__dirname, 'src/components/index.ts'),
        styles: resolve(__dirname, 'src/styles/index.ts'),
        reset: resolve(__dirname, 'src/styles/reset.css'),
      },
      name: 'design-system',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'cjs'],
    },
    cssCodeSplit: true,
    rollupOptions: {
      treeshake: true,
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
