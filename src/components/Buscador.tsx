import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Search, MapPin, Building2, LocateFixed, Navigation, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { todosLosDatosBusqueda } from '@/data/datos-busqueda';

interface BuscadorProps {
  onSeleccionar: (coordenadas: [number, number], zoom?: number) => void;
}

// Normalize text: lowercase, remove accents
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function Buscador({ onSeleccionar }: BuscadorProps) {
  const [query, setQuery] = useState('');
  const [abierto, setAbierto] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setAbierto(false);
        setSelectedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter results with normalization
  const resultados = useMemo(() => {
    if (!query.trim()) return [];
    const q = normalize(query);
    if (q.length < 2) {
      // For 1-2 chars, only match start of words
      return todosLosDatosBusqueda
        .filter((item) => normalize(item.nombre).startsWith(q))
        .slice(0, 8);
    }
    return todosLosDatosBusqueda
      .filter((item) => normalize(item.nombre).includes(q))
      .slice(0, 10);
  }, [query]);

  const handleSelect = useCallback(
    (index: number) => {
      if (index < 0 || index >= resultados.length) return;
      const resultado = resultados[index];
      onSeleccionar(resultado.coordenadas, resultado.tipo === 'upz' ? 14 : 15);
      setQuery(resultado.nombre);
      setAbierto(false);
      setSelectedIndex(-1);
    },
    [resultados, onSeleccionar]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setAbierto(true);
          setSelectedIndex((prev) =>
            prev < resultados.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && resultados.length > 0) {
            handleSelect(selectedIndex);
          } else if (resultados.length > 0) {
            handleSelect(0);
          }
          break;
        case 'Escape':
          setAbierto(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [resultados, selectedIndex, handleSelect]
  );

  const getIcono = (tipo: string) => {
    switch (tipo) {
      case 'upz':
        return <LocateFixed className="w-4 h-4 text-cyan-400" />;
      case 'barrio':
        return <Building2 className="w-4 h-4 text-emerald-400" />;
      case 'direccion':
        return <Home className="w-4 h-4 text-amber-400" />;
      default:
        return <MapPin className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLabel = (tipo: string) => {
    switch (tipo) {
      case 'upz':
        return 'UPZ';
      case 'barrio':
        return 'Barrio';
      case 'direccion':
        return 'Direccion';
      default:
        return 'Ubicacion';
    }
  };

  const getColor = (tipo: string) => {
    switch (tipo) {
      case 'upz':
        return 'text-cyan-400';
      case 'barrio':
        return 'text-emerald-400';
      case 'direccion':
        return 'text-amber-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length >= 1) {
              setAbierto(true);
            }
            setSelectedIndex(-1);
          }}
          onFocus={() => query.length >= 1 && resultados.length > 0 && setAbierto(true)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar UPZ, barrio o direccion..."
          className="w-full pl-10 pr-10 py-3 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-lg"
        />
        {/* Clear button */}
        {query.length > 0 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {resultados.length > 0 && (
              <button
                onClick={() => handleSelect(0)}
                className="p-1 rounded hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                title="Ir al primer resultado"
              >
                <Navigation className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                setQuery('');
                setAbierto(false);
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-200 p-1"
            >
              <span className="text-xs">✕</span>
            </button>
          </div>
        )}
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {abierto && resultados.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-2xl overflow-hidden z-[2000]"
          >
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              {resultados.map((resultado, index) => (
                <button
                  key={`${resultado.tipo}-${resultado.nombre}-${index}`}
                  onClick={() => handleSelect(index)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left border-b border-slate-800/50 last:border-0 ${
                    index === selectedIndex
                      ? 'bg-cyan-500/15 border-l-2 border-l-cyan-400'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center ${getColor(resultado.tipo)}`}>
                    {getIcono(resultado.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      index === selectedIndex ? 'text-cyan-300' : 'text-slate-200'
                    }`}>
                      {resultado.nombre}
                    </p>
                    <p className="text-xs text-slate-500">
                      {getLabel(resultado.tipo)}
                      {resultado.upz ? ` · ${resultado.upz}` : ''}
                    </p>
                  </div>
                  <MapPin className="w-3 h-3 text-slate-600 flex-shrink-0" />
                </button>
              ))}
            </div>
            {/* Keyboard hint footer */}
            <div className="px-4 py-2 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-600">
              <span>↑↓ Navegar · Enter Seleccionar · Esc Cerrar</span>
              <span>{resultados.length} resultados</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results message */}
      <AnimatePresence>
        {abierto && query.length >= 2 && resultados.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-4 text-center z-[2000]"
          >
            <MapPin className="w-6 h-6 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No se encontraron resultados</p>
            <p className="text-xs text-slate-600 mt-1">
              Intenta con: Suba Centro, Niza, Tibabuyes, Av. Suba, Calle 127...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
