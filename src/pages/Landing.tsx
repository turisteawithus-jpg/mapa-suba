import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
interface LandingProps {
  onEnter: () => void;
}

export function Landing({ onEnter }: LandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

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

  const handleClick = useCallback(() => {
    setClicked(true);
    setTimeout(() => onEnter(), 1200);
  }, [onEnter]);

  const scale = 1 + Math.abs(mousePos.x) * 0.15 + Math.abs(mousePos.y) * 0.15;
  const translateX = mousePos.x * -30;
  const translateY = mousePos.y * -30;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[3000] bg-[#0a1628] overflow-hidden cursor-pointer select-none"
      onClick={handleClick}
      animate={clicked ? { opacity: 0, scale: 1.1 } : {}}
      transition={clicked ? { duration: 1.2, ease: 'easeInOut' } : {}}
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
          ref={imgRef}
          src="/landing-candidato.png"
          alt="Ivan Cepeda"
          className="h-[85vh] w-auto object-contain drop-shadow-[0_0_60px_rgba(0,243,255,0.15)]"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(0, 243, 255, 0.2)) drop-shadow(0 0 80px rgba(0, 243, 255, 0.1))',
          }}
        />
      </motion.div>

      {/* Top text */}
      <motion.div
        className="absolute top-12 left-0 right-0 text-center z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-wider uppercase">
          Bienvenido
        </h1>
        <p className="text-cyan-400 text-sm md:text-base tracking-[0.3em] uppercase mt-2 font-light">
          al mapa interactivo
        </p>
      </motion.div>

      {/* Bottom text */}
      <motion.div
        className="absolute bottom-16 left-0 right-0 text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="inline-block bg-orange-500/90 px-6 py-3 rounded-xl shadow-lg shadow-orange-500/20">
          <p className="text-white text-lg md:text-2xl font-bold tracking-wide">
            ¿QUIERES APORTAR AL CAMBIO?
          </p>
        </div>
        <motion.p
          className="text-cyan-400/60 text-xs mt-4 tracking-widest uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Haz clic para comenzar
        </motion.p>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-500/20 rounded-br-lg" />
    </motion.div>
  );
}
