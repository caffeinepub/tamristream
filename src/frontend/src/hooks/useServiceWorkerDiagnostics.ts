import { useState, useEffect, useCallback } from 'react';

export interface ServiceWorkerDiagnostics {
  supported: boolean;
  registered: boolean;
  controlling: boolean;
  updateAvailable: boolean;
  registration: ServiceWorkerRegistration | null;
  error: string | null;
}

export function useServiceWorkerDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<ServiceWorkerDiagnostics>({
    supported: 'serviceWorker' in navigator,
    registered: false,
    controlling: false,
    updateAvailable: false,
    registration: null,
    error: null,
  });

  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const updateDiagnostics = async () => {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        setDiagnostics((prev) => ({
          ...prev,
          registered: !!registration,
          controlling: !!navigator.serviceWorker.controller,
          registration: registration || null,
        }));
      } catch (error: any) {
        setDiagnostics((prev) => ({
          ...prev,
          error: error.message || 'Failed to get service worker registration',
        }));
      }
    };

    updateDiagnostics();

    // Listen for controller change (new SW activated)
    const handleControllerChange = () => {
      updateDiagnostics();
    };

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, []);

  useEffect(() => {
    if (!diagnostics.registration) return;

    const handleUpdateFound = () => {
      const installing = diagnostics.registration?.installing;
      if (!installing) return;

      const handleStateChange = () => {
        if (installing.state === 'installed' && navigator.serviceWorker.controller) {
          setDiagnostics((prev) => ({ ...prev, updateAvailable: true }));
        }
      };

      installing.addEventListener('statechange', handleStateChange);
    };

    diagnostics.registration.addEventListener('updatefound', handleUpdateFound);

    return () => {
      diagnostics.registration?.removeEventListener('updatefound', handleUpdateFound);
    };
  }, [diagnostics.registration]);

  const checkForUpdates = useCallback(async () => {
    if (!('serviceWorker' in navigator)) {
      setDiagnostics((prev) => ({
        ...prev,
        error: 'Service workers not supported',
      }));
      return;
    }

    setIsCheckingUpdate(true);
    setDiagnostics((prev) => ({ ...prev, error: null }));

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
      } else {
        setDiagnostics((prev) => ({
          ...prev,
          error: 'No service worker registered',
        }));
      }
    } catch (error: any) {
      setDiagnostics((prev) => ({
        ...prev,
        error: error.message || 'Failed to check for updates',
      }));
    } finally {
      setIsCheckingUpdate(false);
    }
  }, []);

  const reloadToUpdate = useCallback(() => {
    window.location.reload();
  }, []);

  const clearCachesAndReload = useCallback(async () => {
    setIsClearingCache(true);
    setDiagnostics((prev) => ({ ...prev, error: null }));

    try {
      // Delete all caches starting with "tamristream-"
      const cacheNames = await caches.keys();
      const tamriCaches = cacheNames.filter((name) => name.startsWith('tamristream-'));
      
      await Promise.all(tamriCaches.map((name) => caches.delete(name)));

      // Unregister all service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((reg) => reg.unregister()));
      }

      // Reload the page
      window.location.reload();
    } catch (error: any) {
      setDiagnostics((prev) => ({
        ...prev,
        error: error.message || 'Failed to clear caches',
      }));
      setIsClearingCache(false);
    }
  }, []);

  return {
    ...diagnostics,
    isCheckingUpdate,
    isClearingCache,
    checkForUpdates,
    reloadToUpdate,
    clearCachesAndReload,
  };
}
