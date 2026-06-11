import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';
import type { NotaPin } from '@/types';

// ============================================================
// NOTA PANEL - Botones de notas acumulados (tamaño dinámico)
// ============================================================

interface NotaPanelProps {
  notas: NotaPin[];
  onSelectNota?: (nota: NotaPin) => void;
}

export function NotaPanel({ notas, onSelectNota }: NotaPanelProps) {
  if (notas.length === 0) return null;

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 6px #00f3ff' }} />
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em]">
          Información Adicional
        </h3>
        <div className="flex-1 h-px bg-slate-800" />
      </div>

      {/* Grid de botones - tamaño dinámico según nombre */}
      <div className="flex flex-wrap gap-1.5">
        {notas.map((nota, index) => (
          <motion.button
            key={nota.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.15 }}
            onClick={() => onSelectNota?.(nota)}
            className="group relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 hover:brightness-125"
            style={{
              background: `${nota.color}12`,
              border: `1px solid ${nota.color}35`,
              color: nota.color,
              textShadow: `0 0 8px ${nota.color}40`,
              boxShadow: `0 0 12px ${nota.color}08, inset 0 0 12px ${nota.color}04`,
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            {/* Glow en hover */}
            <div
              className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: `radial-gradient(ellipse at center, ${nota.color}15 0%, transparent 70%)`,
              }}
            />
            <span className="relative z-10 flex items-center gap-1.5">
              <FileText className="w-3 h-3 opacity-60" />
              {nota.nombre}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// NOTA DETALLE - Vista completa cyberpunk translúcida
// Se abre al hacer click en un botón de nota
// ============================================================

interface NotaDetalleProps {
  nota: NotaPin | null;
  onClose: () => void;
}

export function NotaDetalle({ nota, onClose }: NotaDetalleProps) {
  if (!nota) return null;

  return (
    <AnimatePresence>
      {nota && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2500]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[2501] rounded-xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(8, 12, 28, 0.92)',
              backdropFilter: 'blur(24px) saturate(1.2)',
              border: `1px solid ${nota.color}25`,
              boxShadow: `
                0 0 0 1px rgba(0,0,0,0.5),
                0 20px 60px rgba(0,0,0,0.6),
                0 0 80px ${nota.color}10,
                inset 0 1px 0 ${nota.color}10
              `,
            }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 border-b"
              style={{ borderColor: `${nota.color}15` }}
            >
              <div className="flex items-center gap-3">
                {/* Icono */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${nota.color}12`,
                    border: `1px solid ${nota.color}25`,
                  }}
                >
                  <FileText className="w-4 h-4" style={{ color: nota.color }} />
                </div>
                <div>
                  <h2
                    className="text-sm font-bold"
                    style={{
                      color: nota.color,
                      textShadow: `0 0 12px ${nota.color}30`,
                      fontFamily: "'Inter', system-ui, sans-serif",
                      letterSpacing: '0.02em',
                    }}
                  >
                    {nota.nombre}
                  </h2>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Nota informativa
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-800/60 transition-colors text-slate-500 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido - Área grande para mucho texto */}
            <div className="flex-1 overflow-hidden relative">
              {/* Grid lines decorativas sutiles */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(${nota.color}40 1px, transparent 1px),
                    linear-gradient(90deg, ${nota.color}40 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Scrollable content */}
              <div className="absolute inset-0 overflow-y-auto scrollbar-thin p-5 md:p-8">
                {/* Marco decorativo */}
                <div className="relative max-w-3xl mx-auto">
                  {/* Esquinas */}
                  <div className="absolute -top-2 -left-2 w-6 h-6" style={{ borderTop: `1px solid ${nota.color}30`, borderLeft: `1px solid ${nota.color}30` }} />
                  <div className="absolute -top-2 -right-2 w-6 h-6" style={{ borderTop: `1px solid ${nota.color}30`, borderRight: `1px solid ${nota.color}30` }} />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6" style={{ borderBottom: `1px solid ${nota.color}30`, borderLeft: `1px solid ${nota.color}30` }} />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6" style={{ borderBottom: `1px solid ${nota.color}30`, borderRight: `1px solid ${nota.color}30` }} />

                  {/* Contenido HTML */}
                  <div
                    className="nota-detalle-contenido"
                    style={{
                      color: '#b8c4d4',
                      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                      fontSize: '13px',
                      lineHeight: '1.85',
                    }}
                    dangerouslySetInnerHTML={{ __html: nota.contenido }}
                  />
                </div>
              </div>
            </div>

            {/* Footer con línea decorativa */}
            <div
              className="flex-shrink-0 h-8 flex items-center justify-center border-t"
              style={{ borderColor: `${nota.color}10` }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: nota.color }} />
                <span className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">Contenido informativo</span>
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: nota.color }} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// NOTA EDITOR - Para el administrador (sencillo)
// ============================================================

interface NotaEditorProps {
  nota: NotaPin | null;
  onSave: (nombre: string, color: string, contenido: string) => void;
  onClose: () => void;
}

export function NotaEditor({ nota, onSave, onClose }: NotaEditorProps) {
  const [nombre, setNombre] = useState(nota?.nombre || '');
  const [color, setColor] = useState(nota?.color || '#00f3ff');
  const [contenido, setContenido] = useState(nota?.contenido || '');

  const COLORS = [
    '#00f3ff', '#ff6b35', '#a855f7', '#22c55e', '#ef4444',
    '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6', '#f97316',
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-slate-300">
          {nota ? 'Editar Nota' : 'Nueva Nota'}
        </h4>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del botón (aparece en el pin)"
        className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-md text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 outline-none"
      />

      <div className="flex flex-wrap gap-1.5">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`w-5 h-5 rounded-full border-2 transition-all ${
              color === c ? 'border-white scale-110' : 'border-transparent hover:border-white/30'
            }`}
            style={{ background: c }}
          />
        ))}
      </div>

      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Contenido HTML (puede ser extenso: texto, listas, etc.)"
        rows={6}
        className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-md text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 outline-none resize-none font-mono"
      />

      <button
        onClick={() => {
          if (nombre.trim() && contenido.trim()) {
            onSave(nombre, color, contenido);
          }
        }}
        disabled={!nombre.trim() || !contenido.trim()}
        className="w-full px-3 py-1.5 text-xs font-medium rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        {nota ? 'Actualizar Nota' : 'Agregar Nota'}
      </button>
    </div>
  );
}
