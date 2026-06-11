import { createClient } from '@supabase/supabase-js';
import type { Pin } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
const isConfigured = supabaseUrl.length > 0 && supabaseKey.length > 0;

// Create client only if configured, otherwise create a dummy client
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : (null as any);

// Safe wrapper for Supabase calls
function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isConfigured || !supabase) {
    console.warn('Supabase no esta configurado. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.');
    return Promise.resolve(fallback);
  }
  try {
    return fn();
  } catch (err) {
    console.error('Supabase error:', err);
    return Promise.resolve(fallback);
  }
}

// CRUD Operations
export async function getPines(): Promise<Pin[]> {
  return safeCall(async () => {
    const { data, error } = await supabase
      .from('pines_mapa')
      .select('*')
      .order('creado_at', { ascending: false });

    if (error) {
      console.error('Error fetching pines:', error);
      return [];
    }

    return data || [];
  }, []);
}

export async function getPinById(id: string): Promise<Pin | null> {
  return safeCall(async () => {
    const { data, error } = await supabase
      .from('pines_mapa')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching pin:', error);
      return null;
    }

    return data;
  }, null);
}

export async function createPin(
  pin: Omit<Pin, 'id' | 'creado_at'>
): Promise<Pin | null> {
  return safeCall(async () => {
    const { data, error } = await supabase
      .from('pines_mapa')
      .insert([pin])
      .select()
      .single();

    if (error) {
      console.error('Error creating pin:', error);
      return null;
    }

    return data;
  }, null);
}

export async function updatePin(
  id: string,
  pin: Partial<Pin>
): Promise<Pin | null> {
  return safeCall(async () => {
    const { data, error } = await supabase
      .from('pines_mapa')
      .update(pin)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pin:', error);
      return null;
    }

    return data;
  }, null);
}

export async function deletePin(id: string): Promise<boolean> {
  return safeCall(async () => {
    const { error } = await supabase.from('pines_mapa').delete().eq('id', id);

    if (error) {
      console.error('Error deleting pin:', error);
      return false;
    }

    return true;
  }, false);
}

// Subscribe to realtime changes
export function subscribeToPines(
  callback: (payload: { eventType: string; new: Pin; old: Pin }) => void
) {
  if (!isConfigured || !supabase) {
    // Return a dummy channel that does nothing
    return {
      unsubscribe: () => {},
      subscribe: () => ({} as any),
      on: () => ({} as any),
    } as any;
  }

  const channel = supabase
    .channel('pines_mapa_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'pines_mapa',
      },
      (payload: any) => {
        callback(payload as unknown as { eventType: string; new: Pin; old: Pin });
      }
    )
    .subscribe();

  return channel;
}
