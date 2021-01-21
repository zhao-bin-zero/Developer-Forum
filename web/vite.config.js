import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [vue()],
  alias: {
    // 路径映射必须以/开头和结尾
    '@': path.resolve(__dirname, 'src/'),
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://loaclhost:3000/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // },
  },
});
