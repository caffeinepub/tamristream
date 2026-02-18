import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const INSTALL_DISMISSED_KEY = 'tamristream_install_dismissed';
const INSTALL_COMPLETED_KEY = 'tamristream_install_completed';

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    const installed = localStorage.getItem(INSTALL_COMPLETED_KEY) === 'true';
    const dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY) === 'true';
    setIsInstalled(installed);
    setIsDismissed(dismissed);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      localStorage.setItem(INSTALL_COMPLETED_KEY, 'true');
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      localStorage.setItem(INSTALL_COMPLETED_KEY, 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        localStorage.setItem(INSTALL_COMPLETED_KEY, 'true');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
      return choiceResult.outcome === 'accepted';
    } catch (error) {
      console.error('Error prompting install:', error);
      return false;
    }
  };

  const dismissPrompt = () => {
    setIsDismissed(true);
    localStorage.setItem(INSTALL_DISMISSED_KEY, 'true');
  };

  return {
    isInstallable: isInstallable && !isInstalled && !isDismissed,
    isInstalled,
    isIOS,
    promptInstall,
    dismissPrompt,
  };
}
