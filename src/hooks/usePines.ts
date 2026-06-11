import { useState, useEffect, useCallback } from 'react';
import type { Pin } from '@/types';
import {
  getPines,
  createPin,
  updatePin,
  deletePin,
  subscribeToPines,
} from '@/lib/supabase';
import { pinesDemo } from '@/data/pines-demo';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
// Only consider Supabase configured if URL is a REAL Supabase URL (not placeholder)
const hasSupabase = supabaseUrl.includes('.supabase.co') && !supabaseUrl.includes('placeholder') && supabaseKey.length > 20;

export function usePines() {
  const [pines, setPines] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPines = useCallback(async () => {
    try {
      setLoading(true);
      
      if (!hasSupabase) {
        setPines(pinesDemo);
        setError(null);
        setLoading(false);
        return;
      }
      
      const data = await getPines();
      setPines(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching pines:', err);
      setPines(hasSupabase ? [] : pinesDemo);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPines();
  }, [fetchPines]);

  useEffect(() => {
    let channel: ReturnType<typeof subscribeToPines> | null = null;
    
    try {
      channel = subscribeToPines((payload: any) => {
        if (payload.eventType === 'INSERT') {
          setPines((prev) => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setPines((prev) =>
            prev.map((p) => (p.id === payload.new.id ? payload.new : p))
          );
        } else if (payload.eventType === 'DELETE') {
          setPines((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      });
    } catch (err) {
      console.warn('Realtime subscription not available:', err);
    }

    return () => {
      if (channel) {
        try {
          channel.unsubscribe();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  const addPin = useCallback(
    async (pin: Omit<Pin, 'id' | 'creado_at'>) => {
      try {
        const result = await createPin(pin);
        if (result) {
          setPines((prev) => [result, ...prev]);
        }
        return result;
      } catch (err) {
        console.error('Error adding pin:', err);
        return null;
      }
    },
    []
  );

  const editPin = useCallback(
    async (id: string, pin: Partial<Pin>) => {
      try {
        const result = await updatePin(id, pin);
        if (result) {
          setPines((prev) =>
            prev.map((p) => (p.id === id ? result : p))
          );
        }
        return result;
      } catch (err) {
        console.error('Error editing pin:', err);
        return null;
      }
    },
    []
  );

  const removePin = useCallback(async (id: string) => {
    try {
      const success = await deletePin(id);
      if (success) {
        setPines((prev) => prev.filter((p) => p.id !== id));
      }
      return success;
    } catch (err) {
      console.error('Error removing pin:', err);
      return false;
    }
  }, []);

  return {
    pines,
    loading,
    error,
    fetchPines,
    addPin,
    editPin,
    removePin,
  };
}
