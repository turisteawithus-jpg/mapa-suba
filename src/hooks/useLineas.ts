import { useState, useEffect, useCallback } from 'react';
import type { Linea, PuntoLinea } from '@/types';
import { lineasDemo, puntosLineaDemo } from '@/data/lineas-demo';

export function useLineas() {
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [puntos, setPuntos] = useState<PuntoLinea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usar datos demo directamente (sin Supabase por ahora)
    setLineas(lineasDemo);
    setPuntos(puntosLineaDemo);
    setLoading(false);
  }, []);

  const addLinea = useCallback((linea: Omit<Linea, 'id' | 'creado_at'>) => {
    const newLinea: Linea = {
      ...linea,
      id: `linea-${Date.now()}`,
      creado_at: new Date().toISOString(),
    };
    setLineas((prev) => [...prev, newLinea]);
    return newLinea;
  }, []);

  const editLinea = useCallback((id: string, updates: Partial<Linea>) => {
    setLineas((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
  }, []);

  const removeLinea = useCallback((id: string) => {
    setLineas((prev) => prev.filter((l) => l.id !== id));
    setPuntos((prev) => prev.filter((p) => p.linea_id !== id));
  }, []);

  const addPunto = useCallback((punto: Omit<PuntoLinea, 'id' | 'creado_at'>) => {
    const newPunto: PuntoLinea = {
      ...punto,
      id: `punto-${Date.now()}`,
      creado_at: new Date().toISOString(),
    };
    setPuntos((prev) => [...prev, newPunto]);
    return newPunto;
  }, []);

  const editPunto = useCallback((id: string, updates: Partial<PuntoLinea>) => {
    setPuntos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const removePunto = useCallback((id: string) => {
    setPuntos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getPuntosByLinea = useCallback(
    (lineaId: string) => {
      return puntos
        .filter((p) => p.linea_id === lineaId)
        .sort((a, b) => a.orden - b.orden);
    },
    [puntos]
  );

  return {
    lineas,
    puntos,
    loading,
    addLinea,
    editLinea,
    removeLinea,
    addPunto,
    editPunto,
    removePunto,
    getPuntosByLinea,
  };
}
