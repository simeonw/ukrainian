// Static service worker for the Ukrainian app PWA. No server-side templating
// available (this is a static-file app, unlike apps/mail's PHP-generated
// version) — cache version is bumped by hand in the two constants below
// whenever a deploy needs to force-invalidate old cached JS/CSS.
var SW_CACHE_VERSION = 1;
var SW_CACHE_STATIC = 'ukrainian-static-v' + SW_CACHE_VERSION;
var SW_CACHE_PAGES = 'ukrainian-pages-v' + SW_CACHE_VERSION;
var SW_OFFLINE_URL = '/apps/ukrainian/offline.html';

var STATIC_EXTS = /\.(css|js|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif|ico|webp)(\?.*)?$/i;

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(SW_CACHE_PAGES).then(function (cache) {
      return cache.add(SW_OFFLINE_URL).catch(function () {});
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (k) { return k !== SW_CACHE_STATIC && k !== SW_CACHE_PAGES; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url = req.url;

  if (req.method !== 'GET') return;
  if (url.indexOf('/apps/ukrainian/') === -1) return;

  // Static assets: stale-while-revalidate — serve cached immediately,
  // refresh in the background so the next load picks up new content.
  if (STATIC_EXTS.test(url)) {
    e.respondWith(
      caches.open(SW_CACHE_STATIC).then(function (cache) {
        return cache.match(req).then(function (cached) {
          var fetchAndUpdate = fetch(req).then(function (response) {
            if (response && response.ok) cache.put(req, response.clone());
            return response;
          }).catch(function () {
            return cached || new Response('', { status: 503 });
          });
          return cached || fetchAndUpdate;
        });
      })
    );
    return;
  }

  // HTML: network-first, offline fallback.
  var accept = req.headers.get('Accept') || '';
  if (accept.indexOf('text/html') !== -1) {
    e.respondWith(
      fetch(req).catch(function () {
        return caches.open(SW_CACHE_PAGES).then(function (cache) {
          return cache.match(SW_OFFLINE_URL).then(function (r) {
            return r || new Response('You are offline.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
          });
        });
      })
    );
  }
});
