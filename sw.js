const CACHE_NAME = 'bunkoo-meter-v23';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css?v=1.4',
  './tailwind.css?v=2.6',
  './app.js?v=4.3',
  './firebase.config.js?v=1.3',
  './config.js',
  './logo.png',
  './logopic.png?v=5',
  './manifest.json?v=5',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-check.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // For local assets, use cache-first strategy
  if (event.request.url.startsWith(self.location.origin) || event.request.url.includes('fonts.')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          // If found in cache, return it
          if (response) {
            return response;
          }
          // Otherwise, fetch and cache
          return fetch(event.request).then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            cache.put(event.request, responseToCache);
            return response;
          });
        });
      })
    );
  } else {
    // For other requests (Firebase, etc.), use network-first or just network
    event.respondWith(fetch(event.request));
  }
});
