/* Phone app service worker: keeps only this small wrapper's own files for when there is no internet.
   It never touches Google addresses (the ledger itself is always loaded fresh from Google). */
var CACHE = 'pfbeacon-wrapper-v2';
var FILES = ['./', './index.html', './config.js', './offline.html', './install.html', './qrcode.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './img/logo-wordmark.svg', './img/banner-800.webp', './img/banner-800.jpg'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== self.location.origin || e.request.method !== 'GET') return;   // Google and everything else: not ours, not cached
  e.respondWith(fetch(e.request).then(function (r) {   // network first
    if (r && r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request).then(function (hit) { return hit || (e.request.mode === 'navigate' ? caches.match('./offline.html') : Response.error()); });
  }));
});
