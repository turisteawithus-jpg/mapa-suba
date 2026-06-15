import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Target,
  Users,
  Shield,
  Wallet,
  Heart,
  TrendingUp,
  AlertTriangle,
  FileText,
  Download,
  ChevronRight,
} from 'lucide-react';

interface AnalisisCampanaProps {
  open: boolean;
  onClose: () => void;
}

const EJES_MENSAJE = [
  {
    id: 'tranquilidad',
    titulo: 'Tranquilidad Inteligente',
    subtitulo: 'Seguridad con cabeza, no con mano dura',
    icono: Shield,
    color: 'cyan',
    mensaje: 'La seguridad real no es tanque en el barrio: es darle un futuro al joven que hoy lo reclutan las bandas. Programas de prevencion que ya demostraron reducir homicidios.',
    propuestas: [
      'Programas de prevencion con oportunidades para jovenes',
      'Inteligencia contra extorsion que protege al comerciante',
      'Dialogo permanente entre fuerza publica y comunidades',
      'Sin militarizacion: prevencion con oportunidades',
    ],
  },
  {
    id: 'estabilidad',
    titulo: 'Estabilidad Economica Real',
    subtitulo: 'La plata debe alcanzar',
    icono: Wallet,
    color: 'emerald',
    mensaje: 'Nadie que trabaje 8 horas diarias deberia vivir con miedo de perder el apartamento. Programas concretos que se sienten desde el primer dia.',
    propuestas: [
      'Adultos mayores protegidos con pension digna',
      'Renta Joven: apoyo a quienes estudian',
      'Renta Ciudadana para familias vulnerables',
      'Credito para pequenos negocios y emprendedores',
    ],
  },
  {
    id: 'honestidad',
    titulo: 'Honestidad que se Ve',
    subtitulo: 'Austeridad desde el dia uno',
    icono: Heart,
    color: 'orange',
    mensaje: 'Reduccion de sueldos altos desde el primer dia. Cero lujos, cero viajes innecesarios. Todo lo ahorrado va a programas de bienestar.',
    propuestas: [
      'Reduccion concreta de sueldos de altos funcionarios',
      'Sistema Nacional contra la corrupcion',
      'Fin de privilegios tributarios',
      'Austeridad del gobierno, no del pueblo',
    ],
  },
  {
    id: 'respeto',
    titulo: 'Respeto por el Esfuerzo',
    subtitulo: 'La clase trabajadora no es invisible',
    icono: Users,
    color: 'purple',
    mensaje: 'Usted no es invisible. Su trabajo diario es lo que sostiene este pais. Proteger al pequeno comercio, formalizar el empleo y dignificar el trabajo.',
    propuestas: [
      'Formalizacion laboral con salario digno',
      'Sistema Nacional del Cuidado: guarderias y centros',
      'Las economias populales son actor central',
      'Reforma para que las Juntas de Accion Comunal puedan gestionar recursos',
    ],
  },
  {
    id: 'esperanza',
    titulo: 'Esperanza Concreta',
    subtitulo: 'No esloganes: programas medibles',
    icono: TrendingUp,
    color: 'pink',
    mensaje: 'Programas de bienestar que se sienten desde el primer dia. No promesas vacias: numeros, fechas y resultados.',
    propuestas: [
      'Kits escolares para estudiantes',
      'Apoyo a campesinos y productores locales',
      'Lideres sociales con remuneracion digna',
      'Formacion en programacion e inteligencia artificial para jovenes',
    ],
  },
];

const PERFIL_VOTANTE = {
  quienesSon: [
    'Familias de estratos 2, 3 y 4, residentes en conjuntos residenciales',
    'Clase media y media emergente: personas con trabajo estable, pequenas empresas o micronegocios',
    'Jovenes profesionales, familias en crecimiento, comerciantes',
    'Personas que sienten que, con esfuerzo, han logrado mejorar y temen perderlo',
    'Votantes que apostaron por el cambio y se desencantaron',
  ],
  dolores: [
    { label: 'INSEGURIDAD', desc: 'Robos en conjuntos, bandas rompiendo rejas, hurtos crecientes. Miedo de salir a la calle.' },
    { label: 'COSTO DE VIDA', desc: 'Arriendos que superan $2 millones. La plata no alcanza. Temor a quedarse sin vivienda.' },
    { label: 'MOVILIDAD', desc: 'Transporte publico lleno e inseguro. Trayectos eternos. Miedo al acoso.' },
    { label: 'SALUD Y SERVICIOS', desc: 'Temor a enfermedad o despido que los saque del apartamento o quiebre el negocio.' },
    { label: 'ABANDONO', desc: 'Frustracion de que las quejas no se traducen en soluciones. El gobierno no responde.' },
  ],
  sentimientos: [
    { label: 'Alivio', desc: 'Sienten esperanza de orden frente al descontrol percibido. El discurso de autoridad se conecta con la percepcion de inseguridad.' },
    { label: 'Dudas', desc: 'Sienten que viene de una elite que no conoce la realidad de barrios como Suba. No conocen a fondo las propuestas.' },
    { label: 'Oportunidad', desc: 'NO se han cerrado a escuchar. Si se les habla con propuestas concretas, todavia pueden cambiar de opinion.' },
  ],
};

const COMUNICACION = {
  evitar: [
    { evitar: 'Revolucion / transformacion historica', decir: 'Mejoras concretas / programas que se sienten' },
    { evitar: 'Lucha de clases / acabar con los ricos', decir: 'Quien trabaja dignamente merece estabilidad' },
    { evitar: 'Paz total / dialogo con actores armados', decir: 'Seguridad inteligente / prevencion que funciona' },
    { evitar: 'Etiquetas ideologicas', decir: 'Justicia social / dignidad para quien trabaja' },
    { evitar: 'Estado omnipresente / control de precios', decir: 'Estado eficiente que responde' },
    { evitar: 'El cambio perfecto / sin errores', decir: 'Reconocemos errores y los corregimos' },
  ],
  tono: [
    'Hablar como la gente, no como el politico: frases cortas, vocabulario cotidiano',
    'Respeto, nunca arrogancia: hablarle como a un igual con problemas reales',
    'Autocritica, no autocomplacencia: reconocer errores genera mas confianza',
    'Datos concretos, no abstracciones: usar programas como ancla de credibilidad',
    'Emocion controlada, no gritos: la calma transmite mas autoridad',
    'Escucha activa: "entiendo su preocupacion" antes de proponer',
    'Contraste sin odio: diferenciar sin insultar',
    'Identificacion territorial: mencionar Suba, "su barrio", "su conjunto"',
  ],
};

const COLOR_MAP: Record<string, string> = {
  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  pink: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
};

export function AnalisisCampana({ open, onClose }: AnalisisCampanaProps) {
  const [activeTab, setActiveTab] = useState<'ejes' | 'perfil' | 'comunicacion'>('ejes');
  const [ejeExpandido, setEjeExpandido] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[2001] w-full max-w-3xl bg-slate-950 border-l border-cyan-500/20 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-cyan-400 tracking-wider">
                      ANALISIS DE CAMPAÑA
                    </h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Estrategia territorial
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Tabs */}
              <div className="flex gap-1 mt-4 overflow-x-auto">
                {[
                  { key: 'ejes' as const, label: 'Ejes de Mensaje', icon: Target },
                  { key: 'perfil' as const, label: 'Perfil del Votante', icon: Users },
                  { key: 'comunicacion' as const, label: 'Comunicacion', icon: FileText },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.key
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* ===== EJES DE MENSAJE ===== */}
              {activeTab === 'ejes' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {EJES_MENSAJE.map((eje) => {
                    const c = COLOR_MAP[eje.color];
                    return (
                      <div key={eje.id} className={`border rounded-xl overflow-hidden ${c.split(' ')[2]}`}>
                        <button
                          onClick={() => setEjeExpandido(ejeExpandido === eje.id ? null : eje.id)}
                          className={`w-full flex items-center justify-between p-4 ${c.split(' ')[1]} transition-colors`}
                        >
                          <div className="flex items-center gap-3">
                            <eje.icono className={`w-5 h-5 ${c.split(' ')[0]}`} />
                            <div className="text-left">
                              <p className="text-sm font-semibold text-slate-200">{eje.titulo}</p>
                              <p className="text-[10px] text-slate-500">{eje.subtitulo}</p>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${ejeExpandido === eje.id ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {ejeExpandido === eje.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="p-4 space-y-3 border-t border-slate-800">
                                <p className={`text-xs leading-relaxed ${c.split(' ')[0]}`}>{eje.mensaje}</p>
                                <div className="space-y-1.5">
                                  {eje.propuestas.map((p, j) => (
                                    <div key={j} className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 mt-1.5 flex-shrink-0" />
                                      <p className="text-xs text-slate-400">{p}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* ===== PERFIL DEL VOTANTE ===== */}
              {activeTab === 'perfil' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-cyan-400 mb-3">Quienes son los votantes decisivos</h3>
                    <div className="space-y-2">
                      {PERFIL_VOTANTE.quienesSon.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">{i + 1}</span>
                          <p className="text-xs text-slate-400 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Sus Dolores Principales
                    </h3>
                    <div className="space-y-2">
                      {PERFIL_VOTANTE.dolores.map((dolor, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/50">
                          <span className="text-[10px] text-orange-400 font-bold flex-shrink-0 w-4">{i + 1}</span>
                          <div>
                            <p className="text-[11px] text-slate-300 font-semibold">{dolor.label}</p>
                            <p className="text-[10px] text-slate-500 leading-relaxed">{dolor.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-purple-400 mb-3">Como se sienten</h3>
                    <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                      {PERFIL_VOTANTE.sentimientos.map((s, i) => (
                        <p key={i}><span className={i === 0 ? 'text-emerald-400' : i === 1 ? 'text-amber-400' : 'text-cyan-400'}>{s.label}:</span> {s.desc}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===== COMUNICACION ===== */}
              {activeTab === 'comunicacion' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-amber-400 mb-3">Lo que NO se debe decir (y por que)</h3>
                    <div className="space-y-2">
                      {COMUNICACION.evitar.map((item, i) => (
                        <div key={i} className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-2">
                            <p className="text-red-400 font-medium mb-0.5">EVITAR:</p>
                            <p className="text-slate-500">{item.evitar}</p>
                          </div>
                          <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-2">
                            <p className="text-emerald-400 font-medium mb-0.5">DECIR:</p>
                            <p className="text-slate-500">{item.decir}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-cyan-400 mb-3">Tono y Estilo</h3>
                    <div className="space-y-1.5">
                      {COMUNICACION.tono.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 mt-1.5 flex-shrink-0" />
                          <p className="text-xs text-slate-400">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Documento Completo
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">
                      Analisis Estrategico completo con perfiles, ejes, canales y recomendaciones.
                    </p>
                    <a
                      href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Descargar Analisis Estrategico (PDF)
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center py-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-600">
                Localidad de Suba, Bogota — Campana 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
