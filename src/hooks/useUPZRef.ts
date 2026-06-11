import { useState, useCallback, useEffect } from 'react';
import { upzCentros as upzCentrosDefault } from '@/data/upz-data';

// Puntos de referencia por UPZ - el admin define donde centra el mapa
// cuando un usuario selecciona esa UPZ en la leyenda
const STORAGE_KEY = 'suba_upz_referencias';

export function useUPZRef() {
  // Cargar desde localStorage o usar los valores por defecto
  const [centros, setCentros] = useState<Record<string, [number, number]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge con defaults para asegurar que todas las UPZ tengan un valor
        return { ...upzCentrosDefault, ...parsed };
      }
    } catch {
      // Si hay error, usar defaults
    }
    return { ...upzCentrosDefault };
  });

  // Persistir en localStorage cuando cambian
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(centros));
    } catch {
      // Ignorar errores de localStorage
    }
  }, [centros]);

  // Actualizar el punto de referencia de una UPZ (usado por el admin)
  const setCentroUPZ = useCallback((upzNombre: string, lat: number, lng: number) => {
    setCentros((prev) => ({
      ...prev,
      [upzNombre]: [lat, lng] as [number, number],
    }));
  }, []);

  // Obtener el punto de referencia de una UPZ
  const getCentroUPZ = useCallback(
    (upzNombre: string): [number, number] | undefined => {
      return centros[upzNombre];
    },
    [centros]
  );

  // Resetear a valores por defecto
  const resetDefaults = useCallback(() => {
    setCentros({ ...upzCentrosDefault });
  }, []);

  return {
    centros,
    setCentroUPZ,
    getCentroUPZ,
    resetDefaults,
  };
}
