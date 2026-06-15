import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Check, Copy, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportarPromptProps {
  cambiosPendientes: number;
  onDescartar: () => void;
}

export function ExportarPrompt({ cambiosPendientes, onDescartar }: ExportarPromptProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  if (cambiosPendientes === 0) return null;

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-[5000] bg-slate-950/95 backdrop-blur-md border-t border-cyan-500/30 px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <FileCode className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-cyan-400">
                {cambiosPendientes} cambio{cambiosPendientes > 1 ? 's' : ''} sin exportar a produccion
              </p>
              <p className="text-[10px] text-slate-500">
                Los usuarios no ven estos cambios hasta que exportes y hagas push a GitHub
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              onClick={() => setShowModal(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Exportar ahora
            </Button>
            <button
              onClick={onDescartar}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
