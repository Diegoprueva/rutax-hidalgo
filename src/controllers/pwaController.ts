import { useCallback, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/** Controlador 5: PWA (instalación, conexión y actualizaciones del service worker). */
export function usePwaController() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [online, setOnline] = useState(navigator.onLine);
  const [updateReady, setUpdateReady] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstallEvent(null);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .then((reg) => {
        const check = () => {
          if (reg.waiting && navigator.serviceWorker.controller) setUpdateReady(reg);
        };
        check();
        reg.addEventListener('updatefound', () => reg.installing?.addEventListener('statechange', check));
      })
      .catch(() => undefined);
  }, []);

  const install = useCallback(async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  }, [installEvent]);

  const applyUpdate = useCallback(() => {
    updateReady?.waiting?.postMessage('SKIP_WAITING');
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true });
  }, [updateReady]);

  return { canInstall: !!installEvent, install, online, updateAvailable: !!updateReady, applyUpdate };
}
