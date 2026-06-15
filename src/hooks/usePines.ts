import { useState, useEffect, useCallback } from 'react';
import type { Pin } from '@/types';
import { pinesDemo } from '@/data/pines-demo';

const STORAGE_KEY = 'suba_pines';
const SYNC_EVENT = 'suba_pines_sync';

function loadFromStorage(): Pin[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignorar
  }
  return pinesDemo;
}

export function usePines() {
  const [pines, setPines] = useState<Pin[]>(loadFromStorage);

  // Al montar, forzar recarga desde localStorage (navegacion admin -> mapa)
  useEffect(() => {
    const reload = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        try { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) setPines(parsed); } catch { /* */ }
      }
    };
    reload();
    // Recargar tambien cuando el usuario vuelve a la pestana
    const handleVisibility = () => { if (!document.hidden) reload(); };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Guardar en localStorage y notificar a otros componentes
  const saveAndNotify = useCallback((newPines: Pin[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPines));
    } catch {
      // Ignorar
    }
    // Notificar a otros componentes en la MISMA pestaña
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: newPines }));
  }, []);

  // Escuchar sincronizacion desde la misma pestaña (admin -> mapa)
  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<Pin[]>;
      if (customEvent.detail) {
        setPines(customEvent.detail);
      }
    };
    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  // Escuchar cambios desde otras pestañas
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setPines(parsed);
        } catch {
          // Ignorar
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addPin = useCallback(
    (pin: Omit<Pin, 'id' | 'creado_at'>): Pin => {
      const newPin: Pin = {
        ...pin,
        id: `pin-${Date.now()}`,
        creado_at: new Date().toISOString(),
      };
      setPines((prev) => {
        const updated = [newPin, ...prev];
        saveAndNotify(updated);
        return updated;
      });
      return newPin;
    },
    [saveAndNotify]
  );

  const editPin = useCallback(
    (id: string, updates: Partial<Pin>): Pin | null => {
      let updated: Pin | null = null;
      setPines((prev) => {
        const newPines = prev.map((p) => {
          if (p.id === id) {
            updated = { ...p, ...updates };
            return updated;
          }
          return p;
        });
        saveAndNotify(newPines);
        return newPines;
      });
      return updated;
    },
    [saveAndNotify]
  );

  const removePin = useCallback((id: string) => {
    setPines((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveAndNotify(updated);
      return updated;
    });
    return true;
  }, [saveAndNotify]);

  return {
    pines,
    loading: false,
    addPin,
    editPin,
    removePin,
  };
}
