import { useState, useEffect, useCallback } from 'react';
import type { BloqueNota } from '@/types';
import { bloquesNotaDemo } from '@/data/notas-demo';

export function useNotas() {
  const [notas, setNotas] = useState<BloqueNota[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNotas(bloquesNotaDemo);
    setLoading(false);
  }, []);

  const addNota = useCallback((nota: Omit<BloqueNota, 'id' | 'creado_at'>) => {
    const newNota: BloqueNota = {
      ...nota,
      id: `nota-${Date.now()}`,
      creado_at: new Date().toISOString(),
    };
    setNotas((prev) => [...prev, newNota]);
    return newNota;
  }, []);

  const editNota = useCallback((id: string, updates: Partial<BloqueNota>) => {
    setNotas((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  }, []);

  const removeNota = useCallback((id: string) => {
    setNotas((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const updateNotaContenido = useCallback(
    (id: string, titulo: string, contenido: string) => {
      setNotas((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                nota: {
                  titulo,
                  contenido,
                  ultima_edicion: new Date().toISOString(),
                },
              }
            : n
        )
      );
    },
    []
  );

  return {
    notas,
    loading,
    addNota,
    editNota,
    removeNota,
    updateNotaContenido,
  };
}
