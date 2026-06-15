import { useState, useEffect, useCallback } from 'react';
import type { Linea, PuntoLinea } from '@/types';
import { lineasDemo, puntosLineaDemo } from '@/data/lineas-demo';

const STORAGE_KEY_LINEAS = 'suba_lineas';
const STORAGE_KEY_PUNTOS = 'suba_puntos_linea';
const SYNC_EVENT_LINEAS = 'suba_lineas_sync';
const SYNC_EVENT_PUNTOS = 'suba_puntos_sync';

function loadLineas(): Linea[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LINEAS);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch { /* ignore */ }
  return lineasDemo;
}

function loadPuntos(): PuntoLinea[] {
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
  const [lineas, setLineas] = useState<Linea[]>(loadLineas);
  const [puntos, setPuntos] = useState<PuntoLinea[]>(loadPuntos);

  // Al montar, forzar recarga desde localStorage (navegacion admin -> mapa)
  useEffect(() => {
    const reload = () => {
      const savedLineas = localStorage.getItem(STORAGE_KEY_LINEAS);
      if (savedLineas !== null) {
        try { const p = JSON.parse(savedLineas); if (Array.isArray(p)) setLineas(p); } catch { /* */ }
      }
      const savedPuntos = localStorage.getItem(STORAGE_KEY_PUNTOS);
      if (savedPuntos !== null) {
        try { const p = JSON.parse(savedPuntos); if (Array.isArray(p)) setPuntos(p); } catch { /* */ }
      }
    };
    reload();
    // Recargar tambien cuando el usuario vuelve a la pestana
    const handleVisibility = () => { if (!document.hidden) reload(); };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Guardar y notificar
  const saveLineas = useCallback((newLineas: Linea[]) => {
    try { localStorage.setItem(STORAGE_KEY_LINEAS, JSON.stringify(newLineas)); } catch { /* */ }
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_LINEAS, { detail: newLineas }));
  }, []);

  const savePuntos = useCallback((newPuntos: PuntoLinea[]) => {
    try { localStorage.setItem(STORAGE_KEY_PUNTOS, JSON.stringify(newPuntos)); } catch { /* */ }
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_PUNTOS, { detail: newPuntos }));
  }, []);

  // Sincronizacion misma pestaña - lineas
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<Linea[]>;
      if (ce.detail) setLineas(ce.detail);
    };
    window.addEventListener(SYNC_EVENT_LINEAS, handler);
    return () => window.removeEventListener(SYNC_EVENT_LINEAS, handler);
  }, []);

  // Sincronizacion misma pestaña - puntos
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<PuntoLinea[]>;
      if (ce.detail) setPuntos(ce.detail);
    };
    window.addEventListener(SYNC_EVENT_PUNTOS, handler);
    return () => window.removeEventListener(SYNC_EVENT_PUNTOS, handler);
  }, []);

  // Otras pestañas
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_LINEAS && e.newValue) {
        try { const p = JSON.parse(e.newValue); if (Array.isArray(p)) setLineas(p); } catch { /* */ }
      }
      if (e.key === STORAGE_KEY_PUNTOS && e.newValue) {
        try { const p = JSON.parse(e.newValue); if (Array.isArray(p)) setPuntos(p); } catch { /* */ }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // LINEAS CRUD
  const addLinea = useCallback((linea: Omit<Linea, 'id' | 'creado_at'>): Linea => {
    const newLinea: Linea = { ...linea, id: `linea-${Date.now()}`, creado_at: new Date().toISOString() };
    setLineas((prev) => { const updated = [newLinea, ...prev]; saveLineas(updated); return updated; });
    return newLinea;
  }, [saveLineas]);

  const editLinea = useCallback((id: string, updates: Partial<Linea>) => {
    setLineas((prev) => { const updated = prev.map((l) => (l.id === id ? { ...l, ...updates } : l)); saveLineas(updated); return updated; });
  }, [saveLineas]);

  const removeLinea = useCallback((id: string) => {
    setLineas((prev) => { const updated = prev.filter((l) => l.id !== id); saveLineas(updated); return updated; });
    setPuntos((prev) => { const updated = prev.filter((p) => p.linea_id !== id); savePuntos(updated); return updated; });
  }, [saveLineas, savePuntos]);

  // PUNTOS CRUD
  const addPunto = useCallback((punto: Omit<PuntoLinea, 'id' | 'creado_at'>): PuntoLinea => {
    const newPunto: PuntoLinea = { ...punto, id: `punto-${Date.now()}`, creado_at: new Date().toISOString() };
    setPuntos((prev) => { const updated = [...prev, newPunto]; savePuntos(updated); return updated; });
    return newPunto;
  }, [savePuntos]);

  const editPunto = useCallback((id: string, updates: Partial<PuntoLinea>) => {
    setPuntos((prev) => { const updated = prev.map((p) => (p.id === id ? { ...p, ...updates } : p)); savePuntos(updated); return updated; });
  }, [savePuntos]);

  const removePunto = useCallback((id: string) => {
    setPuntos((prev) => { const updated = prev.filter((p) => p.id !== id); savePuntos(updated); return updated; });
  }, [savePuntos]);

  const getPuntosByLinea = useCallback((lineaId: string) => {
    return puntos.filter((p) => p.linea_id === lineaId).sort((a, b) => a.orden - b.orden);
  }, [puntos]);

  return { lineas, puntos, loading: false, addLinea, editLinea, removeLinea, addPunto, editPunto, removePunto, getPuntosByLinea };
}
