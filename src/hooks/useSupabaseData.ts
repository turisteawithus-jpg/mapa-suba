import { useState, useEffect, useCallback } from 'react';
import { supabase, MAP_DATA_TABLE } from '@/lib/supabase';
import type { Pin, Linea, PuntoLinea, TextoLabel } from '@/types';

interface MapDataBundle {
  pines: Pin[];
  lineas: Linea[];
  puntos: PuntoLinea[];
  labels: TextoLabel[];
}

function isSupabaseConfigured(): boolean {
  try {
    const url = (supabase as unknown as { supabaseUrl: string }).supabaseUrl;
    return url.includes('zukpemwchcplgnphqhuf');
  } catch {
    return false;
  }
}

export function useSupabaseData() {
  const [data, setData] = useState<MapDataBundle>({
    pines: [],
    lineas: [],
    puntos: [],
    labels: [],
  });
  const [loading, setLoading] = useState(true);
  const [configured] = useState(isSupabaseConfigured);

  const loadData = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data: rows, error: dbError } = await supabase
        .from(MAP_DATA_TABLE)
        .select('*');

      if (dbError) throw dbError;

      const bundle: MapDataBundle = {
        pines: [],
        lineas: [],
        puntos: [],
        labels: [],
      };

      if (rows) {
        for (const row of rows) {
          if (row.tipo === 'pines' && Array.isArray(row.data))
            bundle.pines = row.data;
          if (row.tipo === 'lineas' && Array.isArray(row.data))
            bundle.lineas = row.data;
          if (row.tipo === 'puntos' && Array.isArray(row.data))
            bundle.puntos = row.data;
          if (row.tipo === 'labels' && Array.isArray(row.data))
            bundle.labels = row.data;
        }
      }

      setData(bundle);
    } catch {
      /* fallback silencioso */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveData = useCallback(
    async (bundle: MapDataBundle): Promise<boolean> => {
      if (!isSupabaseConfigured()) return false;
      setLoading(true);
      try {
        const timestamp = new Date().toISOString();
        const rows = [
          {
            id: 'pines',
            tipo: 'pines',
            data: bundle.pines,
            updated_at: timestamp,
          },
          {
            id: 'lineas',
            tipo: 'lineas',
            data: bundle.lineas,
            updated_at: timestamp,
          },
          {
            id: 'puntos',
            tipo: 'puntos',
            data: bundle.puntos,
            updated_at: timestamp,
          },
          {
            id: 'labels',
            tipo: 'labels',
            data: bundle.labels,
            updated_at: timestamp,
          },
        ];
        const { error: dbError } = await supabase
          .from(MAP_DATA_TABLE)
          .upsert(rows, { onConflict: 'id' });
        if (dbError) throw dbError;
        setData(bundle);
        return true;
      } catch {
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    pines: data.pines,
    lineas: data.lineas,
    puntos: data.puntos,
    labels: data.labels,
    loading,
    configured,
    loadData,
    saveData,
  };
}
