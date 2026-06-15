import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Image,
  FileText,
  Video,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
  Palette,
} from 'lucide-react';
import { useRecursos } from '@/hooks/useRecursos';

interface GaleriaRecursosProps {
  open: boolean;
  onClose: () => void;
}

// Carrusel horizontal reutilizable
function Carrusel<T>({
  items,
  renderItem,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500/10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500/10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function GaleriaRecursos({ open, onClose }: GaleriaRecursosProps) {
  const [activeTab, setActiveTab] = useState<'imagenes' | 'pdfs' | 'editables' | 'videos'>('imagenes');
  const { piezasGraficasApoyo, estrategiaMarketing, piezasEditables, videos } = useRecursos();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[2001] w-full max-w-2xl bg-slate-950 border-l border-cyan-500/20 shadow-2xl shadow-cyan-500/5 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-cyan-400 tracking-wider">
                  CENTRO DE RECURSOS
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mt-4 overflow-x-auto">
                {[
                  { key: 'imagenes' as const, label: 'Piezas Graficas', icon: Image },
                  { key: 'pdfs' as const, label: 'Marketing', icon: FileText },
                  { key: 'editables' as const, label: 'Editables', icon: Palette },
                  { key: 'videos' as const, label: 'Videos', icon: Video },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.key
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* ===== TAB: PIEZAS GRAFICAS DE APOYO ===== */}
              {activeTab === 'imagenes' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Image className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-base font-bold text-slate-200">
                      Piezas Graficas de Apoyo
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Imagenes de alta resolucion para descarga. Haz clic para ver en tamano completo.
                  </p>

                  <Carrusel
                    items={piezasGraficasApoyo}
                    renderItem={(img) => (
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-64 group"
                      >
                        <div className="relative rounded-xl overflow-hidden border border-slate-800 group-hover:border-cyan-500/40 transition-all">
                          <img
                            src={img.thumbnail}
                            alt={img.titulo}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                              {img.categoria}
                            </span>
                            <p className="text-xs text-slate-200 mt-1.5 font-medium truncate">
                              {img.titulo}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-7 h-7 rounded-full bg-slate-950/80 border border-cyan-500/30 flex items-center justify-center">
                              <ExternalLink className="w-3 h-3 text-cyan-400" />
                            </div>
                          </div>
                        </div>
                      </a>
                    )}
                  />
                </motion.div>
              )}

              {/* ===== TAB: ESTRATEGIA DE MARKETING (PDFs) ===== */}
              {activeTab === 'pdfs' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-orange-400" />
                    <h3 className="text-base font-bold text-slate-200">
                      Estrategia de Marketing
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Documentos PDF descargables con estrategias y planes de accion.
                  </p>

                  <Carrusel
                    items={estrategiaMarketing}
                    renderItem={(pdf) => (
                      <a
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-64 group"
                      >
                        <div className="relative rounded-xl overflow-hidden border border-slate-800 group-hover:border-orange-500/40 transition-all">
                          <img
                            src={pdf.portada}
                            alt={pdf.titulo}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-xs text-slate-200 font-medium truncate">
                              {pdf.titulo}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                              {pdf.descripcion}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-7 h-7 rounded-full bg-slate-950/80 border border-orange-500/30 flex items-center justify-center">
                              <Download className="w-3 h-3 text-orange-400" />
                            </div>
                          </div>
                        </div>
                      </a>
                    )}
                  />
                </motion.div>
              )}

              {/* ===== TAB: PIEZAS EDITABLES ===== */}
              {activeTab === 'editables' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Titulo principal */}
                  <div className="text-center py-4 border-y border-slate-800">
                    <Palette className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <h3 className="text-lg font-bold text-slate-200">
                      Piezas Graficas Editables y Analisis Estrategico Actual
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Plantillas y recursos editables para tus propios diseños
                    </p>
                  </div>

                  <Carrusel
                    items={piezasEditables}
                    renderItem={(img) => (
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-56 group"
                      >
                        <div className="relative rounded-xl overflow-hidden border border-slate-800 group-hover:border-purple-500/40 transition-all">
                          <img
                            src={img.thumbnail}
                            alt={img.titulo}
                            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                              {img.categoria}
                            </span>
                            <p className="text-xs text-slate-200 mt-1.5 font-medium truncate">
                              {img.titulo}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-7 h-7 rounded-full bg-slate-950/80 border border-purple-500/30 flex items-center justify-center">
                              <ExternalLink className="w-3 h-3 text-purple-400" />
                            </div>
                          </div>
                        </div>
                      </a>
                    )}
                  />
                </motion.div>
              )}

              {/* ===== TAB: VIDEOS ===== */}
              {activeTab === 'videos' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-slate-200">
                      Videos
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Contenido audiovisual sobre la localidad de Suba.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {videos.map((video) => (
                      <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="relative rounded-xl overflow-hidden border border-slate-800 group-hover:border-emerald-500/40 transition-all">
                          <div className="relative">
                            <img
                              src={video.thumbnail}
                              alt={video.titulo}
                              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-slate-950/70 border-2 border-emerald-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Video className="w-5 h-5 text-emerald-400 ml-0.5" />
                              </div>
                            </div>
                            {/* Duration badge */}
                            {video.duracion && (
                              <div className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
                                {video.duracion}
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="text-sm text-slate-200 font-medium group-hover:text-emerald-400 transition-colors">
                              {video.titulo}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {video.descripcion}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
