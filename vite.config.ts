import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import arraybuffer from 'vite-plugin-arraybuffer';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  cacheDir: './.vite',
  build: {
    target: 'esnext',
    minify: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [
    react(),
    viteCommonjs(),
    arraybuffer(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/contract/managed/keys/*',
          dest: 'keys/',
        },
        {
          src: 'src/contract/managed/zkir/*',
          dest: 'zkir/',
        },
      ],
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    include: ['contract/**/*.cjs'],
  },
  define: {},
});
