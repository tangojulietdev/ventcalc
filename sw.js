// ═══════════════════════════════════════════════════════
// VentCalc Service Worker — v1.0.0
// Full offline support with cache-first strategy
// ═══════════════════════════════════════════════════════

const CACHE_NAME = 'ventcalc-v1.0.0';

// All assets to cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
];

// External CDN resources (cached when first used, not on install)
const CDN_CACHE_NAME = 'ventcalc-cdn-v1.0.0';
const CDN_HOSTS = [
  'cdnjs.cloudflare.com',
  'unpkg.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

// ── INSTALL: precache all app assets ──
self.addEventListener('install', function(event) {
  console.log('[SW] Installing VentCalc v1.0.0...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[SW] Precaching app assets...');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(function() {
        console.log('[SW] Precache complete. Activating immediately.');
        return self.skipWaiting();
      })
      .catch(function(err) {
        console.error('[SW] Precache failed:', err);
      })
  );
});

// ── ACTIVATE: clean up old caches ──
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function(name) {
              // Delete old ventcalc caches that aren't current version
              return name.startsWith('ventcalc-') &&
                     name !== CACHE_NAME &&
                     name !== CDN_CACHE_NAME;
            })
            .map(function(name) {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(function() {
        console.log('[SW] Now controlling all clients.');
        return self.clients.claim();
      })
  );
});

// ── FETCH: serve from cache, fall back to network ──
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // CDN resources: network first, cache fallback
  if (CDN_HOSTS.some(function(host) { return url.hostname.includes(host); })) {
    event.respondWith(networkFirstWithCDNCache(event.request));
    return;
  }

  // App assets: cache first, network fallback
  event.respondWith(cacheFirstWithNetworkFallback(event.request));
});

// Cache-first strategy for app assets
function cacheFirstWithNetworkFallback(request) {
  return caches.match(request)
    .then(function(cachedResponse) {
      if (cachedResponse) {
        // Serve from cache, but also refresh in background (stale-while-revalidate)
        refreshCache(request);
        return cachedResponse;
      }
      // Not in cache — fetch from network and cache it
      return fetchAndCache(request, CACHE_NAME);
    })
    .catch(function() {
      // Both cache and network failed — serve offline fallback
      return caches.match('./index.html');
    });
}

// Network-first strategy for CDN resources (fonts, libraries)
function networkFirstWithCDNCache(request) {
  return fetch(request)
    .then(function(response) {
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CDN_CACHE_NAME).then(function(cache) {
          cache.put(request, clone);
        });
      }
      return response;
    })
    .catch(function() {
      // Network failed — try CDN cache
      return caches.match(request);
    });
}

// Fetch from network and store in cache
function fetchAndCache(request, cacheName) {
  return fetch(request)
    .then(function(response) {
      // Only cache valid responses
      if (!response || response.status !== 200 || response.type === 'error') {
        return response;
      }
      const clone = response.clone();
      caches.open(cacheName).then(function(cache) {
        cache.put(request, clone);
      });
      return response;
    })
    .catch(function() {
      return caches.match('./index.html');
    });
}

// Background refresh — update cache silently
function refreshCache(request) {
  return fetch(request)
    .then(function(response) {
      if (response && response.status === 200) {
        return caches.open(CACHE_NAME).then(function(cache) {
          return cache.put(request, response);
        });
      }
    })
    .catch(function() {
      // Silent fail — already serving from cache
    });
}

// ── MESSAGE: handle skip-waiting from app ──
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
