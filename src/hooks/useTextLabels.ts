import { useState, useEffect, useCallback } from 'react';
import type { TextoLabel } from '@/types';

const STORAGE_KEY = 'suba_texto_labels';
const SYNC_EVENT = 'suba_labels_sync';

function loadLabels(): TextoLabel[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch { /* ignore */ }
  return [];
}

export function useTextLabels() {
  const [labels, setLabels] = useState<TextoLabel[]>(loadLabels);

  // Al montar, forzar recarga desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      try { const p = JSON.parse(saved); if (Array.isArray(p)) setLabels(p); } catch { /* */ }
    }
  }, []);

  // Guardar y notificar
  const saveLabels = useCallback((newLabels: TextoLabel[]) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newLabels)); } catch { /* */ }
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: newLabels }));
  }, []);

  // Sincronizacion misma pestaña
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<TextoLabel[]>;
      if (ce.detail) setLabels(ce.detail);
    };
    window.addEventListener(SYNC_EVENT, handler);
    return () => window.removeEventListener(SYNC_EVENT, handler);
  }, []);

  // Otras pestañas
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { const p = JSON.parse(e.newValue); if (Array.isArray(p)) setLabels(p); } catch { /* */ }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addLabel = useCallback((label: Omit<TextoLabel, 'id' | 'creado_at'>): TextoLabel => {
    const newLabel: TextoLabel = { ...label, id: `label-${Date.now()}`, creado_at: new Date().toISOString() };
    setLabels((prev) => { const updated = [...prev, newLabel]; saveLabels(updated); return updated; });
    return newLabel;
  }, [saveLabels]);

  const editLabel = useCallback((id: string, updates: Partial<TextoLabel>) => {
    setLabels((prev) => { const updated = prev.map((l) => (l.id === id ? { ...l, ...updates } : l)); saveLabels(updated); return updated; });
  }, [saveLabels]);

  const removeLabel = useCallback((id: string) => {
    setLabels((prev) => { const updated = prev.filter((l) => l.id !== id); saveLabels(updated); return updated; });
  }, [saveLabels]);

  return { labels, loading: false, addLabel, editLabel, removeLabel };
}
