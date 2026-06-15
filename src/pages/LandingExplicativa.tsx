import { motion } from 'framer-motion';
import { MapPin, Target, Users, Megaphone, ChevronRight, FileText, Video, Image, BarChart3 } from 'lucide-react';

interface LandingExplicativaProps {
  onEnterMap: () => void;
}

const FEATURES = [
  {
    icon: Target,
    title: 'Zonas Naranjas',
    desc: 'Identifica los barrios decisivos donde el cambio es posible. Segmenta el electorado por preocupaciones reales.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: MapPin,
    title: 'Rutas de Alto Transito',
    desc: 'Planifica recorridos estrategicos por horarios de alta afluencia. Optimiza el alcance de cada accion de campana.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Image,
    title: 'Piezas Graficas por Zona',
    desc: 'Accede a material visual especifico para cada segmento. Empapela con mensajes directos y contextualizados.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Video,
    title: 'Videos de Campana',
    desc: 'Comparte contenido audiovisual que resuene en cada comunidad. QR con mensajes de un minuto para cada nicho.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Users,
    title: 'Perfiles de Votante',
    desc: 'Entiende la logica de votacion de cada segmento. Conoce sus miedos, esperanzas y lo que los mueve.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analisis Estrategico',
    desc: 'Cinco ejes de mensaje validados. Lo que se debe decir, lo que no, y como decirlo en cada canal.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

export function LandingExplicativa({ onEnterMap }: LandingExplicativaProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[3001] bg-[#0a1628] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,243,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          className="pt-12 pb-8 px-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Megaphone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-medium">
              Herramienta de Campana Ivan Cepeda 2026
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            SUBA PUEDE VOLVER A{' '}
            <span className="text-cyan-400">SER DEL CAMBIO</span>
          </h1>
        </motion.div>

        {/* Mission statement */}
        <motion.div
          className="px-6 max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Esta plataforma es una herramienta para los equipos de campana que trabajan
            por recuperar el voto en la localidad de Suba. No es un mapa turistico: es
            un <span className="text-cyan-400 font-semibold">sistema de inteligencia territorial</span> que permite
            identificar donde estan los votos que se perdieron, entender quienes son esos
            votantes, y planificar acciones concretas para recuperarlos.
          </p>
        </motion.div>

        {/* Context: Zonas Naranjas */}
        <motion.div
          className="px-6 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
            <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Las Zonas Naranjas
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Son los barrios de Suba donde ganó Petro en 2022 y ahora gano Abelardo.
              Familias de estratos 2-4, clase media trabajadora, asustada por la inseguridad
              y el costo de vida. No son de derecha ni de izquierda: son gente que quiere
              <span className="text-orange-400 font-semibold"> tranquilidad y estabilidad</span>.
              Votaron por el cambio y se desencantaron. Estan abiertos a escuchar si se les
              habla con respeto y propuestas concretas.
            </p>
          </div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              className={`${feat.bg} border ${feat.border} rounded-xl p-5`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
            >
              <feat.icon className={`w-6 h-6 ${feat.color} mb-3`} />
              <h4 className="text-slate-200 font-semibold text-sm mb-2">{feat.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How it works */}
        <motion.div
          className="px-6 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="border border-slate-800 rounded-2xl p-6 bg-slate-950/50">
            <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Como Funciona la Herramienta
            </h3>
            <div className="space-y-3">
              {[
                'Explora el mapa interactivo con las 12 UPZ de Suba y sus puntos de referencia',
                'Accede al "Analisis de Campana en Calle" para ver las zonas naranjas y perfiles de votante',
                'Consulta el "Centro de Recursos" para descargar piezas graficas, videos y el analisis estrategico completo',
                'Los administradores pueden agregar pines, lineas, puntos y galerias de contenido por zona',
                'Cada pin puede tener galeria de imagenes, videos y notas especificas para esa ubicacion',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                    {i + 1}
                  </span>
                  <p className="text-slate-400 text-xs leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="px-6 pb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <button
            onClick={onEnterMap}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30"
          >
            <MapPin className="w-5 h-5" />
            INGRESAR AL MAPA
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-slate-600 text-[10px] mt-4 uppercase tracking-widest">
            Localidad de Suba, Bogota — Campana Ivan Cepeda 2026
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
