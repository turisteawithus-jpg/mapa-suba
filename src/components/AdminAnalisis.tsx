import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  AlertTriangle,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAnalisisCampana } from '@/hooks/useAnalisisCampana';

export function AdminAnalisis() {
  const { data, updateData, updateEje, addEje, removeEje, resetDefaults } = useAnalisisCampana();
  const [section, setSection] = useState<string>('general');
  const [msg, setMsg] = useState<string | null>(null);

  const showMsg = (text: string) => { setMsg(text); setTimeout(() => setMsg(null), 2000); };

  const sections = [
    { key: 'general', label: 'General', color: 'cyan' },
    { key: 'contraste', label: 'Contraste', color: 'purple' },
    { key: 'evaluacion', label: 'Evaluacion', color: 'amber' },
    { key: 'perfil', label: 'Perfil', color: 'orange' },
    { key: 'plan', label: 'Plan Gobierno', color: 'emerald' },
    { key: 'ejes', label: 'Ejes', color: 'pink' },
    { key: 'lineas', label: 'Lineas', color: 'rose' },
    { key: 'comunicacion', label: 'Comunicacion', color: 'yellow' },
    { key: 'canales', label: 'Canales', color: 'blue' },
    { key: 'lenguaje', label: 'Lenguaje', color: 'violet' },
    { key: 'conclusiones', label: 'Conclusiones', color: 'teal' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {msg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
          {msg}
        </motion.div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Analisis de Campana
        </h2>
        <button onClick={() => { resetDefaults(); showMsg('Valores restaurados'); }}
          className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Restaurar defaults
        </button>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 flex-wrap">
        {sections.map((tab) => (
          <button key={tab.key} onClick={() => setSection(tab.key)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              section === tab.key
                ? `border-${tab.color}-500/30 bg-${tab.color}-500/10 text-${tab.color}-400`
                : 'border-slate-700 text-slate-400 hover:border-slate-600'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== GENERAL ===== */}
      {section === 'general' && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Titulo</Label>
            <Input value={data.titulo} onChange={(e) => updateData({ titulo: e.target.value })}
              className="bg-slate-900 border-slate-700 text-slate-200 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Resumen Ejecutivo</Label>
            <Textarea value={data.resumenEjecutivo} onChange={(e) => updateData({ resumenEjecutivo: e.target.value })}
              rows={8} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
          </div>
        </div>
      )}

      {/* ===== CONTRASTE ===== */}
      {section === 'contraste' && (
        <div className="space-y-6">
          <StringArrayEditor label="Cambios Estructurales" items={data.contrasteCambios} color="purple"
            onChange={(v) => updateData({ contrasteCambios: v })} />
          <StringArrayEditor label="Elementos que se mantienen" items={data.contrasteMantiene} color="emerald"
            onChange={(v) => updateData({ contrasteMantiene: v })} />
          <StringArrayEditor label="Elementos nuevos" items={data.contrasteNuevo} color="amber"
            onChange={(v) => updateData({ contrasteNuevo: v })} />
        </div>
      )}

      {/* ===== EVALUACION ===== */}
      {section === 'evaluacion' && (
        <div className="space-y-6">
          <StringArrayEditor label="Lo que sigue siendo valido" items={data.evalValido} color="emerald"
            onChange={(v) => updateData({ evalValido: v })} />
          <StringArrayEditor label="Lo que requiere ajuste" items={data.evalAjuste} color="amber"
            onChange={(v) => updateData({ evalAjuste: v })} />
          <StringArrayEditor label="Lo que ya no aplica" items={data.evalNoAplica} color="red"
            onChange={(v) => updateData({ evalNoAplica: v })} />
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Veredicto</Label>
            <Textarea value={data.evalVeredicto} onChange={(e) => updateData({ evalVeredicto: e.target.value })}
              rows={4} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
          </div>
        </div>
      )}

      {/* ===== PERFIL ===== */}
      {section === 'perfil' && (
        <div className="space-y-6">
          <StringArrayEditor label="Quienes son los votantes" items={data.perfilQuienesSon} color="cyan"
            onChange={(v) => updateData({ perfilQuienesSon: v })} />
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-orange-400">Miedos y dolores</h3>
            {data.perfilMiedos.map((m, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-1.5">
                <div className="flex gap-2">
                  <Input value={m.label} onChange={(e) => {
                    const updated = [...data.perfilMiedos];
                    updated[i] = { ...updated[i], label: e.target.value };
                    updateData({ perfilMiedos: updated });
                  }} placeholder="Label (ej: INSEGURIDAD)" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
                  <button onClick={() => updateData({ perfilMiedos: data.perfilMiedos.filter((_, idx) => idx !== i) })}
                    className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <Textarea value={m.descripcion} onChange={(e) => {
                  const updated = [...data.perfilMiedos];
                  updated[i] = { ...updated[i], descripcion: e.target.value };
                  updateData({ perfilMiedos: updated });
                }} placeholder="Descripcion" rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
              </div>
            ))}
            <button onClick={() => updateData({ perfilMiedos: [...data.perfilMiedos, { label: '', descripcion: '' }] })}
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar dolor</button>
          </div>
          <StringArrayEditor label="Frente a Abelardo" items={data.perfilFrenteAbelardo} color="orange"
            onChange={(v) => updateData({ perfilFrenteAbelardo: v })} />
          <StringArrayEditor label="Frente a la Izquierda" items={data.perfilFrenteIzquierda} color="purple"
            onChange={(v) => updateData({ perfilFrenteIzquierda: v })} />
        </div>
      )}

      {/* ===== PLAN DE GOBIERNO ===== */}
      {section === 'plan' && (
        <div className="space-y-6">
          <StringArrayEditor label="Seguridad Humana" items={data.sintesisSeguridad} color="red"
            onChange={(v) => updateData({ sintesisSeguridad: v })} />
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-emerald-400">Siete Programas</h3>
            {data.sintesisProgramas.map((p, i) => (
              <div key={i} className="flex gap-2">
                <Input value={p.nombre} onChange={(e) => {
                  const updated = [...data.sintesisProgramas];
                  updated[i] = { ...updated[i], nombre: e.target.value };
                  updateData({ sintesisProgramas: updated });
                }} placeholder="Nombre" className="bg-slate-900 border-slate-700 text-slate-200 text-xs flex-1" />
                <Input value={p.descripcion} onChange={(e) => {
                  const updated = [...data.sintesisProgramas];
                  updated[i] = { ...updated[i], descripcion: e.target.value };
                  updateData({ sintesisProgramas: updated });
                }} placeholder="Descripcion" className="bg-slate-900 border-slate-700 text-slate-200 text-xs flex-[2]" />
                <button onClick={() => updateData({ sintesisProgramas: data.sintesisProgramas.filter((_, idx) => idx !== i) })}
                  className="text-red-400 hover:text-red-300 p-1"><X className="w-3.5 h-3.5" /></button>
              </div>
            ))}
            <button onClick={() => updateData({ sintesisProgramas: [...data.sintesisProgramas, { nombre: '', descripcion: '' }] })}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar programa</button>
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Pacto Productivo</Label>
            <Textarea value={data.sintesisPactoProductivo} onChange={(e) => updateData({ sintesisPactoProductivo: e.target.value })}
              rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Pacto Social</Label>
            <Textarea value={data.sintesisPactoSocial} onChange={(e) => updateData({ sintesisPactoSocial: e.target.value })}
              rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Pacto Fiscal</Label>
            <Textarea value={data.sintesisPactoFiscal} onChange={(e) => updateData({ sintesisPactoFiscal: e.target.value })}
              rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
          </div>
          <StringArrayEditor label="Revolucion Etica" items={data.sintesisEtica} color="orange"
            onChange={(v) => updateData({ sintesisEtica: v })} />
          <StringArrayEditor label="Soberania Alimentaria" items={data.sintesisAgraria} color="emerald"
            onChange={(v) => updateData({ sintesisAgraria: v })} />
          <StringArrayEditor label="Acuerdo Digital" items={data.sintesisDigital} color="blue"
            onChange={(v) => updateData({ sintesisDigital: v })} />
        </div>
      )}

      {/* ===== EJES ===== */}
      {section === 'ejes' && (
        <div className="space-y-4">
          {data.ejes.map((eje, i) => (
            <div key={eje.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono">#{i + 1}</span>
                <Input value={eje.titulo} onChange={(e) => updateEje(i, { ...eje, titulo: e.target.value })}
                  placeholder="Titulo" className="bg-slate-900 border-slate-700 text-slate-200 text-xs flex-1 font-bold" />
                <button onClick={() => { removeEje(i); showMsg('Eje eliminado'); }}
                  className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <Input value={eje.subtitulo} onChange={(e) => updateEje(i, { ...eje, subtitulo: e.target.value })}
                placeholder="Subtitulo" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
              <Textarea value={eje.porQueResuena} onChange={(e) => updateEje(i, { ...eje, porQueResuena: e.target.value })}
                placeholder="Por que resuena" rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
              <Textarea value={eje.mensajeCentral} onChange={(e) => updateEje(i, { ...eje, mensajeCentral: e.target.value })}
                placeholder="Mensaje central" rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none italic" />
              <div className="space-y-1">
                {eje.propuestas.map((p, j) => (
                  <div key={j} className="flex gap-2">
                    <Input value={p} onChange={(e) => {
                      const updated = [...eje.propuestas];
                      updated[j] = e.target.value;
                      updateEje(i, { ...eje, propuestas: updated });
                    }} placeholder={`Propuesta ${j + 1}`} className="bg-slate-900 border-slate-700 text-slate-200 text-xs flex-1" />
                    <button onClick={() => updateEje(i, { ...eje, propuestas: eje.propuestas.filter((_, idx) => idx !== j) })}
                      className="text-red-400 hover:text-red-300 p-1"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                <button onClick={() => updateEje(i, { ...eje, propuestas: [...eje.propuestas, ''] })}
                  className="text-[10px] text-slate-500 hover:text-pink-400 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar propuesta</button>
              </div>
            </div>
          ))}
          <button onClick={() => { addEje(); showMsg('Eje agregado'); }}
            className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar eje</button>
        </div>
      )}

      {/* ===== LINEAS ===== */}
      {section === 'lineas' && (
        <div className="space-y-4">
          {data.lineasMensaje.map((lm, i) => (
            <div key={lm.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <Input value={lm.tematica} onChange={(e) => {
                  const updated = [...data.lineasMensaje];
                  updated[i] = { ...updated[i], tematica: e.target.value };
                  updateData({ lineasMensaje: updated });
                }} placeholder="Tematica" className="bg-slate-900 border-slate-700 text-slate-200 text-xs flex-1" />
                <button onClick={() => updateData({ lineasMensaje: data.lineasMensaje.filter((_, idx) => idx !== i) })}
                  className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              {lm.frases.map((f, j) => (
                <div key={j} className="flex gap-2">
                  <Textarea value={f} onChange={(e) => {
                    const updated = [...data.lineasMensaje];
                    updated[i].frases[j] = e.target.value;
                    updateData({ lineasMensaje: updated });
                  }} placeholder={`Frase ${j + 1}`} rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none flex-1" />
                  <button onClick={() => {
                    const updated = [...data.lineasMensaje];
                    updated[i].frases = updated[i].frases.filter((_, idx) => idx !== j);
                    updateData({ lineasMensaje: updated });
                  }} className="text-red-400 hover:text-red-300 p-1"><X className="w-3 h-3" /></button>
                </div>
              ))}
              <button onClick={() => {
                const updated = [...data.lineasMensaje];
                updated[i].frases = [...updated[i].frases, ''];
                updateData({ lineasMensaje: updated });
              }} className="text-[10px] text-slate-500 hover:text-rose-400 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar frase</button>
            </div>
          ))}
          <button onClick={() => updateData({ lineasMensaje: [...data.lineasMensaje, { id: `lm-${Date.now()}`, tematica: '', frases: [] }] })}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar tematica</button>
        </div>
      )}

      {/* ===== COMUNICACION ===== */}
      {section === 'comunicacion' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-amber-400">Lo que NO se debe decir</h3>
            {data.comunicacionEvitar.map((item, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-1.5">
                <div className="flex gap-2">
                  <Input value={item.evitar} onChange={(e) => {
                    const updated = [...data.comunicacionEvitar];
                    updated[i] = { ...updated[i], evitar: e.target.value };
                    updateData({ comunicacionEvitar: updated });
                  }} placeholder="Evitar" className="bg-slate-900 border-red-500/20 text-slate-200 text-xs flex-1" />
                  <button onClick={() => updateData({ comunicacionEvitar: data.comunicacionEvitar.filter((_, idx) => idx !== i) })}
                    className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <Textarea value={item.porQue} onChange={(e) => {
                  const updated = [...data.comunicacionEvitar];
                  updated[i] = { ...updated[i], porQue: e.target.value };
                  updateData({ comunicacionEvitar: updated });
                }} placeholder="Por que no resuena" rows={1} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
                <Input value={item.decir} onChange={(e) => {
                  const updated = [...data.comunicacionEvitar];
                  updated[i] = { ...updated[i], decir: e.target.value };
                  updateData({ comunicacionEvitar: updated });
                }} placeholder="Decir en su lugar" className="bg-slate-900 border-emerald-500/20 text-slate-200 text-xs" />
              </div>
            ))}
            <button onClick={() => updateData({ comunicacionEvitar: [...data.comunicacionEvitar, { evitar: '', porQue: '', decir: '' }] })}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar par</button>
          </div>
          <StringArrayEditor label="Tono y Estilo" items={data.comunicacionTono} color="cyan"
            onChange={(v) => updateData({ comunicacionTono: v })} />
        </div>
      )}

      {/* ===== CANALES ===== */}
      {section === 'canales' && (
        <div className="space-y-4">
          {data.canales.map((canal, i) => (
            <div key={canal.nombre} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Input value={canal.nombre} onChange={(e) => {
                  const updated = [...data.canales];
                  updated[i] = { ...updated[i], nombre: e.target.value };
                  updateData({ canales: updated });
                }} placeholder="Nombre del canal" className="bg-slate-900 border-slate-700 text-slate-200 text-xs font-bold flex-1" />
                <button onClick={() => updateData({ canales: data.canales.filter((_, idx) => idx !== i) })}
                  className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input value={canal.formato} onChange={(e) => {
                  const updated = [...data.canales];
                  updated[i] = { ...updated[i], formato: e.target.value };
                  updateData({ canales: updated });
                }} placeholder="Formato" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
                <Input value={canal.frecuencia} onChange={(e) => {
                  const updated = [...data.canales];
                  updated[i] = { ...updated[i], frecuencia: e.target.value };
                  updateData({ canales: updated });
                }} placeholder="Frecuencia" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
              </div>
              <Input value={canal.contenido} onChange={(e) => {
                const updated = [...data.canales];
                updated[i] = { ...updated[i], contenido: e.target.value };
                updateData({ canales: updated });
              }} placeholder="Contenido" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
              <Input value={canal.tono} onChange={(e) => {
                const updated = [...data.canales];
                updated[i] = { ...updated[i], tono: e.target.value };
                updateData({ canales: updated });
              }} placeholder="Tono" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
            </div>
          ))}
          <button onClick={() => updateData({ canales: [...data.canales, { nombre: '', formato: '', contenido: '', tono: '', frecuencia: '' }] })}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar canal</button>
        </div>
      )}

      {/* ===== LENGUAJE ===== */}
      {section === 'lenguaje' && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Introduccion al Lenguaje</Label>
            <Textarea value={data.lenguajeIntro} onChange={(e) => updateData({ lenguajeIntro: e.target.value })}
              rows={3} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none" />
          </div>
          <StringArrayEditor label="Claves del Lenguaje" items={data.lenguajeClaves} color="purple"
            onChange={(v) => updateData({ lenguajeClaves: v })} textarea />
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-pink-400">Ejemplos Practicos</h3>
            {data.lenguajeEjemplos.map((ej, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-1.5">
                <div className="flex gap-2">
                  <Input value={ej.contexto} onChange={(e) => {
                    const updated = [...data.lenguajeEjemplos];
                    updated[i] = { ...updated[i], contexto: e.target.value };
                    updateData({ lenguajeEjemplos: updated });
                  }} placeholder="Contexto" className="bg-slate-900 border-slate-700 text-slate-200 text-xs flex-1" />
                  <button onClick={() => updateData({ lenguajeEjemplos: data.lenguajeEjemplos.filter((_, idx) => idx !== i) })}
                    className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <Textarea value={ej.frase} onChange={(e) => {
                  const updated = [...data.lenguajeEjemplos];
                  updated[i] = { ...updated[i], frase: e.target.value };
                  updateData({ lenguajeEjemplos: updated });
                }} placeholder="Frase ejemplo" rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none italic" />
              </div>
            ))}
            <button onClick={() => updateData({ lenguajeEjemplos: [...data.lenguajeEjemplos, { contexto: '', frase: '' }] })}
              className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar ejemplo</button>
          </div>
        </div>
      )}

      {/* ===== CONCLUSIONES ===== */}
      {section === 'conclusiones' && (
        <StringArrayEditor label="Conclusiones" items={data.conclusiones} color="teal"
          onChange={(v) => updateData({ conclusiones: v })} textarea />
      )}
    </div>
  );
}

// ========== COMPONENTE REUTILIZABLE: EDITOR DE ARRAY DE STRINGS ==========

function StringArrayEditor({ label, items, color, onChange, textarea }: {
  label: string;
  items: string[];
  color: string;
  onChange: (v: string[]) => void;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-2">
      <h3 className={`text-xs font-semibold text-${color}-400`}>{label}</h3>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          {textarea ? (
            <Textarea value={item} onChange={(e) => {
              const updated = [...items];
              updated[i] = e.target.value;
              onChange(updated);
            }} rows={2} className="bg-slate-900 border-slate-700 text-slate-200 text-xs resize-none flex-1" />
          ) : (
            <Input value={item} onChange={(e) => {
              const updated = [...items];
              updated[i] = e.target.value;
              onChange(updated);
            }} className="bg-slate-900 border-slate-700 text-slate-200 text-xs flex-1" />
          )}
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="text-red-400 hover:text-red-300 p-1"><X className="w-3.5 h-3.5" /></button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])}
        className={`text-xs text-${color}-400 hover:text-${color}-300 flex items-center gap-1`}>
        <Plus className="w-3 h-3" /> Agregar
      </button>
    </div>
  );
}
