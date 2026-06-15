import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Target,
  Users,
  Image,
  Video,
  BarChart3,
  FileText,
  ChevronDown,
} from 'lucide-react';

interface LandingProps {
  onEnter: () => void;
}

const FEATURES = [
  {
    icon: Target,
    title: 'Zonas Demarcadas',
    desc: 'Identifica las zonas estrategicas donde el cambio es posible. Segmenta el electorado por preocupaciones reales.',
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
    title: 'Contenido Audiovisual',
    desc: 'Comparte videos de campana que resuenen en cada comunidad. QR con mensajes de un minuto para cada nicho.',
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
    desc: 'Ejes de mensaje validados. Lo que se debe decir, lo que no, y como decirlo en cada canal.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

export function Landing({ onEnter }: LandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scale = 1 + Math.abs(mousePos.x) * 0.15 + Math.abs(mousePos.y) * 0.15;
  const translateX = mousePos.x * -30;
  const translateY = mousePos.y * -30;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[3000] bg-[#0a1628] overflow-y-scroll"
      style={{ scrollSnapType: 'y mandatory' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* SECCION 1: Imagen del candidato con efecto parallax */}
      <div
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
      >
        {/* Grid lines background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,243,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-orange-500/5 blur-[100px]" />

        {/* Candidate image with parallax */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <img
            src="/landing-candidato.png"
            alt="Ivan Cepeda"
            className="h-[85vh] w-auto object-contain"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(0, 243, 255, 0.2)) drop-shadow(0 0 80px rgba(0, 243, 255, 0.1))',
            }}
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Desplaza hacia abajo</span>
          <ChevronDown className="w-5 h-5 text-cyan-400/60" />
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-500/20 rounded-br-lg" />
      </div>

      {/* SECCION 2: Descripcion de la herramienta */}
      <div
        className="relative min-h-screen bg-[#0a1628] overflow-y-auto"
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
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

        <div className="relative z-10 px-6 py-16 max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-medium">
                Herramienta de Campana
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              SUBA PUEDE VOLVER A{' '}
              <span className="text-cyan-400">SER DEL CAMBIO</span>
            </h1>
          </motion.div>

          {/* Mission statement */}
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Esta plataforma es una herramienta para los equipos de campana que trabajan
              por recuperar el voto en la localidad de Suba. Es un{' '}
              <span className="text-cyan-400 font-semibold">sistema de inteligencia territorial</span>{' '}
              que permite identificar donde estan los votos que se perdieron, entender quienes
              son esos votantes, y planificar acciones concretas para recuperarlos.
            </p>
          </motion.div>

          {/* Context */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-6">
              <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Zonas Demarcadas
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Son los barrios de Suba donde el cambio es posible. Familias de estratos 2-4,
                clase media trabajadora. No son de derecha ni de izquierda: son gente que quiere
                <span className="text-orange-400 font-semibold"> tranquilidad y estabilidad</span>.
                Estan abiertos a escuchar si se les habla con respeto y propuestas concretas.
              </p>
            </div>
          </motion.div>

          {/* Features grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                className={`${feat.bg} border ${feat.border} rounded-xl p-5`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <feat.icon className={`w-6 h-6 ${feat.color} mb-3`} />
                <h4 className="text-slate-200 font-semibold text-sm mb-2">{feat.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* How it works */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="border border-slate-800 rounded-2xl p-6 bg-slate-950/50">
              <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Como Funciona la Herramienta
              </h3>
              <div className="space-y-3">
                {[
                  'Explora el mapa interactivo con las zonas demarcadas de Suba',
                  'Accede al "Analisis de Campana" para ver perfiles de votante y ejes de mensaje',
                  'Consulta el "Centro de Recursos" para descargar piezas graficas, videos y el analisis estrategico',
                  'Cada pin puede tener galeria de imagenes, videos y notas especificas para esa ubicacion',
                  'Planifica rutas de alto transito y acciones de campana por zona',
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
            className="text-center pb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={onEnter}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30"
            >
              <MapPin className="w-5 h-5" />
              INGRESAR AL MAPA
            </button>
            <p className="text-slate-600 text-[10px] mt-4 uppercase tracking-widest">
              Localidad de Suba, Bogota — Campana 2026
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
