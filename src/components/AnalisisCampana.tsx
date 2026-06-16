import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Target,
  Users,
  FileText,
  MessageCircle,
  ChevronRight,
  Lightbulb,
  Quote,
  BookOpen,
  Megaphone,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Radio,
  Shield,
  Wallet,
  Heart,
  TrendingUp as TrendingUpIcon,
  Download,
  Menu,
  Crown,
} from 'lucide-react';
import { useAnalisisCampana } from '@/hooks/useAnalisisCampana';

interface AnalisisCampanaProps {
  open: boolean;
  onClose: () => void;
}

type Section = 'resumen' | 'perfil' | 'sintesis' | 'ejes' | 'lineas' | 'comunicacion' | 'canales' | 'lenguaje' | 'conclusiones';

const SECTIONS: { key: Section; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'resumen', label: 'Resumen y Contexto', icon: BookOpen, color: 'cyan' },
  { key: 'perfil', label: 'Perfil del Electorado', icon: Users, color: 'orange' },
  { key: 'sintesis', label: 'Plan de Gobierno', icon: BarChart3, color: 'emerald' },
  { key: 'ejes', label: '5 Ejes del Mensaje', icon: Target, color: 'purple' },
  { key: 'lineas', label: 'Lineas por Tematica', icon: Megaphone, color: 'pink' },
  { key: 'comunicacion', label: 'Comunicacion', icon: FileText, color: 'amber' },
  { key: 'canales', label: 'Canales Digitales', icon: Radio, color: 'blue' },
  { key: 'lenguaje', label: 'Lenguaje', icon: MessageCircle, color: 'rose' },
  { key: 'conclusiones', label: 'Conclusiones', icon: Lightbulb, color: 'teal' },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; glow: string }> = {
  cyan:    { bg: 'bg-cyan-500/5', border: 'border-cyan-500/15', text: 'text-cyan-400', badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400', glow: 'shadow-cyan-500/10' },
  emerald: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/15', text: 'text-emerald-400', badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', glow: 'shadow-emerald-500/10' },
  orange:  { bg: 'bg-orange-500/5', border: 'border-orange-500/15', text: 'text-orange-400', badge: 'bg-orange-500/10 border-orange-500/20 text-orange-400', glow: 'shadow-orange-500/10' },
  purple:  { bg: 'bg-purple-500/5', border: 'border-purple-500/15', text: 'text-purple-400', badge: 'bg-purple-500/10 border-purple-500/20 text-purple-400', glow: 'shadow-purple-500/10' },
  pink:    { bg: 'bg-pink-500/5', border: 'border-pink-500/15', text: 'text-pink-400', badge: 'bg-pink-500/10 border-pink-500/20 text-pink-400', glow: 'shadow-pink-500/10' },
  amber:   { bg: 'bg-amber-500/5', border: 'border-amber-500/15', text: 'text-amber-400', badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400', glow: 'shadow-amber-500/10' },
  blue:    { bg: 'bg-blue-500/5', border: 'border-blue-500/15', text: 'text-blue-400', badge: 'bg-blue-500/10 border-blue-500/20 text-blue-400', glow: 'shadow-blue-500/10' },
  rose:    { bg: 'bg-rose-500/5', border: 'border-rose-500/15', text: 'text-rose-400', badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400', glow: 'shadow-rose-500/10' },
  teal:    { bg: 'bg-teal-500/5', border: 'border-teal-500/15', text: 'text-teal-400', badge: 'bg-teal-500/10 border-teal-500/20 text-teal-400', glow: 'shadow-teal-500/10' },
};

function getColor(color: string) {
  return COLOR_MAP[color] || COLOR_MAP.cyan;
}

// ========== COMPONENTES DE SECCION ==========

function SectionResumen({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-slate-900/50 to-slate-900 p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <h2 className="text-xl font-bold text-cyan-400 mb-2 tracking-wide">ANALISIS ESTRATEGICO SUBA</h2>
        <p className="text-xs text-cyan-300/60 mb-4">Estrategia territorial + Nuevo Plan de Gobierno 2026-2030</p>
        <p className="text-sm text-slate-300 leading-relaxed">{data.resumenEjecutivo}</p>
      </div>

      {/* 10 Reglas de Oro del Manual de Mensajes */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">10 Reglas de Oro de la Comunicacion</h3>
          <span className="text-[10px] text-slate-500 ml-2">Manual de Mensajes</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {data.reglasDeOro.map((regla) => (
            <div key={regla.numero} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-500/5 to-transparent border border-amber-500/10 hover:border-amber-500/20 transition-all">
              <span className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center flex-shrink-0 font-bold">{regla.numero}</span>
              <div>
                <h4 className="text-xs font-semibold text-amber-300 mb-0.5">{regla.titulo}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{regla.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluacion */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">
        <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-cyan-400" /> EVALUACION DEL ANALISIS ACTUAL</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
            <p className="text-[10px] font-bold text-emerald-400 mb-2">VALIDO (80%)</p>
            {data.evalValido.map((v, i) => (<p key={i} className="text-[10px] text-slate-500 mb-1">{v}</p>))}
          </div>
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
            <p className="text-[10px] font-bold text-amber-400 mb-2">REQUIERE AJUSTE</p>
            {data.evalAjuste.map((v, i) => (<p key={i} className="text-[10px] text-slate-500 mb-1">{v}</p>))}
          </div>
          <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/15">
            <p className="text-[10px] font-bold text-red-400 mb-2">YA NO APLICA</p>
            {data.evalNoAplica.map((v, i) => (<p key={i} className="text-[10px] text-slate-500 mb-1">{v}</p>))}
          </div>
          <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/15">
            <p className="text-[10px] font-bold text-cyan-400 mb-2">VEREDICTO</p>
            <p className="text-[11px] text-slate-300 leading-relaxed">{data.evalVeredicto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionPerfil({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  const [tab, setTab] = useState<'quienes' | 'miedos' | 'abelardo' | 'izquierda'>('quienes');
  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'quienes' as const, label: 'Quienes Son', color: 'cyan' },
          { key: 'miedos' as const, label: 'Sus Miedos', color: 'red' },
          { key: 'abelardo' as const, label: 'Frente a Abelardo', color: 'orange' },
          { key: 'izquierda' as const, label: 'Frente a la Izquierda', color: 'purple' },
        ].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${tab === t.key ? `border-${t.color}-500/30 bg-${t.color}-500/10 text-${t.color}-400` : 'border-slate-700 text-slate-500 hover:border-slate-600'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'quienes' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-3">
          {data.perfilQuienesSon.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/15">
              <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{item}</p>
            </div>
          ))}
        </motion.div>
      )}

      {tab === 'miedos' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-3">
          {data.perfilMiedos.map((m, i) => (
            <div key={i} className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h4 className="text-xs font-bold text-red-400">{m.label}</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{m.descripcion}</p>
            </div>
          ))}
        </motion.div>
      )}

      {tab === 'abelardo' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
            <h4 className="text-xs font-bold text-orange-400 mb-3 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Lo positivo que ven</h4>
            {data.perfilFrenteAbelardo.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-start gap-2 mb-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" /><p className="text-[11px] text-slate-400">{f}</p></div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
            <h4 className="text-xs font-bold text-red-400 mb-3 flex items-center gap-2"><XCircle className="w-3.5 h-3.5" /> Sus dudas</h4>
            {data.perfilFrenteAbelardo.slice(3).map((f, i) => (
              <div key={i} className="flex items-start gap-2 mb-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" /><p className="text-[11px] text-slate-400">{f}</p></div>
            ))}
          </div>
        </motion.div>
      )}

      {tab === 'izquierda' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15 space-y-2">
          {data.perfilFrenteIzquierda.map((f, i) => (
            <div key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" /><p className="text-[11px] text-slate-400">{f}</p></div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function SectionSintesis({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  return (
    <div className="space-y-5">
      {/* 7 Programas */}
      <div>
        <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2"><Wallet className="w-4 h-4" /> SIETE PROGRAMAS DE BIENESTAR</h3>
        <div className="grid grid-cols-1 gap-2">
          {data.sintesisProgramas.map((p, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
              <div>
                <p className="text-xs font-semibold text-emerald-300">{p.nombre}</p>
                <p className="text-[11px] text-slate-400">{p.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tres Pactos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
          <h4 className="text-xs font-bold text-cyan-400 mb-2">PACTO PRODUCTIVO</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">{data.sintesisPactoProductivo}</p>
        </div>
        <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15">
          <h4 className="text-xs font-bold text-purple-400 mb-2">PACTO SOCIAL</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">{data.sintesisPactoSocial}</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
          <h4 className="text-xs font-bold text-amber-400 mb-2">PACTO FISCAL</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">{data.sintesisPactoFiscal}</p>
        </div>
      </div>

      {/* Seguridad + Etica + Agraria + Digital */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
          <h4 className="text-xs font-bold text-red-400 mb-2 flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> SEGURIDAD HUMANA</h4>
          {data.sintesisSeguridad.map((s, i) => (<p key={i} className="text-[11px] text-slate-400 mb-1 flex items-start gap-2"><span className="text-red-400">-</span>{s}</p>))}
        </div>
        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
          <h4 className="text-xs font-bold text-orange-400 mb-2 flex items-center gap-2"><Heart className="w-3.5 h-3.5" /> REVOLUCION ETICA</h4>
          {data.sintesisEtica.map((s, i) => (<p key={i} className="text-[11px] text-slate-400 mb-1 flex items-start gap-2"><span className="text-orange-400">-</span>{s}</p>))}
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
          <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-2"><TrendingUpIcon className="w-3.5 h-3.5" /> SOBERANIA ALIMENTARIA</h4>
          {data.sintesisAgraria.map((s, i) => (<p key={i} className="text-[11px] text-slate-400 mb-1 flex items-start gap-2"><span className="text-emerald-400">-</span>{s}</p>))}
        </div>
        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
          <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2"><Radio className="w-3.5 h-3.5" /> ACUERDO DIGITAL</h4>
          {data.sintesisDigital.map((s, i) => (<p key={i} className="text-[11px] text-slate-400 mb-1 flex items-start gap-2"><span className="text-blue-400">-</span>{s}</p>))}
        </div>
      </div>

      {/* Cruce Estrategico */}
      <div>
        <h3 className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2"><Target className="w-4 h-4" /> CRUCE ESTRATEGICO: DOLOR + PROPUESTA + MENSAJE</h3>
        <div className="space-y-2">
          {data.cruces.map((c, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-start gap-2"><span className="text-[10px] text-red-400 font-bold flex-shrink-0">DOLOR:</span><p className="text-[11px] text-slate-400">{c.dolor}</p></div>
                <div className="flex items-start gap-2"><span className="text-[10px] text-emerald-400 font-bold flex-shrink-0">PROPUESTA:</span><p className="text-[11px] text-slate-400">{c.propuesta}</p></div>
                <div className="flex items-start gap-2"><span className="text-[10px] text-cyan-400 font-bold flex-shrink-0">MENSAJE:</span><p className="text-[11px] text-cyan-300 italic">{c.mensaje}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionEjes({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  const [expandido, setExpandido] = useState<string | null>(null);
  const EJE_ICONS: Record<string, React.ElementType> = { tranquilidad: Shield, estabilidad: Wallet, honestidad: Heart, respeto: Users, esperanza: TrendingUpIcon };

  return (
    <div className="space-y-4">
      {data.ejes.map((eje) => {
        const c = getColor(eje.color);
        const Icon = EJE_ICONS[eje.id] || Target;
        const isOpen = expandido === eje.id;
        return (
          <div key={eje.id} className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden transition-all ${isOpen ? 'shadow-lg ' + c.glow : ''}`}>
            <button onClick={() => setExpandido(isOpen ? null : eje.id)} className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3 text-left">
                <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${c.text}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200">{eje.titulo}</p>
                  <p className="text-[10px] text-slate-500">{eje.subtitulo}</p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-4 space-y-3 border-t border-slate-800/50 pt-3">
                    <div className={`p-3 rounded-lg ${c.bg} border ${c.border}`}>
                      <p className={`text-[10px] font-bold ${c.text} mb-1`}>POR QUE RESUENA</p>
                      <p className="text-[11px] text-slate-400">{eje.porQueResuena}</p>
                    </div>
                    <blockquote className={`text-xs italic ${c.text} border-l-2 ${c.border} pl-3 py-1`}>&ldquo;{eje.mensajeCentral}&rdquo;</blockquote>
                    <div className="space-y-1.5">
                      {eje.propuestas.map((p, j) => (
                        <div key={j} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 flex-shrink-0" /><p className="text-[11px] text-slate-400">{p}</p></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function SectionLineas({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  const [expandido, setExpandido] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {data.lineasMensaje.map((lm) => (
        <div key={lm.id} className="rounded-xl border border-slate-800 bg-slate-900/30 overflow-hidden">
          <button onClick={() => setExpandido(expandido === lm.id ? null : lm.id)} className="w-full flex items-center justify-between p-4">
            <p className="text-xs font-bold text-slate-200 text-left">{lm.tematica}</p>
            <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${expandido === lm.id ? 'rotate-90' : ''}`} />
          </button>
          <AnimatePresence>
            {expandido === lm.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="px-4 pb-4 space-y-3 border-t border-slate-800/50 pt-3">
                  {lm.frases.map((f, i) => (
                    <div key={i} className="flex items-start gap-3"><Quote className="w-3.5 h-3.5 text-cyan-400/50 flex-shrink-0 mt-0.5" /><p className="text-xs text-slate-400 italic leading-relaxed">{f}</p></div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function SectionComunicacion({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  return (
    <div className="space-y-5">
      {/* Evitar / Decir */}
      <div>
        <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> LO QUE NO SE DEBE DECIR</h3>
        <div className="space-y-2">
          {data.comunicacionEvitar.map((item, i) => (
            <div key={i} className="grid grid-cols-1 gap-1 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
              <div className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" /><p className="text-[11px]"><span className="text-red-400 font-semibold">EVITAR: </span><span className="text-slate-400">{item.evitar}</span></p></div>
              <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" /><p className="text-[11px]"><span className="text-emerald-400 font-semibold">DECIR: </span><span className="text-slate-400">{item.decir}</span></p></div>
              <p className="text-[10px] text-slate-600 pl-5 italic">{item.porQue}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tono */}
      <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
        <h3 className="text-xs font-bold text-cyan-400 mb-3 flex items-center gap-2"><Megaphone className="w-3.5 h-3.5" /> TONO Y ESTILO COMUNICATIVO</h3>
        <div className="grid grid-cols-1 gap-2">
          {data.comunicacionTono.map((t, i) => (
            <div key={i} className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span><p className="text-[11px] text-slate-400">{t}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionCanales({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  return (
    <div className="space-y-3">
      {data.canales.map((canal, i) => {
        const colors = ['cyan', 'blue', 'purple', 'pink', 'amber', 'emerald'];
        const c = getColor(colors[i % colors.length]);
        return (
          <div key={canal.nombre} className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold ${c.text}`}>{canal.nombre}</span>
              <span className="text-[10px] text-slate-600">| {canal.frecuencia}</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              <div className="flex items-start gap-2"><span className="text-[10px] text-slate-500 font-semibold flex-shrink-0 w-16">Formato:</span><p className="text-[11px] text-slate-400">{canal.formato}</p></div>
              <div className="flex items-start gap-2"><span className="text-[10px] text-slate-500 font-semibold flex-shrink-0 w-16">Contenido:</span><p className="text-[11px] text-slate-400">{canal.contenido}</p></div>
              <div className="flex items-start gap-2"><span className="text-[10px] text-slate-500 font-semibold flex-shrink-0 w-16">Tono:</span><p className="text-[11px] text-slate-400">{canal.tono}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionLenguaje({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  const [ejemploExpandido, setEjemploExpandido] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      {/* Intro */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/5 to-purple-500/5 border border-rose-500/15">
        <h3 className="text-sm font-bold text-rose-400 mb-2 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> EL PODER DE LAS PALABRAS</h3>
        <p className="text-xs text-slate-300 leading-relaxed">{data.lenguajeIntro}</p>
      </div>

      {/* Claves */}
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
        <h3 className="text-xs font-bold text-purple-400 mb-3 flex items-center gap-2"><Lightbulb className="w-3.5 h-3.5" /> CLAVES DEL LENGUAJE</h3>
        <div className="grid grid-cols-1 gap-2">
          {data.lenguajeClaves.map((clave, i) => (
            <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/50">
              <span className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
              <p className="text-xs text-slate-300">{clave}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ejemplos */}
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
        <h3 className="text-xs font-bold text-emerald-400 mb-3 flex items-center gap-2"><Quote className="w-3.5 h-3.5" /> EJEMPLOS POR CONTEXTO</h3>
        <div className="space-y-2">
          {data.lenguajeEjemplos.map((ej, i) => (
            <div key={i} className="border border-slate-800 rounded-lg overflow-hidden">
              <button onClick={() => setEjemploExpandido(ejemploExpandido === i ? null : i)} className="w-full flex items-center justify-between p-3 bg-slate-950/50 hover:bg-slate-900/50 transition-colors">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span className="text-xs text-slate-300 font-medium">{ej.contexto}</span></div>
                <ChevronRight className={`w-3.5 h-3.5 text-slate-500 transition-transform ${ejemploExpandido === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {ejemploExpandido === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="p-3 border-t border-slate-800 bg-emerald-500/5"><p className="text-xs text-emerald-300 italic">&ldquo;{ej.frase}&rdquo;</p></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Palabras que alejan/acercan */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/15">
          <h4 className="text-[10px] text-red-400 font-bold mb-2 flex items-center gap-1.5"><XCircle className="w-3 h-3" /> PALABRAS QUE ALEJAN</h4>
          <div className="flex flex-wrap gap-1">{['Revolucion', 'Lucha de clases', 'Paz total', 'Comunismo', 'Control de precios', 'Desmontar policia'].map((p, i) => (<span key={i} className="text-[10px] bg-red-500/10 text-red-300 px-2 py-0.5 rounded-full">{p}</span>))}</div>
        </div>
        <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
          <h4 className="text-[10px] text-emerald-400 font-bold mb-2 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> PALABRAS QUE ACERCAN</h4>
          <div className="flex flex-wrap gap-1">{['Mejoras concretas', 'Quien trabaja', 'Seguridad inteligente', 'Justicia social', 'Estado eficiente', 'Proteccion'].map((p, i) => (<span key={i} className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full">{p}</span>))}</div>
        </div>
      </div>
    </div>
  );
}

function SectionConclusiones({ data }: { data: ReturnType<typeof useAnalisisCampana>['data'] }) {
  return (
    <div className="space-y-3">
      {data.conclusiones.map((c, i) => (
        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-teal-500/5 border border-teal-500/15">
          <span className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
          <p className="text-xs text-slate-300 leading-relaxed">{c}</p>
        </div>
      ))}
    </div>
  );
}

// ========== COMPONENTE PRINCIPAL ==========

export function AnalisisCampana({ open, onClose }: AnalisisCampanaProps) {
  const { data } = useAnalisisCampana();
  const [section, setSection] = useState<Section>('resumen');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [section]);

  const renderSection = () => {
    switch (section) {
      case 'resumen': return <SectionResumen data={data} />;
      case 'perfil': return <SectionPerfil data={data} />;
      case 'sintesis': return <SectionSintesis data={data} />;
      case 'ejes': return <SectionEjes data={data} />;
      case 'lineas': return <SectionLineas data={data} />;
      case 'comunicacion': return <SectionComunicacion data={data} />;
      case 'canales': return <SectionCanales data={data} />;
      case 'lenguaje': return <SectionLenguaje data={data} />;
      case 'conclusiones': return <SectionConclusiones data={data} />;
    }
  };

  const currentSection = SECTIONS.find((s) => s.key === section)!;
  const CurrentIcon = currentSection.icon;
  const curColor = getColor(currentSection.color);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[2001] w-full max-w-4xl bg-slate-950 border-l border-cyan-500/20 shadow-2xl flex"
          >
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-0 lg:w-64'} flex-shrink-0 bg-slate-950 border-r border-slate-800 flex flex-col overflow-hidden transition-all duration-300`}>
              <div className="p-4 border-b border-slate-800">
                <h2 className="text-sm font-bold text-cyan-400 tracking-wider">ANALISIS ESTRATEGICO</h2>
                <p className="text-[10px] text-slate-500">Suba — Campana 2026</p>
              </div>
              <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {SECTIONS.map((s) => {
                  const c = getColor(s.color);
                  const isActive = section === s.key;
                  return (
                    <button key={s.key} onClick={() => { setSection(s.key); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs transition-all text-left ${isActive ? `${c.bg} border ${c.border} ${c.text}` : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'}`}>
                      <s.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{s.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-slate-800">
                <a href={data.pdfUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] hover:bg-cyan-500/20 transition-all">
                  <Download className="w-3.5 h-3.5" />
                  Descargar documento PDF
                </a>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center gap-3">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400">
                  <Menu className="w-4 h-4" />
                </button>
                <div className={`w-8 h-8 rounded-lg ${curColor.bg} border ${curColor.border} flex items-center justify-center flex-shrink-0`}>
                  <CurrentIcon className={`w-4 h-4 ${curColor.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className={`text-sm font-bold ${curColor.text} truncate`}>{currentSection.label.toUpperCase()}</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div ref={contentRef} className="flex-1 overflow-y-auto p-4 lg:p-6">
                <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {renderSection()}
                </motion.div>
              </div>
            </main>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
