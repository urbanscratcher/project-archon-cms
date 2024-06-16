import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';
import { defineConfig } from 'vite';
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  optimizeDeps: {
    include: ['@workspace/ckeditor5-custom-build'],
  },
  build: {
    commonjsOptions: {
      include: [/@workspace\/ckeditor5-custom-build/, /node_modules/],
    },
  },
  plugins: [react(), ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })],
});
