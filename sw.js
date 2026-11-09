/* Phone app service worker: keeps only this small wrapper's own files for when there is no internet.
   It never touches Google addresses (the ledger itself is always loaded fresh from Google). */
var APP_ID = '';   // written by tools/make-phone-kit.py: one per phone app ('' = development app at the top of the Claims site)
var CACHE = 'pfbeacon-wrapper-v3' + (APP_ID ? '-' + APP_ID : '');
// Only this app's own old caches are removed; other phone apps on the same github.io address keep theirs.
function ownCache(k) {
  var m = /^pfbeacon-wrapper-v\d+(?:-([a-z0-9-]+))?$/.exec(k);
  if (m) return (m[1] || '') === APP_ID;
  return !APP_ID && /^(claims|scl)-wrapper/.test(k);   // older names, used only by the first (top-level) app
}
// Requests for another app's folder (e.g. live1/ inside this one) are left alone.
var SCOPE = new URL('./', self.location.href).pathname;
function mine(u) { var rel = u.pathname.slice(SCOPE.length); return u.pathname.indexOf(SCOPE) === 0 && (!/\//.test(rel) || /^(icons|img)\//.test(rel)); }
var FILES = ['./', './index.html', './config.js', './offline.html', './install.html', './qrcode.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './img/logo-wordmark.svg', './img/banner-800.webp', './img/banner-800.jpg'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE && ownCache(k); }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== self.location.origin || e.request.method !== 'GET' || !mine(u)) return;   // Google and everything else: not ours, not cached
  e.respondWith(fetch(e.request).then(function (r) {   // network first
    if (r && r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request).then(function (hit) { return hit || (e.request.mode === 'navigate' ? caches.match('./offline.html') : Response.error()); });
  }));
});
