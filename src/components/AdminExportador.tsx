import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Check, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function generatePinesCode(): string {
  try {
    const saved = localStorage.getItem('suba_pines');
    if (!saved) return '// No hay pines guardados en localStorage';
    const pines = JSON.parse(saved);
    if (!Array.isArray(pines) || pines.length === 0) return '// No hay pines guardados';

    const cleanPines = pines.map((p: Record<string, unknown>) => ({
      id: p.id,
      titulo: p.titulo,
      descripcion: p.descripcion,
      latitud: p.latitud,
      longitud: p.longitud,
      upz: p.upz,
      barrio: p.barrio,
      direccion_referencia: p.direccion_referencia,
      imagen_url: p.imagen_url,
      imagen_descarga_url: p.imagen_descarga_url,
      video_url: p.video_url,
      notas: p.notas || [],
      galeria_imagenes: p.galeria_imagenes || [],
      galeria_videos: p.galeria_videos || [],
      tamano: p.tamano || 28,
      creado_at: p.creado_at,
    }));

    return `import type { Pin } from '@/types';

export const pinesDemo: Pin[] = ${JSON.stringify(cleanPines, null, 2)};
`;
  } catch {
    return '// Error al leer pines de localStorage';
  }
}

function generateLineasCode(): string {
  try {
    const savedLineas = localStorage.getItem('suba_lineas');
    const savedPuntos = localStorage.getItem('suba_puntos_linea');
    if (!savedLineas) return '// No hay lineas guardadas en localStorage';
    const lineas = JSON.parse(savedLineas);
    const puntos = savedPuntos ? JSON.parse(savedPuntos) : [];
    if (!Array.isArray(lineas) || lineas.length === 0) return '// No hay lineas guardadas';

    const cleanLineas = lineas.map((l: Record<string, unknown>) => ({
      id: l.id,
      nombre: l.nombre,
      descripcion: l.descripcion,
      color: l.color,
      grosor: l.grosor,
      coordenadas: l.coordenadas,
      snapToRoad: l.snapToRoad,
      cerrada: l.cerrada || false,
      filtrar: l.filtrar || false,
      creado_at: l.creado_at,
    }));

    const cleanPuntos = Array.isArray(puntos) ? puntos.map((p: Record<string, unknown>) => ({
      id: p.id,
      linea_id: p.linea_id,
      latitud: p.latitud,
      longitud: p.longitud,
      nombre: p.nombre,
      descripcion: p.descripcion,
      orden: p.orden,
      imagen_url: p.imagen_url || '',
      video_url: p.video_url || '',
      creado_at: p.creado_at,
    })) : [];

    return `import type { Linea, PuntoLinea } from '@/types';

export const lineasDemo: Linea[] = ${JSON.stringify(cleanLineas, null, 2)};

export const puntosLineaDemo: PuntoLinea[] = ${JSON.stringify(cleanPuntos, null, 2)};
`;
  } catch {
    return '// Error al leer lineas de localStorage';
  }
}

function generateLabelsCode(): string {
  try {
    const saved = localStorage.getItem('suba_texto_labels');
    if (!saved) return '// No hay text labels guardados';
    const labels = JSON.parse(saved);
    if (!Array.isArray(labels) || labels.length === 0) return '// No hay text labels guardados';

    return `import type { TextoLabel } from '@/types';

export const textLabelsDemo: TextoLabel[] = ${JSON.stringify(labels, null, 2)};
`;
  } catch {
    return '// Error al leer text labels';
  }
}

export function AdminExportador() {
  const [tab, setTab] = useState<'pines' | 'lineas' | 'labels'>('pines');
  const [copied, setCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const getCode = useCallback(() => {
    switch (tab) {
      case 'pines': return generatePinesCode();
      case 'lineas': return generateLineasCode();
      case 'labels': return generateLabelsCode();
    }
  }, [tab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const code = getCode();
    const filename = tab === 'pines' ? 'pines-demo.ts' : tab === 'lineas' ? 'lineas-demo.ts' : 'text-labels-demo.ts';
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    localStorage.removeItem('suba_pines');
    localStorage.removeItem('suba_lineas');
    localStorage.removeItem('suba_puntos_linea');
    localStorage.removeItem('suba_texto_labels');
    localStorage.removeItem('suba_notas');
    setShowResetConfirm(false);
    window.location.reload();
  };

  const pinesCount = (() => { try { const s = localStorage.getItem('suba_pines'); return s ? JSON.parse(s).length : 0; } catch { return 0; } })();
  const lineasCount = (() => { try { const s = localStorage.getItem('suba_lineas'); return s ? JSON.parse(s).length : 0; } catch { return 0; } })();
  const labelsCount = (() => { try { const s = localStorage.getItem('suba_texto_labels'); return s ? JSON.parse(s).length : 0; } catch { return 0; } })();

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4">
        <h2 className="text-lg font-bold text-cyan-400 mb-2 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar Datos para Produccion
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Los datos que creas en el admin se guardan solo en tu navegador (localStorage). 
          Para que los usuarios los vean, debes exportar estos datos y reemplazar los archivos demo en el codigo fuente.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => setTab('pines')} className={`p-3 rounded-lg border text-left transition-all ${tab === 'pines' ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-slate-700 bg-slate-900/30'}`}>
          <p className="text-2xl font-bold text-cyan-400">{pinesCount}</p>
          <p className="text-[10px] text-slate-500">Pines guardados</p>
        </button>
        <button onClick={() => setTab('lineas')} className={`p-3 rounded-lg border text-left transition-all ${tab === 'lineas' ? 'border-orange-500/30 bg-orange-500/10' : 'border-slate-700 bg-slate-900/30'}`}>
          <p className="text-2xl font-bold text-orange-400">{lineasCount}</p>
          <p className="text-[10px] text-slate-500">Lineas guardadas</p>
        </button>
        <button onClick={() => setTab('labels')} className={`p-3 rounded-lg border text-left transition-all ${tab === 'labels' ? 'border-purple-500/30 bg-purple-500/10' : 'border-slate-700 bg-slate-900/30'}`}>
          <p className="text-2xl font-bold text-purple-400">{labelsCount}</p>
          <p className="text-[10px] text-slate-500">Textos guardados</p>
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 space-y-2">
        <h3 className="text-xs font-bold text-amber-400">Como usar los datos en produccion:</h3>
        <ol className="text-[11px] text-slate-400 space-y-1 list-decimal list-inside">
          <li>Crea/edita tus pines, lineas y textos en el admin</li>
          <li>Ven a esta pestana y copia el codigo generado</li>
          <li>Reemplaza el archivo correspondiente en <code className="text-amber-400">src/data/</code></li>
          <li>Haz commit y push a GitHub → Vercel hace deploy automatico</li>
        </ol>
      </div>

      {/* Code output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">Codigo generado para <span className="text-cyan-400 font-mono">{tab === 'pines' ? 'src/data/pines-demo.ts' : tab === 'lineas' ? 'src/data/lineas-demo.ts' : 'src/data/text-labels-demo.ts'}</span></p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="border-slate-700 text-slate-400 hover:text-cyan-400 text-xs">
              {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="border-slate-700 text-slate-400 hover:text-cyan-400 text-xs">
              <Download className="w-3.5 h-3.5 mr-1" />
              Descargar
            </Button>
          </div>
        </div>
        <textarea
          readOnly
          value={getCode()}
          rows={20}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-400 resize-none focus:outline-none"
        />
      </div>

      {/* Reset */}
      <div className="border-t border-slate-800 pt-4">
        {!showResetConfirm ? (
          <button onClick={() => setShowResetConfirm(true)} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
            <Trash2 className="w-3 h-3" /> Limpiar todos los datos guardados (volver a datos demo)
          </button>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <p className="text-xs text-red-400 flex-1">Esto eliminara TODOS los datos de localStorage y recargara la pagina. ¿Estas seguro?</p>
            <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(false)} className="border-slate-700 text-slate-400 text-xs">Cancelar</Button>
            <Button variant="destructive" size="sm" onClick={handleReset} className="bg-red-600 text-xs">Eliminar todo</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
