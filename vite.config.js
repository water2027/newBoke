import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
            registerType: 'autoUpdate',
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'sw.js',
            workbox: {
              globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg}'],
              navigateFallback: '/index.html',
              navigateFallbackDenylist: [/^\/api\//],
            },
            devOptions: {
              enabled: true,
              type: 'module', 
            }
          }),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
