import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Target,
  Users,
  Image,
  Video,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronUp,
  Megaphone,
  Compass,
  Handshake,
  Zap,
} from 'lucide-react';

interface LandingProps {
  onEnter: () => void;
}

const SLIDES = [
  {
    id: 'candidato',
    bg: '#0a1628',
  },
  {
    id: 'presentacion',
    bg: '#0a1628',
  },
  {
    id: 'funcionalidades',
    bg: '#0a1628',
  },
  {
    id: 'como-funciona',
    bg: '#0a1628',
  },
];

const FEATURES = [
  { icon: Target, title: 'Zonas Demarcadas', desc: 'Identifica las zonas estrategicas donde el cambio es posible.', color: 'text-orange-400' },
  { icon: MapPin, title: 'Rutas de Alto Transito', desc: 'Planifica recorridos por horarios de alta afluencia.', color: 'text-cyan-400' },
  { icon: Image, title: 'Piezas Graficas', desc: 'Material visual especifico para cada segmento del territorio.', color: 'text-purple-400' },
  { icon: Video, title: 'Contenido Audiovisual', desc: 'Videos y QR con mensajes de un minuto para cada nicho.', color: 'text-emerald-400' },
  { icon: Users, title: 'Perfiles de Votante', desc: 'Entiende la logica de votacion de cada segmento.', color: 'text-pink-400' },
  { icon: BarChart3, title: 'Analisis Estrategico', desc: 'Ejes de mensaje validados. Lo que se debe decir y como.', color: 'text-amber-400' },
];

export function Landing({ onEnter }: LandingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Parallax en slide 1 (candidato)
  useEffect(() => {
    if (currentSlide !== 0) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    const el = containerRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, [currentSlide]);

  // Scroll wheel → cambiar diapositiva
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;
      if (e.deltaY > 30 && currentSlide < SLIDES.length - 1) {
        setCurrentSlide((p) => p + 1);
      } else if (e.deltaY < -30 && currentSlide > 0) {
        setCurrentSlide((p) => p - 1);
      }
      setTimeout(() => { isScrolling.current = false; }, 600);
    };
    const el = containerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, [currentSlide]);

  // Touch swipe
  useEffect(() => {
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = startY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSlide < SLIDES.length - 1) setCurrentSlide((p) => p + 1);
        else if (deltaY < 0 && currentSlide > 0) setCurrentSlide((p) => p - 1);
      }
    };
    const el = containerRef.current;
    if (el) { el.addEventListener('touchstart', handleTouchStart); el.addEventListener('touchend', handleTouchEnd); }
    return () => { if (el) { el.removeEventListener('touchstart', handleTouchStart); el.removeEventListener('touchend', handleTouchEnd); } }
  }, [currentSlide]);

  const scale = 1 + Math.abs(mousePos.x) * 0.15 + Math.abs(mousePos.y) * 0.15;
  const tx = mousePos.x * -30;
  const ty = mousePos.y * -30;

  const goNext = () => { if (currentSlide < SLIDES.length - 1) setCurrentSlide((p) => p + 1); };
  const goPrev = () => { if (currentSlide > 0) setCurrentSlide((p) => p - 1); };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[3000] overflow-hidden" style={{ background: '#0a1628' }}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,243,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.3) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <AnimatePresence mode="wait">
        {/* ===== SLIDE 1: Candidato ===== */}
        {currentSlide === 0 && (
          <motion.div
            key="slide0"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-orange-500/5 blur-[100px]" />

            <div style={{ transform: `scale(${scale}) translate(${tx}px, ${ty}px)`, transition: 'transform 0.1s ease-out' }}>
              <img
                src="/landing-candidato.png"
                alt="Ivan Cepeda"
                className="h-[85vh] w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 40px rgba(0, 243, 255, 0.2)) drop-shadow(0 0 80px rgba(0, 243, 255, 0.1))' }}
              />
            </div>

            {/* Scroll indicator */}
            <motion.button
              onClick={goNext}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-[10px] uppercase tracking-widest">Desplaza hacia abajo</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* ===== SLIDE 2: Presentación ===== */}
        {currentSlide === 1 && (
          <motion.div
            key="slide1"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]" />

            <motion.div
              className="max-w-3xl text-center space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Megaphone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] text-cyan-400 uppercase tracking-[0.2em]">Herramienta de Campaña</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                SUBA PUEDE VOLVER A <span className="text-cyan-400">SER DEL CAMBIO</span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                Esta plataforma es una <span className="text-cyan-400 font-semibold">herramienta de inteligencia territorial</span> para los equipos de campaña.
                Identifica donde están los votos que se perdieron, entiende quiénes son esos votantes, y planifica acciones concretas para recuperarlos.
              </p>

              <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-5 max-w-xl mx-auto">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-orange-400 font-semibold">Zonas Demarcadas:</span> Barrios de Suba donde el cambio es posible. Familias de estratos 2-4,
                  clase media trabajadora que quiere <span className="text-orange-400">tranquilidad y estabilidad</span>. Están abiertos a escuchar si se les habla con respeto y propuestas concretas.
                </p>
              </div>
            </motion.div>

            {/* Navegación */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button onClick={goPrev} className="text-slate-500 hover:text-cyan-400 transition-colors">
                <ChevronUp className="w-5 h-5" />
              </button>
              <button onClick={goNext} className="text-slate-500 hover:text-cyan-400 transition-colors">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ===== SLIDE 3: Funcionalidades ===== */}
        {currentSlide === 2 && (
          <motion.div
            key="slide2"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div className="max-w-5xl w-full space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">QUE PUEDES HACER</h2>
                <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Seis herramientas para la campaña territorial</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FEATURES.map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <feat.icon className={`w-6 h-6 ${feat.color} mb-2`} />
                    <h4 className="text-slate-200 font-semibold text-xs mb-1">{feat.title}</h4>
                    <p className="text-slate-500 text-[10px] leading-relaxed">{feat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button onClick={goPrev} className="text-slate-500 hover:text-cyan-400"><ChevronUp className="w-5 h-5" /></button>
              <button onClick={goNext} className="text-slate-500 hover:text-cyan-400"><ChevronDown className="w-5 h-5" /></button>
            </div>
          </motion.div>
        )}

        {/* ===== SLIDE 4: Cómo funciona + CTA ===== */}
        {currentSlide === 3 && (
          <motion.div
            key="slide3"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div className="max-w-2xl w-full space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">COMO FUNCIONA</h2>
                <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Cinco pasos para empezar</p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Compass, text: 'Explora el mapa interactivo con las zonas demarcadas de Suba' },
                  { icon: Target, text: 'Accede al "Analisis de Campana" para ver perfiles de votante y ejes de mensaje' },
                  { icon: FileText, text: 'Consulta el "Centro de Recursos" para descargar piezas graficas y el analisis estrategico' },
                  { icon: Handshake, text: 'Cada pin puede tener galeria de imagenes, videos y notas especificas para esa ubicacion' },
                  { icon: Zap, text: 'Planifica rutas de alto transito y acciones de campana por zona' },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 rounded-lg p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * i }}
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] flex items-center justify-center flex-shrink-0 font-mono">{i + 1}</span>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div className="text-center pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <button
                  onClick={onEnter}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                >
                  <MapPin className="w-5 h-5" />
                  INGRESAR AL MAPA
                </button>
                <p className="text-slate-600 text-[10px] mt-4 uppercase tracking-widest">Localidad de Suba, Bogota — Campana 2026</p>
              </motion.div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <button onClick={goPrev} className="text-slate-500 hover:text-cyan-400 transition-colors">
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicadores de slide */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSlide ? 'bg-cyan-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-10 w-12 h-12 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-10 w-12 h-12 border-b-2 border-r-2 border-cyan-500/20 rounded-br-lg pointer-events-none" />
    </div>
  );
}import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Target,
  Users,
  Image,
  Video,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronUp,
  Megaphone,
  Compass,
  Handshake,
  Zap,
} from 'lucide-react';

interface LandingProps {
  onEnter: () => void;
}

const SLIDES = [
  {
    id: 'candidato',
    bg: '#0a1628',
  },
  {
    id: 'presentacion',
    bg: '#0a1628',
  },
  {
    id: 'funcionalidades',
    bg: '#0a1628',
  },
  {
    id: 'como-funciona',
    bg: '#0a1628',
  },
];

const FEATURES = [
  { icon: Target, title: 'Zonas Demarcadas', desc: 'Identifica las zonas estrategicas donde el cambio es posible.', color: 'text-orange-400' },
  { icon: MapPin, title: 'Rutas de Alto Transito', desc: 'Planifica recorridos por horarios de alta afluencia.', color: 'text-cyan-400' },
  { icon: Image, title: 'Piezas Graficas', desc: 'Material visual especifico para cada segmento del territorio.', color: 'text-purple-400' },
  { icon: Video, title: 'Contenido Audiovisual', desc: 'Videos y QR con mensajes de un minuto para cada nicho.', color: 'text-emerald-400' },
  { icon: Users, title: 'Perfiles de Votante', desc: 'Entiende la logica de votacion de cada segmento.', color: 'text-pink-400' },
  { icon: BarChart3, title: 'Analisis Estrategico', desc: 'Ejes de mensaje validados. Lo que se debe decir y como.', color: 'text-amber-400' },
];

export function Landing({ onEnter }: LandingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Parallax en slide 1 (candidato)
  useEffect(() => {
    if (currentSlide !== 0) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    const el = containerRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, [currentSlide]);

  // Scroll wheel → cambiar diapositiva
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;
      if (e.deltaY > 30 && currentSlide < SLIDES.length - 1) {
        setCurrentSlide((p) => p + 1);
      } else if (e.deltaY < -30 && currentSlide > 0) {
        setCurrentSlide((p) => p - 1);
      }
      setTimeout(() => { isScrolling.current = false; }, 600);
    };
    const el = containerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, [currentSlide]);

  // Touch swipe
  useEffect(() => {
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = startY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSlide < SLIDES.length - 1) setCurrentSlide((p) => p + 1);
        else if (deltaY < 0 && currentSlide > 0) setCurrentSlide((p) => p - 1);
      }
    };
    const el = containerRef.current;
    if (el) { el.addEventListener('touchstart', handleTouchStart); el.addEventListener('touchend', handleTouchEnd); }
    return () => { if (el) { el.removeEventListener('touchstart', handleTouchStart); el.removeEventListener('touchend', handleTouchEnd); } }
  }, [currentSlide]);

  const scale = 1 + Math.abs(mousePos.x) * 0.15 + Math.abs(mousePos.y) * 0.15;
  const tx = mousePos.x * -30;
  const ty = mousePos.y * -30;

  const goNext = () => { if (currentSlide < SLIDES.length - 1) setCurrentSlide((p) => p + 1); };
  const goPrev = () => { if (currentSlide > 0) setCurrentSlide((p) => p - 1); };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[3000] overflow-hidden" style={{ background: '#0a1628' }}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,243,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.3) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <AnimatePresence mode="wait">
        {/* ===== SLIDE 1: Candidato ===== */}
        {currentSlide === 0 && (
          <motion.div
            key="slide0"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-orange-500/5 blur-[100px]" />

            <div style={{ transform: `scale(${scale}) translate(${tx}px, ${ty}px)`, transition: 'transform 0.1s ease-out' }}>
              <img
                src="/landing-candidato.png"
                alt="Ivan Cepeda"
                className="h-[85vh] w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 40px rgba(0, 243, 255, 0.2)) drop-shadow(0 0 80px rgba(0, 243, 255, 0.1))' }}
              />
            </div>

            {/* Scroll indicator */}
            <motion.button
              onClick={goNext}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-[10px] uppercase tracking-widest">Desplaza hacia abajo</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* ===== SLIDE 2: Presentación ===== */}
        {currentSlide === 1 && (
          <motion.div
            key="slide1"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]" />

            <motion.div
              className="max-w-3xl text-center space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Megaphone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] text-cyan-400 uppercase tracking-[0.2em]">Herramienta de Campaña</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                SUBA PUEDE VOLVER A <span className="text-cyan-400">SER DEL CAMBIO</span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                Esta plataforma es una <span className="text-cyan-400 font-semibold">herramienta de inteligencia territorial</span> para los equipos de campaña.
                Identifica donde están los votos que se perdieron, entiende quiénes son esos votantes, y planifica acciones concretas para recuperarlos.
              </p>

              <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-5 max-w-xl mx-auto">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-orange-400 font-semibold">Zonas Demarcadas:</span> Barrios de Suba donde el cambio es posible. Familias de estratos 2-4,
                  clase media trabajadora que quiere <span className="text-orange-400">tranquilidad y estabilidad</span>. Están abiertos a escuchar si se les habla con respeto y propuestas concretas.
                </p>
              </div>
            </motion.div>

            {/* Navegación */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button onClick={goPrev} className="text-slate-500 hover:text-cyan-400 transition-colors">
                <ChevronUp className="w-5 h-5" />
              </button>
              <button onClick={goNext} className="text-slate-500 hover:text-cyan-400 transition-colors">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ===== SLIDE 3: Funcionalidades ===== */}
        {currentSlide === 2 && (
          <motion.div
            key="slide2"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div className="max-w-5xl w-full space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">QUE PUEDES HACER</h2>
                <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Seis herramientas para la campaña territorial</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FEATURES.map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <feat.icon className={`w-6 h-6 ${feat.color} mb-2`} />
                    <h4 className="text-slate-200 font-semibold text-xs mb-1">{feat.title}</h4>
                    <p className="text-slate-500 text-[10px] leading-relaxed">{feat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button onClick={goPrev} className="text-slate-500 hover:text-cyan-400"><ChevronUp className="w-5 h-5" /></button>
              <button onClick={goNext} className="text-slate-500 hover:text-cyan-400"><ChevronDown className="w-5 h-5" /></button>
            </div>
          </motion.div>
        )}

        {/* ===== SLIDE 4: Cómo funciona + CTA ===== */}
        {currentSlide === 3 && (
          <motion.div
            key="slide3"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div className="max-w-2xl w-full space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">COMO FUNCIONA</h2>
                <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Cinco pasos para empezar</p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Compass, text: 'Explora el mapa interactivo con las zonas demarcadas de Suba' },
                  { icon: Target, text: 'Accede al "Analisis de Campana" para ver perfiles de votante y ejes de mensaje' },
                  { icon: FileText, text: 'Consulta el "Centro de Recursos" para descargar piezas graficas y el analisis estrategico' },
                  { icon: Handshake, text: 'Cada pin puede tener galeria de imagenes, videos y notas especificas para esa ubicacion' },
                  { icon: Zap, text: 'Planifica rutas de alto transito y acciones de campana por zona' },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 rounded-lg p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * i }}
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] flex items-center justify-center flex-shrink-0 font-mono">{i + 1}</span>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div className="text-center pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <button
                  onClick={onEnter}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                >
                  <MapPin className="w-5 h-5" />
                  INGRESAR AL MAPA
                </button>
                <p className="text-slate-600 text-[10px] mt-4 uppercase tracking-widest">Localidad de Suba, Bogota — Campana 2026</p>
              </motion.div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <button onClick={goPrev} className="text-slate-500 hover:text-cyan-400 transition-colors">
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicadores de slide */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSlide ? 'bg-cyan-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-10 w-12 h-12 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-10 w-12 h-12 border-b-2 border-r-2 border-cyan-500/20 rounded-br-lg pointer-events-none" />
    </div>
  );
}
