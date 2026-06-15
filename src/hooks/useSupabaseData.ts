import { useState, useCallback, useRef } from 'react';
import { MapaSuba } from '@/components/MapaSuba';
import type { MapaSubaHandle } from '@/components/MapaSuba';
import { Buscador } from '@/components/Buscador';
import { InfoCard } from '@/components/InfoCard';
import { LeyendaUPZ } from '@/components/LeyendaUPZ';
import { usePines } from '@/hooks/usePines';
import { useLineas } from '@/hooks/useLineas';
import { useUPZRef } from '@/hooks/useUPZRef';
import { useTextLabels } from '@/hooks/useTextLabels';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import type { Pin, PuntoLinea } from '@/types';
import { Loader2, MapPin, Route, FolderOpen, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { GaleriaRecursos } from '@/components/GaleriaRecursos';
import { AnalisisCampana } from '@/components/AnalisisCampana';

export function Home() {
  const { pines: sbPines, lineas: sbLineas, puntos: sbPuntos, labels: sbLabels, loading: sbLoading, configured: sbConfigured } = useSupabaseData();
  const { pines: localPines, loading: localPinesLoading } = usePines();
  const { lineas: localLineas, puntos: localPuntos, loading: localLineasLoading } = useLineas();
  const { labels: localLabels } = useTextLabels();
  const { centros: centrosUPZ } = useUPZRef();

  const pines = sbConfigured ? sbPines : localPines;
  const lineas = sbConfigured ? sbLineas : localLineas;
  const puntosLinea = sbConfigured ? sbPuntos : localPuntos;
  const textLabels = sbConfigured ? sbLabels : localLabels;
  const loading = sbConfigured ? sbLoading : (localPinesLoading || localLineasLoading);

  const [pinSeleccionado, setPinSeleccionado] = useState<Pin | null>(null);
  const [puntoSeleccionado, setPuntoSeleccionado] = useState<PuntoLinea | null>(null);
  const [recursosOpen, setRecursosOpen] = useState(false);
  const [analisisOpen, setAnalisisOpen] = useState(false);
  const mapaRef = useRef<MapaSubaHandle>(null);

  const handlePinSelect = useCallback((pin: Pin) => { setPinSeleccionado(pin); setPuntoSeleccionado(null); }, []);
  const handlePuntoSelect = useCallback((punto: PuntoLinea) => { setPuntoSeleccionado(punto); setPinSeleccionado(null); }, []);
  const handleCloseInfo = useCallback(() => { setPinSeleccionado(null); setPuntoSeleccionado(null); }, []);
  const handleBuscar = useCallback((coordenadas: [number, number], zoom?: number) => { mapaRef.current?.flyTo(coordenadas[0], coordenadas[1], zoom || 15); }, []);
  const handleFlyToLeyenda = useCallback((lat: number, lng: number, zoom?: number) => { mapaRef.current?.flyTo(lat, lng, zoom || 14); }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <div className="absolute top-4 left-0 right-0 z-[1000] px-4 pointer-events-none"><div className="pointer-events-auto max-w-md mx-auto"><Buscador onSeleccionar={handleBuscar} /></div></div>
      {!loading && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute top-16 left-4 z-[1000] space-y-2"><div className="bg-slate-950/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg px-3 py-2"><div className="flex items-center gap-2 text-xs text-slate-400"><MapPin className="w-3 h-3 text-cyan-400" /><span><span className="text-cyan-400 font-semibold">{pines.length}</span> pines</span></div></div><div className="bg-slate-950/60 backdrop-blur-sm border border-orange-500/20 rounded-lg px-3 py-2"><div className="flex items-center gap-2 text-xs text-slate-400"><Route className="w-3 h-3 text-orange-400" /><span><span className="text-orange-400 font-semibold">{lineas.length}</span> rutas</span></div></div></motion.div>)}
      <div className="relative w-full h-full">
        {loading ? (<div className="w-full h-full flex items-center justify-center bg-slate-950"><div className="text-center"><Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" /><p className="text-sm text-slate-400">Cargando mapa...</p></div></div>) : (<MapaSuba ref={mapaRef} pines={pines} pinSeleccionado={pinSeleccionado} onPinSelect={handlePinSelect} lineas={lineas} puntosLinea={puntosLinea} puntoSeleccionado={puntoSeleccionado} onPuntoSelect={handlePuntoSelect} textLabels={textLabels} />)}
      </div>
      {!loading && <LeyendaUPZ onFlyTo={handleFlyToLeyenda} centrosUPZ={centrosUPZ} />}
      <InfoCard pin={pinSeleccionado} puntoLinea={puntoSeleccionado} onClose={handleCloseInfo} />
      <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-2">
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 }} onClick={() => setAnalisisOpen(true)} className="flex items-center gap-2 px-4 py-3 bg-slate-950/80 backdrop-blur-md border border-orange-500/30 rounded-xl text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/50 transition-all shadow-lg shadow-orange-500/5"><Megaphone className="w-5 h-5" /><span className="text-xs font-medium hidden sm:inline">Analisis de Campana</span></motion.button>
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }} onClick={() => setRecursosOpen(true)} className="flex items-center gap-2 px-4 py-3 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 rounded-xl text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all shadow-lg shadow-cyan-500/5"><FolderOpen className="w-5 h-5" /><span className="text-xs font-medium hidden sm:inline">Centro de Recursos</span></motion.button>
      </div>
      <GaleriaRecursos open={recursosOpen} onClose={() => setRecursosOpen(false)} />
      <AnalisisCampana open={analisisOpen} onClose={() => setAnalisisOpen(false)} />
      <div className="absolute top-16 right-4 z-[999] pointer-events-none"><div className="w-16 h-16 border-t-2 border-r-2 border-cyan-500/10 rounded-tr-xl" /></div>
      <div className="absolute bottom-4 right-4 z-[999] pointer-events-none"><div className="w-16 h-16 border-b-2 border-r-2 border-cyan-500/10 rounded-br-xl" /></div>
    </div>
  );
}
