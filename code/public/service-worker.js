// public/service-worker.js

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          // ... add other files to be cached
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      icon: '/resources/icon.png',
      badge: '/resources/Tafel.png',
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification Title', options)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    clients.openWindow('/nachrichten');
  });
  