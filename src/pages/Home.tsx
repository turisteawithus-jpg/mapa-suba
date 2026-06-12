import { useState, useCallback, useRef } from 'react';
import { MapaSuba } from '@/components/MapaSuba';
import type { MapaSubaHandle } from '@/components/MapaSuba';
import { Buscador } from '@/components/Buscador';
import { InfoCard } from '@/components/InfoCard';
import { LeyendaUPZ } from '@/components/LeyendaUPZ';
import { usePines } from '@/hooks/usePines';
import { useLineas } from '@/hooks/useLineas';
import { useUPZRef } from '@/hooks/useUPZRef';
import type { Pin, PuntoLinea } from '@/types';
import { Loader2, MapPin, Route } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home() {
  const { pines, loading: pinesLoading } = usePines();
  const { lineas, puntos: puntosLinea, loading: lineasLoading } = useLineas();
  const { centros: centrosUPZ } = useUPZRef();

  const [pinSeleccionado, setPinSeleccionado] = useState<Pin | null>(null);
  const [puntoSeleccionado, setPuntoSeleccionado] = useState<PuntoLinea | null>(null);
  const mapaRef = useRef<MapaSubaHandle>(null);

  const loading = pinesLoading || lineasLoading;

  const handlePinSelect = useCallback((pin: Pin) => {
    setPinSeleccionado(pin);
    setPuntoSeleccionado(null);
  }, []);

  const handlePuntoSelect = useCallback((punto: PuntoLinea) => {
    setPuntoSeleccionado(punto);
    setPinSeleccionado(null);
  }, []);

  const handleCloseInfo = useCallback(() => {
    setPinSeleccionado(null);
    setPuntoSeleccionado(null);
  }, []);

  const handleBuscar = useCallback(
    (coordenadas: [number, number], zoom?: number) => {
      mapaRef.current?.flyTo(coordenadas[0], coordenadas[1], zoom || 15);
    },
    []
  );

  const handleFlyToLeyenda = useCallback(
    (lat: number, lng: number, zoom?: number) => {
      mapaRef.current?.flyTo(lat, lng, zoom || 14);
    },
    []
  );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Search Bar */}
      <div className="absolute top-4 left-0 right-0 z-[1000] px-4 pointer-events-none">
        <div className="pointer-events-auto max-w-md mx-auto">
          <Buscador onSeleccionar={handleBuscar} />
        </div>
      </div>

      {/* Stats */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-16 left-4 z-[1000] space-y-2"
        >
          <div className="bg-slate-950/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>
                <span className="text-cyan-400 font-semibold">{pines.length}</span>{' '}
                pines
              </span>
            </div>
          </div>
          <div className="bg-slate-950/60 backdrop-blur-sm border border-orange-500/20 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Route className="w-3 h-3 text-orange-400" />
              <span>
                <span className="text-orange-400 font-semibold">{lineas.length}</span>{' '}
                rutas
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Map Container */}
      <div className="relative w-full h-full">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-950">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-400">Cargando mapa...</p>
            </div>
          </div>
        ) : (
          <MapaSuba
            ref={mapaRef}
            pines={pines}
            pinSeleccionado={pinSeleccionado}
            onPinSelect={handlePinSelect}
            lineas={lineas}
            puntosLinea={puntosLinea}
            puntoSeleccionado={puntoSeleccionado}
            onPuntoSelect={handlePuntoSelect}
          />
        )}
      </div>

      {/* UPZ Legend */}
      {!loading && <LeyendaUPZ onFlyTo={handleFlyToLeyenda} centrosUPZ={centrosUPZ} />}

      {/* Info Card - for pins and line points */}
      <InfoCard
        pin={pinSeleccionado}
        puntoLinea={puntoSeleccionado}
        onClose={handleCloseInfo}
      />

      {/* Corner decorations */}
      <div className="absolute top-16 right-4 z-[999] pointer-events-none">
        <div className="w-16 h-16 border-t-2 border-r-2 border-cyan-500/10 rounded-tr-xl" />
      </div>
      <div className="absolute bottom-4 right-4 z-[999] pointer-events-none">
        <div className="w-16 h-16 border-b-2 border-r-2 border-cyan-500/10 rounded-br-xl" />
      </div>
    </div>
  );
}
