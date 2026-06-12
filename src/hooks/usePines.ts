import { useState, useEffect, useCallback } from 'react';
import type { Pin } from '@/types';
import { pinesDemo } from '@/data/pines-demo';

const STORAGE_KEY = 'suba_pines';

function loadFromStorage(): Pin[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    // Si hay ALGO en localStorage (incluso [] vacio), usarlo.
    // Solo usar pinesDemo si NUNCA se ha guardado nada (saved === null).
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignorar errores de localStorage
  }
  return pinesDemo;
}

export function usePines() {
  const [pines, setPines] = useState<Pin[]>(loadFromStorage);
  const [loading] = useState(false);

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pines));
    } catch {
      // Ignorar errores
    }
  }, [pines]);

  // Escuchar cambios desde otras rutas (admin -> mapa)
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
      setPines((prev) => [newPin, ...prev]);
      return newPin;
    },
    []
  );

  const editPin = useCallback(
    (id: string, updates: Partial<Pin>): Pin | null => {
      let updated: Pin | null = null;
      setPines((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            updated = { ...p, ...updates };
            return updated;
          }
          return p;
        })
      );
      return updated;
    },
    []
  );

  const removePin = useCallback((id: string) => {
    setPines((prev) => prev.filter((p) => p.id !== id));
    return true;
  }, []);

  return {
    pines,
    loading,
    addPin,
    editPin,
    removePin,
  };
}
