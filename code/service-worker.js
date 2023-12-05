// service-worker.js

const CACHE_NAME = 'static';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/*',
  '/src/views/Dashboard.vue',
  '/src/views/*',
  '/src/theme/*',
  '/src/store/*',
  '/src/router/*',
  '/src/goals/*',
  '/src/profile/*',
  '/resources/*',
];

self.addEventListener('install', (event) => {
  console.log('Service Worker installiert');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker empfängt fetch-Ereignis');
  event.respondWith(
    // Überprüfen, ob der Browser offline ist
    navigator.onLine ?
      // Wenn online, versuche die Anfrage vom Netzwerk zu bedienen
      fetch(event.request).then((response) => {
        // Wenn erfolgreich, aktualisiere den Cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        // Gebe die Antwort zurück
        return response;
      }) :
      // Wenn offline, versuche die Anfrage aus dem Cache zu bedienen
      caches.match(event.request).then((cachedResponse) => {
        // Wenn die Anfrage im Cache vorhanden ist, gib sie zurück
        if (cachedResponse) {
          return cachedResponse;
        }
        // Wenn die Anfrage nicht im Cache vorhanden ist, gebe eine Offline-Seite zurück oder handle es nach Bedarf
        return new Response('<html><body>Offline</body></html>', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});
