import { useState, useEffect } from 'react';

export interface OfflineStatus {
  isOnline: boolean;
  cachedContentAvailable: boolean;
  lastOnline: string | null;
}

export function useOfflineStatus(): OfflineStatus {
  const [status, setStatus] = useState<OfflineStatus>({
    isOnline: navigator.onLine,
    cachedContentAvailable: false,
    lastOnline: null,
  });

  useEffect(() => {
    const updateOnlineStatus = () => {
      const isOnline = navigator.onLine;
      setStatus((prev) => ({
        ...prev,
        isOnline,
        lastOnline: isOnline ? new Date().toISOString() : prev.lastOnline,
      }));
    };

    // Check for cached content
    const checkCachedContent = async () => {
      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys();
          const hasCaches = cacheNames.length > 0;
          setStatus((prev) => ({
            ...prev,
            cachedContentAvailable: hasCaches,
          }));
        } catch (error) {
          console.error('Error checking caches:', error);
        }
      }
    };

    updateOnlineStatus();
    checkCachedContent();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return status;
}
