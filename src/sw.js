import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

import { setDefaultHandler } from 'workbox-routing';

setDefaultHandler(new NetworkFirst({
  cacheName: 'default',
  networkTimeoutSeconds: 5,
}));

// 预缓存
precacheAndRoute(self.__WB_MANIFEST)

// 脚本文件缓存策略
registerRoute(
  ({ request }) => request.destination === 'script',
  new StaleWhileRevalidate()
)

// 图片缓存策略
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: 'pages',
    networkTimeoutSeconds: 5, // 增加超时时间
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      }),
    ],
  }),
  {
    navigationFallback: '/offline.html',
  }
)
registerRoute(navigationRoute)

self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url);
});

console.log('Service Worker 已加载')