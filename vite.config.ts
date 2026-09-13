import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ['src'],
      exclude: ['src/App.tsx', 'src/main.tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'DesignSystem',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'lucide-react',
        'radix-ui',
        'cn',
        'class-variance-authority',
      ],
    },
    sourcemap: true,
    copyPublicDir: false,
  },
});
