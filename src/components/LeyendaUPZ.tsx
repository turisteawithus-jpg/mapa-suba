import { useState } from 'react';
import { ChevronDown, ChevronUp, Layers, MapPin } from 'lucide-react';
import { upzData } from '@/data/upz-data';

interface LeyendaUPZProps {
  onFlyTo: (lat: number, lng: number, zoom?: number) => void;
  // Puntos de referencia editables (del admin)
  centrosUPZ: Record<string, [number, number]>;
}

export function LeyendaUPZ({ onFlyTo, centrosUPZ }: LeyendaUPZProps) {
  const [colapsado, setColapsado] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 rounded-xl overflow-hidden shadow-lg max-w-[230px]">
      <button
        onClick={() => setColapsado(!colapsado)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-900/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">UPZ de Suba</span>
          <span className="text-[10px] text-slate-500 ml-1">({upzData.length})</span>
        </div>
        {colapsado ? (
          <ChevronDown className="w-3 h-3 text-slate-400" />
        ) : (
          <ChevronUp className="w-3 h-3 text-slate-400" />
        )}
      </button>

      {!colapsado && (
        <div className="px-2 pb-2 max-h-72 overflow-y-auto scrollbar-thin">
          {upzData.map((upz) => {
            const centro = centrosUPZ[upz.nombre];
            const hasRef = !!centro;
            return (
              <button
                key={upz.id}
                onClick={() => {
                  if (centro) {
                    onFlyTo(centro[0], centro[1], 14);
                  }
                }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-left group ${
                  hasRef
                    ? 'hover:bg-slate-800/50 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!hasRef}
                title={hasRef ? `Ver ${upz.nombre}` : 'Punto de referencia no definido'}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 border border-white/20 group-hover:scale-125 transition-transform"
                  style={{
                    backgroundColor: upz.colorNeon,
                    boxShadow: `0 0 6px ${upz.colorNeon}60`,
                  }}
                />
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors truncate flex-1">
                  {upz.nombre}
                </span>
                {hasRef && (
                  <MapPin className="w-2.5 h-2.5 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
