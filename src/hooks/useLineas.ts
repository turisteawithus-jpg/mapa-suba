import type { Linea, PuntoLinea } from '@/types';
import { lineasDemo, puntosLineaDemo } from '@/data/lineas-demo';

const STORAGE_KEY_LINEAS = 'suba_lineas';
const STORAGE_KEY_PUNTOS = 'suba_puntos_linea';

function loadLineasFromStorage(): Linea[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LINEAS);
    // Si hay ALGO en localStorage (incluso [] vacio), usarlo.
    // Solo usar datos demo si NUNCA se ha guardado nada.
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch { /* ignore */ }
  return lineasDemo;
}

function loadPuntosFromStorage(): PuntoLinea[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PUNTOS);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch { /* ignore */ }
  return puntosLineaDemo;
}

export function useLineas() {
  const [lineas, setLineas] = useState<Linea[]>(loadLineasFromStorage);
  const [puntos, setPuntos] = useState<PuntoLinea[]>(loadPuntosFromStorage);
  const [loading] = useState(false);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LINEAS, JSON.stringify(lineas));
    } catch { /* ignore */ }
  }, [lineas]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PUNTOS, JSON.stringify(puntos));
    } catch { /* ignore */ }
  }, [puntos]);

  // Escuchar cambios desde otras rutas
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_LINEAS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setLineas(parsed);
        } catch { /* ignore */ }
      }
      if (e.key === STORAGE_KEY_PUNTOS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setPuntos(parsed);
        } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // LINEAS
  const addLinea = useCallback(
    (linea: Omit<Linea, 'id' | 'creado_at'>): Linea => {
      const newLinea: Linea = {
        ...linea,
        id: `linea-${Date.now()}`,
        creado_at: new Date().toISOString(),
      };
      setLineas((prev) => [newLinea, ...prev]);
      return newLinea;
    },
    []
  );

  const editLinea = useCallback(
    (id: string, updates: Partial<Linea>) => {
      setLineas((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
      );
    },
    []
  );

  const removeLinea = useCallback((id: string) => {
    setLineas((prev) => prev.filter((l) => l.id !== id));
    setPuntos((prev) => prev.filter((p) => p.linea_id !== id));
  }, []);

  // PUNTOS
  const addPunto = useCallback(
    (punto: Omit<PuntoLinea, 'id' | 'creado_at'>): PuntoLinea => {
      const newPunto: PuntoLinea = {
        ...punto,
        id: `punto-${Date.now()}`,
        creado_at: new Date().toISOString(),
      };
      setPuntos((prev) => [...prev, newPunto]);
      return newPunto;
    },
    []
  );

  const editPunto = useCallback(
    (id: string, updates: Partial<PuntoLinea>) => {
      setPuntos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    },
    []
  );

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
