import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

const pagesBase = '/Vantins';

function prefixRootUrls(): Plugin {
  return {
    name: 'vantins-github-pages-base',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('/src/') || !/\.[cm]?[jt]sx?$/.test(id)) {
        return null;
      }

      return code.replace(
        /(['"`])\/(?!\/|Vantins(?:\/|['"`]))/g,
        `$1${pagesBase}/`,
      );
    },
  };
}

export default defineConfig({
  base: `${pagesBase}/`,
  plugins: [prefixRootUrls(), react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  build: {
    outDir: 'dist-pages',
    emptyOutDir: true,
  },
});
