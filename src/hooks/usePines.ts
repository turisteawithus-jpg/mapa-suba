import { useState, useEffect, useCallback } from 'react';
import type { Pin } from '@/types';
import { pinesDemo } from '@/data/pines-demo';

export function usePines() {
  const [pines, setPines] = useState<Pin[]>(pinesDemo);
  const [loading, setLoading] = useState(false);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('suba_pines');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPines(parsed);
        }
      }
    } catch {
      // Ignorar errores de localStorage
    }
    setLoading(false);
  }, []);

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    try {
      localStorage.setItem('suba_pines', JSON.stringify(pines));
    } catch {
      // Ignorar errores
    }
  }, [pines]);

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
