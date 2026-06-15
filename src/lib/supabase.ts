import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl.length > 0 && supabaseKey.length > 0;

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : (null as any);

export const MAP_DATA_TABLE = 'map_data';
export type MapDataType = 'pines' | 'lineas' | 'puntos' | 'labels';

function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isConfigured || !supabase) {
    return Promise.resolve(fallback);
  }
  try {
    return fn();
  } catch (err) {
    console.error('Supabase error:', err);
    return Promise.resolve(fallback);
  }
}

// Guardar TODO (pines + lineas + textos) en una sola operacion
export async function saveAllData(data: {
  pines: unknown[];
  lineas: unknown[];
  puntos: unknown[];
  labels: unknown[];
}): Promise<boolean> {
  return safeCall(async () => {
    const timestamp = new Date().toISOString();
    const rows = [
      { id: 'pines', tipo: 'pines', data: data.pines, updated_at: timestamp },
      { id: 'lineas', tipo: 'lineas', data: data.lineas, updated_at: timestamp },
      { id: 'puntos', tipo: 'puntos', data: data.puntos, updated_at: timestamp },
      { id: 'labels', tipo: 'labels', data: data.labels, updated_at: timestamp },
    ];

    const { error } = await supabase
      .from(MAP_DATA_TABLE)
      .upsert(rows, { onConflict: 'id' });

    if (error) {
      console.error('Error guardando datos:', error);
      return false;
    }

    return true;
  }, false);
}

// Cargar TODO de la nube
export async function loadAllData(): Promise<{
  pines: unknown[];
  lineas: unknown[];
  puntos: unknown[];
  labels: unknown[];
}> {
  return safeCall(async () => {
    const { data: rows, error } = await supabase
      .from(MAP_DATA_TABLE)
      .select('*');

    if (error) {
      console.error('Error cargando datos:', error);
      return { pines: [], lineas: [], puntos: [], labels: [] };
    }

    const result = { pines: [], lineas: [], puntos: [], labels: [] };
    if (rows) {
      for (const row of rows) {
        if (row.tipo === 'pines' && Array.isArray(row.data)) result.pines = row.data;
        if (row.tipo === 'lineas' && Array.isArray(row.data)) result.lineas = row.data;
        if (row.tipo === 'puntos' && Array.isArray(row.data)) result.puntos = row.data;
        if (row.tipo === 'labels' && Array.isArray(row.data)) result.labels = row.data;
      }
    }
    return result;
  }, { pines: [], lineas: [], puntos: [], labels: [] });
}

// Verificar si Supabase esta configurado
export function isSupabaseReady(): boolean {
  return isConfigured;
}
