import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Bold,
  Italic,
  Underline,
  Type,
  Save,
  Clock,
  FileText,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BloqueNota } from '@/types';

interface BlocNotasProps {
  bloque: BloqueNota | null;
  onClose: () => void;
  onSave?: (id: string, titulo: string, contenido: string) => void;
}

const FONT_SIZES = [
  { label: 'Pequeño', value: '14px' },
  { label: 'Normal', value: '16px' },
  { label: 'Mediano', value: '18px' },
  { label: 'Grande', value: '20px' },
  { label: 'Muy Grande', value: '24px' },
  { label: 'Título', value: '28px' },
];

export function BlocNotas({ bloque, onClose, onSave }: BlocNotasProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [titulo, setTitulo] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);

  useEffect(() => {
    if (bloque) {
      setTitulo(bloque.nota.titulo);
      setHasChanges(false);
      // Set content after a brief delay to ensure editor is ready
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = bloque.nota.contenido;
        }
      }, 50);
    }
  }, [bloque]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    if (bloque) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [bloque, onClose, titulo]);

  const execCommand = useCallback((command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
    setHasChanges(true);
  }, []);

  const handleFontSize = useCallback((size: string) => {
    execCommand('fontSize', '7');
    // After execCommand, wrap the selected text in a span with the actual size
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const fragment = range.extractContents();
      const span = document.createElement('span');
      span.style.fontSize = size;
      span.appendChild(fragment);
      range.insertNode(span);
      // Clean up font size attribute added by execCommand
      const fonts = editorRef.current?.querySelectorAll('font[size="7"]');
      fonts?.forEach((f) => {
        const s = document.createElement('span');
        s.style.fontSize = size;
        s.innerHTML = f.innerHTML;
        f.parentNode?.replaceChild(s, f);
      });
    }
    setShowSizeMenu(false);
    setHasChanges(true);
  }, [execCommand]);

  const handleSave = useCallback(() => {
    if (bloque && editorRef.current) {
      const contenido = editorRef.current.innerHTML;
      onSave?.(bloque.id, titulo, contenido);
      setHasChanges(false);
    }
  }, [bloque, titulo, onSave]);

  const handleInput = useCallback(() => {
    setHasChanges(true);
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AnimatePresence>
      {bloque && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000]"
          />

          {/* Notepad Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[2001] flex flex-col"
          >
            {/* Main notepad area */}
            <div
              className="flex-1 rounded-xl overflow-hidden flex flex-col shadow-2xl"
              style={{
                background: '#faf8f4',
                boxShadow: `0 0 0 1px ${bloque.color}20, 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${bloque.color}15`,
              }}
            >
              {/* Top Bar - Color accent */}
              <div
                className="h-1.5 flex-shrink-0"
                style={{ background: bloque.color }}
              />

              {/* Header */}
              <div className="flex-shrink-0 px-4 md:px-8 py-4 border-b border-amber-900/10 flex items-center gap-4 bg-[#faf8f4]">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${bloque.color}15` }}
                >
                  <FileText className="w-5 h-5" style={{ color: bloque.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => { setTitulo(e.target.value); setHasChanges(true); }}
                    className="w-full bg-transparent text-lg font-bold text-slate-800 outline-none placeholder:text-slate-400"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                  />
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>Editado: {formatDate(bloque.nota.ultima_edicion)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {hasChanges && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs text-amber-600 font-medium"
                    >
                      Sin guardar
                    </motion.span>
                  )}
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="gap-1.5 font-medium"
                    style={{
                      background: bloque.color,
                      color: '#fff',
                    }}
                  >
                    <Save className="w-3.5 h-3.5" />
                    Guardar
                  </Button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-200/60 transition-colors text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex-shrink-0 px-4 md:px-8 py-2.5 border-b border-amber-900/10 bg-[#f5f2ec] flex items-center gap-1.5 flex-wrap">
                {/* Bold */}
                <button
                  onClick={() => execCommand('bold')}
                  className="p-2 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900"
                  title="Negrita (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                {/* Italic */}
                <button
                  onClick={() => execCommand('italic')}
                  className="p-2 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900"
                  title="Cursiva (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                {/* Underline */}
                <button
                  onClick={() => execCommand('underline')}
                  className="p-2 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900"
                  title="Subrayado (Ctrl+U)"
                >
                  <Underline className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                {/* Font Size */}
                <div className="relative">
                  <button
                    onClick={() => setShowSizeMenu(!showSizeMenu)}
                    className="p-2 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    title="Tamaño de fuente"
                  >
                    <Type className="w-4 h-4" />
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {showSizeMenu && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowSizeMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-20 min-w-[140px]"
                        >
                          {FONT_SIZES.map((size) => (
                            <button
                              key={size.value}
                              onClick={() => handleFontSize(size.value)}
                              className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
                            >
                              <span style={{ fontSize: size.value, fontFamily: "'Georgia', serif" }}>
                                Aa
                              </span>
                              <span className="text-xs text-slate-500">{size.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                {/* Heading shortcuts */}
                <button
                  onClick={() => execCommand('formatBlock', 'H2')}
                  className="px-2 py-1.5 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900 text-xs font-bold"
                  title="Título grande"
                >
                  H1
                </button>
                <button
                  onClick={() => execCommand('formatBlock', 'H3')}
                  className="px-2 py-1.5 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900 text-xs font-bold"
                  title="Subtítulo"
                >
                  H2
                </button>
                <button
                  onClick={() => execCommand('formatBlock', 'P')}
                  className="px-2 py-1.5 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900 text-xs"
                  title="Párrafo"
                >
                  P
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                {/* Lists */}
                <button
                  onClick={() => execCommand('insertUnorderedList')}
                  className="p-2 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900"
                  title="Lista con viñetas"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
                <button
                  onClick={() => execCommand('insertOrderedList')}
                  className="p-2 rounded-md hover:bg-slate-300/50 transition-colors text-slate-600 hover:text-slate-900"
                  title="Lista numerada"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="10" y1="6" x2="21" y2="6" />
                    <line x1="10" y1="12" x2="21" y2="12" />
                    <line x1="10" y1="18" x2="21" y2="18" />
                    <path d="M4 6h1v4" />
                    <path d="M4 10h2" />
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                  </svg>
                </button>
              </div>

              {/* Editor - Page Style */}
              <div className="flex-1 overflow-y-auto bg-[#e8e4dc] p-4 md:p-8">
                <div
                  className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm min-h-[600px] p-8 md:p-12"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="outline-none min-h-[500px] prose prose-slate max-w-none"
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', 'Cambria', serif",
                      fontSize: '16px',
                      lineHeight: '1.75',
                      color: '#2d2d2d',
                    }}
                    suppressContentEditableWarning
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
