import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Megaphone,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

interface AnalisisCampanaProps {
  open: boolean;
  onClose: () => void;
}

const SECCIONES = [
  {
    id: 'objetivos',
    titulo: 'Objetivos de Campana',
    icono: Target,
    color: 'cyan',
    contenido: [
      { label: 'Posicionamiento territorial', valor: 'Fortalecer la identidad de Suba como localidad cultural y sostenible', estado: 'activo' },
      { label: 'Participacion ciudadana', valor: 'Incrementar en 40% la participacion en actividades comunitarias', estado: 'activo' },
      { label: 'Digitalizacion de servicios', valor: 'Migrar 60% de trámites a plataforma digital', estado: 'progreso' },
      { label: 'Infraestructura verde', valor: 'Recuperar 5 humedales y crear 10 nuevos parques vecinales', estado: 'planificado' },
    ],
  },
  {
    id: 'mensajes',
    titulo: 'Mensajes Clave en Calle',
    icono: MessageSquare,
    color: 'emerald',
    contenido: [
      { label: 'Suba Corazon Verde de Bogota', valor: 'Mensaje ambiental enfocado en humedales y zonas verdes', estado: 'activo' },
      { label: 'Tu Voz Cuenta en Suba', valor: 'Invitacion a participacion ciudadana y presupuesto participativo', estado: 'activo' },
      { label: 'Suba Conectada', valor: 'Nuevas rutas de transporte y ciclorrutas', estado: 'progreso' },
      { label: 'Cultura Subana', valor: 'Rescate de tradiciones y eventos culturales locales', estado: 'activo' },
    ],
  },
  {
    id: 'audiencia',
    titulo: 'Segmentacion de Audiencia',
    icono: Users,
    color: 'purple',
    contenido: [
      { label: 'Jovenes (18-30)', valor: 'Universitarios y jovenes profesionales. Enfoque digital y redes sociales', estado: 'activo' },
      { label: 'Familias (30-55)', valor: 'Padres de familia. Interes en seguridad, educacion y espacios recreativos', estado: 'activo' },
      { label: 'Adultos mayores (55+)', valor: 'Programas de inclusion digital y actividades culturales', estado: 'progreso' },
      { label: 'Emprendedores', valor: 'Apoyo a microempresas y ferias comerciales locales', estado: 'activo' },
    ],
  },
  {
    id: 'metricas',
    titulo: 'Metricas y Resultados',
    icono: TrendingUp,
    color: 'orange',
    contenido: [
      { label: 'Alcance en redes', valor: '125,000 interacciones mensuales en plataformas oficiales', estado: 'activo' },
      { label: 'Tasa de participacion', valor: '32% de incremento en eventos comunitarios vs periodo anterior', estado: 'activo' },
      { label: 'Satisfaccion ciudadana', valor: '4.2/5.0 en encuesta de percepcion de servicios locales', estado: 'activo' },
      { label: 'Cobertura territorial', valor: '100% de UPZ con al menos un punto de contacto activo', estado: 'activo' },
    ],
  },
];

const COLOR_MAP: Record<string, { text: string; bg: string; border: string; badge: string }> = {
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
};

const ESTADO_MAP: Record<string, string> = {
  activo: 'Activo',
  progreso: 'En progreso',
  planificado: 'Planificado',
};

export function AnalisisCampana({ open, onClose }: AnalisisCampanaProps) {
  const [seccionActiva, setSeccionActiva] = useState<string>('objetivos');

  const seccion = SECCIONES.find((s) => s.id === seccionActiva);
  const colors = seccion ? COLOR_MAP[seccion.color] : COLOR_MAP.cyan;

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
            className="fixed top-0 right-0 bottom-0 z-[2001] w-full max-w-2xl bg-slate-950 border-l border-cyan-500/20 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-cyan-400 tracking-wider">
                      ANALISIS ACTUALIZADO
                    </h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Lenguaje de Campana en Calle
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Menu de secciones */}
              <div className="grid grid-cols-2 gap-2">
                {SECCIONES.map((sec) => {
                  const c = COLOR_MAP[sec.color];
                  const isActive = seccionActiva === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSeccionActiva(sec.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                        isActive
                          ? `${c.bg} ${c.border}`
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <sec.icono className={`w-4 h-4 ${isActive ? c.text : 'text-slate-500'}`} />
                      <span className={`text-xs font-medium ${isActive ? c.text : 'text-slate-400'}`}>
                        {sec.titulo}
                      </span>
                      {isActive && <ChevronRight className={`w-3 h-3 ${c.text} ml-auto`} />}
                    </button>
                  );
                })}
              </div>

              {/* Seccion activa */}
              <AnimatePresence mode="wait">
                {seccion && (
                  <motion.div
                    key={seccion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className={`flex items-center gap-2 pb-3 border-b ${colors.border}`}>
                      <seccion.icono className={`w-5 h-5 ${colors.text}`} />
                      <h3 className={`text-sm font-bold ${colors.text}`}>{seccion.titulo}</h3>
                    </div>

                    <div className="space-y-3">
                      {seccion.contenido.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className={`bg-slate-900/50 border ${colors.border} rounded-xl p-4`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold ${colors.text} mb-1`}>
                                {item.label}
                              </p>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                {item.valor}
                              </p>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${colors.badge}`}>
                              {ESTADO_MAP[item.estado]}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fecha de actualizacion */}
              <div className="text-center pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-600">
                  Ultima actualizacion: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
