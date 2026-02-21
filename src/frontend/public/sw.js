const CACHE_VERSION = new URL(location).searchParams.get('v') || 'v1';
const CACHE_NAME = `tamristream-${CACHE_VERSION}`;
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/generated/app-logo.dim_512x512.png',
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker version:', CACHE_VERSION);
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        
        // Cache assets individually with error handling
        for (const asset of ASSETS_TO_CACHE) {
          try {
            await cache.add(asset);
            console.log('[SW] Cached:', asset);
          } catch (error) {
            console.warn('[SW] Failed to cache:', asset, error);
            // Continue even if one asset fails
          }
        }
        
        // Skip waiting to activate immediately
        await self.skipWaiting();
        console.log('[SW] Installation complete');
      } catch (error) {
        console.error('[SW] Installation failed:', error);
        // Don't block installation on cache errors
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker version:', CACHE_VERSION);
  
  event.waitUntil(
    (async () => {
      try {
        // Delete old caches
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter((name) => name.startsWith('tamristream-') && name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
        
        // Take control of all clients immediately
        await self.clients.claim();
        console.log('[SW] Activation complete');
      } catch (error) {
        console.error('[SW] Activation failed:', error);
      }
    })()
  );
});

// Fetch event - network-first strategy with fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Network-first strategy for HTML
  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request, { 
            cache: 'no-cache',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
            }
          });
          
          if (response.ok) {
            // Update cache with fresh response
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone()).catch(err => {
              console.warn('[SW] Failed to update cache:', err);
            });
          }
          
          return response;
        } catch (error) {
          console.warn('[SW] Network failed, trying cache:', error);
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return a basic offline page
          return new Response(
            `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Offline - TamriStream</title>
                <style>
                  body { 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    min-height: 100vh; 
                    margin: 0;
                    padding: 20px;
                    background: #000; 
                    color: #fff; 
                    font-family: system-ui, -apple-system, sans-serif;
                    text-align: center;
                  }
                  h1 { color: #f59e0b; margin-bottom: 16px; }
                  button {
                    background: #f59e0b;
                    color: #000;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 16px;
                  }
                </style>
              </head>
              <body>
                <div>
                  <h1>You're Offline</h1>
                  <p>Please check your internet connection and try again.</p>
                  <button onclick="window.location.reload()">Retry</button>
                </div>
              </body>
            </html>`,
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/html' },
            }
          );
        }
      })()
    );
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    (async () => {
      try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fetch from network
        const response = await fetch(request);
        
        // Cache successful responses for static assets
        if (response && response.status === 200) {
          const shouldCache = 
            url.pathname.startsWith('/assets/') || 
            url.pathname.endsWith('.js') || 
            url.pathname.endsWith('.css') ||
            url.pathname.endsWith('.woff2') ||
            url.pathname.endsWith('.png') ||
            url.pathname.endsWith('.jpg') ||
            url.pathname.endsWith('.webp');

          if (shouldCache) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone()).catch(err => {
              console.warn('[SW] Failed to cache asset:', err);
            });
          }
        }

        return response;
      } catch (error) {
        console.error('[SW] Fetch failed:', error);
        // Return a fallback response for failed requests
        return new Response('Network error', {
          status: 408,
          statusText: 'Request Timeout',
        });
      }
    })()
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});
