// Service worker registration with enhanced mobile support
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Generate a build-time version identifier
      const buildVersion = import.meta.env.VITE_BUILD_VERSION || Date.now().toString();
      const swUrl = `/sw.js?v=${buildVersion}`;

      navigator.serviceWorker
        .register(swUrl, {
          scope: '/',
          updateViaCache: 'none', // Always check for updates
        })
        .then((registration) => {
          console.log('[SW Registration] Success with version:', buildVersion);

          // Check for updates immediately
          registration.update().catch(err => {
            console.warn('[SW Registration] Update check failed:', err);
          });

          // Check for updates periodically (every 60 seconds)
          setInterval(() => {
            registration.update().catch(err => {
              console.warn('[SW Registration] Periodic update failed:', err);
            });
          }, 60000);

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              console.log('[SW Registration] Update found, installing...');
              
              newWorker.addEventListener('statechange', () => {
                console.log('[SW Registration] State changed to:', newWorker.state);
                
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[SW Registration] New version available');
                  
                  // Notify user about update (optional)
                  if (window.confirm('A new version is available. Reload to update?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('[SW Registration] Failed:', error);
          // Don't block app if SW registration fails
        });

      // Listen for controller changes (new SW activated)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        console.log('[SW Registration] Controller changed, reloading...');
        refreshing = true;
        window.location.reload();
      });
    });
  } else {
    console.warn('[SW Registration] Service workers not supported');
  }
}

// Function to manually clear service worker cache
export async function clearServiceWorkerCache() {
  try {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('[SW Cache] Cleared all caches');
    }
    
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(reg => reg.unregister()));
      console.log('[SW Cache] Unregistered all service workers');
    }
    
    return true;
  } catch (error) {
    console.error('[SW Cache] Failed to clear:', error);
    return false;
  }
}
