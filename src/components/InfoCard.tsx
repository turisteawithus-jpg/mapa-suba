import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  MapPin,
  Building2,
  LocateFixed,
  Calendar,
  Play,
  Route,
  Navigation,
} from 'lucide-react';
import { GaleriaPin } from '@/components/GaleriaPin';
import { Button } from '@/components/ui/button';
import type { Pin, PuntoLinea, NotaPin } from '@/types';
import { upzData } from '@/data/upz-data';
import { NotaPanel, NotaDetalle } from '@/components/NotaPanel';

interface InfoCardProps {
  pin: Pin | null;
  puntoLinea: PuntoLinea | null;
  onClose: () => void;
}

function VideoPlayer({ url }: { url: string }) {
  const embedUrl = useMemo(() => {
    if (!url) return null;
    const youtubeMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    if (url.includes('youtube.com/embed')) {
      return url;
    }
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
      return 'direct';
    }
    return null;
  }, [url]);

  if (!url || !embedUrl) {
    return (
      <div className="w-full aspect-video bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Play className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-500">No hay video disponible</p>
        </div>
      </div>
    );
  }

  if (embedUrl === 'direct') {
    return (
      <video
        src={url}
        controls
        className="w-full aspect-video rounded-lg border border-slate-800"
        poster=""
      />
    );
  }

  return (
    <div className="w-full aspect-video rounded-lg border border-slate-800 overflow-hidden bg-slate-950">
      <iframe
        src={embedUrl}
        title="Video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function getUPZColor(upzName: string): string {
  const upz = upzData.find(
    (u) =>
      u.nombre.toLowerCase().includes(upzName.toLowerCase()) ||
      upzName.toLowerCase().includes(u.nombre.toLowerCase())
  );
  return upz?.colorNeon || '#00f3ff';
}

// Normalized data from either Pin or PuntoLinea
function useItemData(item: Pin | PuntoLinea | null) {
  return useMemo(() => {
    if (!item) return null;
    if ('upz' in item) {
      return {
        type: 'pin' as const,
        titulo: item.titulo,
        descripcion: item.descripcion,
        color: getUPZColor(item.upz),
        upz: item.upz,
        barrio: item.barrio,
        direccion: item.direccion_referencia,
        latitud: item.latitud,
        longitud: item.longitud,
        imagen_url: item.imagen_url,
        imagen_descarga_url: item.imagen_descarga_url,
        video_url: item.video_url,
        notas: item.notas,
        fecha: item.creado_at,
        galeria_imagenes: item.galeria_imagenes,
        galeria_videos: item.galeria_videos,
      };
    } else {
      return {
        type: 'punto' as const,
        titulo: item.titulo,
        descripcion: item.descripcion,
        color: item.color,
        upz: null,
        barrio: null,
        direccion: null,
        latitud: item.latitud,
        longitud: item.longitud,
        imagen_url: item.imagen_url,
        imagen_descarga_url: item.imagen_descarga_url,
        video_url: item.video_url,
        notas: item.notas,
        fecha: item.creado_at,
        galeria_imagenes: item.galeria_imagenes,
        galeria_videos: item.galeria_videos,
      };
    }
  }, [item]);
}

export function InfoCard({ pin, puntoLinea, onClose }: InfoCardProps) {
  const item = pin || puntoLinea;
  const data = useItemData(item);
  const [notaSeleccionada, setNotaSeleccionada] = useState<NotaPin | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  return (<>
    <AnimatePresence>
      {data && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1500]"
          />

          {/* Card */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-slate-950/95 backdrop-blur-xl border-l z-[1501] overflow-y-auto scrollbar-thin"
            style={{
              borderLeftColor: `${data.color}30`,
              boxShadow: `-10px 0 40px ${data.color}10`,
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl font-bold leading-tight"
                    style={{ color: data.color, textShadow: `0 0 15px ${data.color}40` }}
                  >
                    {data.titulo}
                  </motion.h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-2"
              >
                {data.type === 'punto' ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      color: data.color,
                      borderColor: `${data.color}40`,
                      background: `${data.color}10`,
                    }}
                  >
                    <Route className="w-3 h-3" />
                    Punto de Ruta
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      color: data.color,
                      borderColor: `${data.color}40`,
                      background: `${data.color}10`,
                    }}
                  >
                    <LocateFixed className="w-3 h-3" />
                    {data.upz}
                  </span>
                )}
                {data.barrio && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-slate-700 text-slate-300 bg-slate-800/50">
                    <Building2 className="w-3 h-3" />
                    {data.barrio}
                  </span>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {data.descripcion}
                </p>
              </motion.div>

              {/* Address */}
              {data.direccion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-start gap-2 text-sm text-slate-400"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-500" />
                  <span>{data.direccion}</span>
                </motion.div>
              )}

              {/* Galeria de imagenes y videos */}
              {(data.galeria_imagenes || data.galeria_videos) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.27 }}
                >
                  <GaleriaPin
                    imagenes={data.galeria_imagenes}
                    videos={data.galeria_videos}
                  />
                </motion.div>
              )}

              {/* Coordinates + Google Maps */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-800">
                  <span>Lat: {data.latitud.toFixed(6)}</span>
                  <span className="text-slate-700">|</span>
                  <span>Lng: {data.longitud.toFixed(6)}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitud},${data.longitud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium border transition-all bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Como llegar con Google Maps
                </a>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: data.color, boxShadow: `0 0 6px ${data.color}` }}
                  />
                  Imagen
                </h3>
                <div
                  className="rounded-xl overflow-hidden border"
                  style={{ borderColor: `${data.color}20` }}
                >
                  <img
                    src={data.imagen_url}
                    alt={data.titulo}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                  asChild
                >
                  <a
                    href={data.imagen_descarga_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Imagen
                  </a>
                </Button>
              </motion.div>

              {/* Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="space-y-3"
              >
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: data.color, boxShadow: `0 0 6px ${data.color}` }}
                  />
                  Video
                </h3>
                <VideoPlayer url={data.video_url} />
              </motion.div>

              {/* Notas acumuladas - botones */}
              {data.notas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                >
                  <NotaPanel
                    notas={data.notas}
                    onSelectNota={(nota) => setNotaSeleccionada(nota)}
                  />
                </motion.div>
              )}

              {/* Created at */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-xs text-slate-500 pt-4 border-t border-slate-800"
              >
                <Calendar className="w-3 h-3" />
                <span>
                  Creado: {new Date(data.fecha).toLocaleDateString('es-CO')}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* Nota Detalle - se abre al click en un botón de nota */}
    <NotaDetalle
      nota={notaSeleccionada}
      onClose={() => setNotaSeleccionada(null)}
    />
  </>);
}
