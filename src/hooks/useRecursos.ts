import { useState, useEffect, useCallback } from 'react';
import {
  piezasGraficasApoyo as defaultPiezas,
  estrategiaMarketing as defaultEstrategia,
  piezasEditables as defaultEditables,
  videos as defaultVideos,
} from '@/data/recursos-demo';

const STORAGE_KEY = 'suba_recursos';

interface RecursosData {
  piezasGraficasApoyo: typeof defaultPiezas;
  estrategiaMarketing: typeof defaultEstrategia;
  piezasEditables: typeof defaultEditables;
  videos: typeof defaultVideos;
}

function loadFromStorage(): RecursosData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (parsed.piezasGraficasApoyo) return parsed;
    }
  } catch { /* */ }
  return {
    piezasGraficasApoyo: defaultPiezas,
    estrategiaMarketing: defaultEstrategia,
    piezasEditables: defaultEditables,
    videos: defaultVideos,
  };
}

export function useRecursos() {
  const [data, setData] = useState<RecursosData>(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* */ }
  }, [data]);

  const updatePiezas = useCallback((piezas: typeof defaultPiezas) => {
    setData((prev) => ({ ...prev, piezasGraficasApoyo: piezas }));
  }, []);

  const updateEstrategia = useCallback((estrategia: typeof defaultEstrategia) => {
    setData((prev) => ({ ...prev, estrategiaMarketing: estrategia }));
  }, []);

  const updateEditables = useCallback((editables: typeof defaultEditables) => {
    setData((prev) => ({ ...prev, piezasEditables: editables }));
  }, []);

  const updateVideos = useCallback((videos: typeof defaultVideos) => {
    setData((prev) => ({ ...prev, videos }));
  }, []);

  return {
    piezasGraficasApoyo: data.piezasGraficasApoyo,
    estrategiaMarketing: data.estrategiaMarketing,
    piezasEditables: data.piezasEditables,
    videos: data.videos,
    updatePiezas,
    updateEstrategia,
    updateEditables,
    updateVideos,
  };
}
