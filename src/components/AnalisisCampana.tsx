import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Target,
  MapPin,
  Shield,
  Wallet,
  Heart,
  TrendingUp,
  AlertTriangle,
  Users,
  Clock,
  ChevronRight,
  FileText,
  Download,
} from 'lucide-react';

interface AnalisisCampanaProps {
  open: boolean;
  onClose: () => void;
}

const ZONAS_NARANJAS = [
  {
    upz: 'Niza',
    barrios: ['Niza Norte', 'Niza Suba', 'Niza VIII'],
    perfil: 'Clase media, conjuntos residenciales. Temor a inseguridad y costo de vida.',
    rutas: 'Av. Calle 127, Cra 58, Cra 53',
    horarios: '6-9am / 12-2pm / 5-8pm',
    transito: 'TransMilenio Portal Norte, buses intermunicipales',
  },
  {
    upz: 'La Alhambra',
    barrios: ['La Alhambra', 'Lisboa', 'Niza IX'],
    perfil: 'Familias jovenes, profesionales. Preocupacion por movilidad y servicios.',
    rutas: 'Av. Ciudad de Cali, Calle 134',
    horarios: '6-9am / 12-2pm / 6-9pm',
    transito: 'TransMilenio, alimentadores Cra 52',
  },
  {
    upz: 'El Prado',
    barrios: ['El Prado', 'Prado Veraniego', 'Prado Suba'],
    perfil: 'Estrato 3-4. Pequenos comerciantes y empleados. Sensacion de abandono.',
    rutas: 'Av. Boyaca, Calle 145, Cra 50',
    horarios: '5-8am / 11am-2pm / 5-9pm',
    transito: 'Buses ruta 60, 102, 107',
  },
  {
    upz: 'Suba',
    barrios: ['Suba Centro', 'Suba Rincon', 'Costa Azul'],
    perfil: 'Mixto comercial-residencial. Comerciantes locales extorsionados.',
    rutas: 'Av. Ciudad de Cali, Cra 30, Calle 132',
    horarios: '6-9am / 11am-3pm / 5-9pm',
    transito: 'TransMilenio Calle 142, buses ruta 60',
  },
  {
    upz: 'Casablanca',
    barrios: ['Casablanca', 'Altos de Suba', 'San Jose de Bavaria (sur)'],
    perfil: 'Transicion de clase media a baja. Jovenes sin oportunidades.',
    rutas: 'Av. Suba, Calle 116, Cra 22A',
    horarios: '5-8am / 12-2pm / 6-9pm',
    transito: 'TransMilenio Suba-Calles, buses 152, 60',
  },
  {
    upz: 'La Floresta',
    barrios: ['La Floresta', 'Bosques de Mariana'],
    perfil: 'Mujeres cabeza de hogar, cuidadores. Necesitan apoyo al cuidado.',
    rutas: 'Av. Calle 116, Cra 48, Av. El Rincon',
    horarios: '6-9am / 9-11am / 3-6pm',
    transito: 'Buses ruta 152, 25, TransMilenio Av. Suba',
  },
];

const EJES_MENSAJE = [
  {
    id: 'tranquilidad',
    titulo: 'Tranquilidad Inteligente',
    subtitulo: 'Seguridad con cabeza, no con mano dura',
    icono: Shield,
    color: 'cyan',
    mensaje: 'La seguridad real no es tanque en el barrio: es darle un futuro al joven que hoy lo reclutan las bandas. Jovenes en Paz y Servicio Social para la Paz ya demostraron reducir homicidios.',
    propuestas: [
      'Programas Jovenes en Paz y Servicio Social para la Paz',
      'Inteligencia contra extorsion que protege al comerciante',
      'Dialogo permanente entre Fuerza Publica y comunidades',
      'Sin militarizacion: prevencion con oportunidades',
    ],
  },
  {
    id: 'estabilidad',
    titulo: 'Estabilidad Economica Real',
    subtitulo: 'La plata debe alcanzar',
    icono: Wallet,
    color: 'emerald',
    mensaje: 'Nadie que trabaje 8 horas diarias deberia vivir con miedo de perder el apartamento. Siete programas concretos que se sienten desde el primer dia.',
    propuestas: [
      'Colombia Mayor ampliado: 4,2 millones de adultos mayores',
      'Renta Joven: $800 mil a $1 millon para jovenes que estudian',
      'Renta Ciudadana duplicada: 1,6 millones de familias',
      'Renta para discapacidad: 400 mil personas protegidas',
      'Pacto Productivo: credito para pequenos negocios',
    ],
  },
  {
    id: 'honestidad',
    titulo: 'Honestidad que se Ve',
    subtitulo: 'Austeridad republicana desde el dia 1',
    icono: Heart,
    color: 'orange',
    mensaje: 'Mi sueldo y el de mis ministros baja desde el dia 1. Cero lujos, cero viajes innecesarios. Todo lo ahorrado va a los siete programas de bienestar.',
    propuestas: [
      'Reduccion concreta de sueldos presidenciales y ministeriales',
      'Sistema Nacional contra la Macrocorrupcion: caiga quien caiga',
      'Pacto Fiscal: fin de privilegios tributarios',
      'Austeridad del gobierno, no del pueblo',
    ],
  },
  {
    id: 'respeto',
    titulo: 'Respeto por el Esfuerzo',
    subtitulo: 'La clase trabajadora no es invisible',
    icono: Users,
    color: 'purple',
    mensaje: 'Usted no es invisible. Su trabajo diario es lo que sostiene este pais. Vamos a proteger al pequeno comercio, formalizar el empleo y dignificar el trabajo de las mujeres.',
    propuestas: [
      'Formalizacion laboral acelerada con salario vital consolidado',
      'Sistema Nacional del Cuidado: guarderias y centros de cuidado',
      'Pacto Productivo: las economias populares son actor central',
      'Ley 80 reformada: Juntas de Accion Comunal como contratistas',
    ],
  },
  {
    id: 'esperanza',
    titulo: 'Esperanza Concreta',
    subtitulo: 'No esloganes: siete programas medibles',
    icono: TrendingUp,
    color: 'pink',
    mensaje: 'Le digo concretamente que voy a hacer: siete programas de bienestar que se sienten desde el primer dia. No promesas vacias: numeros, fechas y resultados.',
    propuestas: [
      'Kits escolares para 2 millones de estudiantes',
      '$6-6,5 billones redirigidos a comprarle a los campesinos',
      '5.000 lideres sociales con remuneracion digna',
      'Acuerdo Digital: formacion en programacion e IA para jovenes',
    ],
  },
];

const EVITAR_DECIR = [
  { evitar: 'Revolucion / transformacion historica', decir: 'Mejoras concretas / siete programas que se sienten' },
  { evitar: 'Lucha de clases / acabar con los ricos', decir: 'Quien trabaja dignamente merece estabilidad' },
  { evitar: 'Paz total / dialogo con actores armados', decir: 'Seguridad inteligente / prevencion que funciona' },
  { evitar: 'Comunismo / socialismo / etiquetas ideologicas', decir: 'Justicia social / dignidad para quien trabaja' },
  { evitar: 'Estado omnipresente / control de precios', decir: 'Estado eficiente que responde / menos filas, mas resultados' },
  { evitar: 'El cambio perfecto / sin errores', decir: 'Reconocemos errores y los corregimos' },
];

const COLOR_MAP: Record<string, string> = {
  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  pink: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
};

export function AnalisisCampana({ open, onClose }: AnalisisCampanaProps) {
  const [activeTab, setActiveTab] = useState<'zonas' | 'ejes' | 'perfil' | 'comunicacion'>('zonas');
  const [zonaExpandida, setZonaExpandida] = useState<string | null>(null);
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
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-orange-400 tracking-wider">
                      ANALISIS DE CAMPANA EN CALLE
                    </h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Estrategia Suba — Ivan Cepeda 2026
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
                  { key: 'zonas' as const, label: 'Zonas Naranjas', icon: MapPin },
                  { key: 'ejes' as const, label: '5 Ejes', icon: Target },
                  { key: 'perfil' as const, label: 'Perfil Votante', icon: Users },
                  { key: 'comunicacion' as const, label: 'Comunicacion', icon: FileText },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.key
                        ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
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
              {/* ===== ZONAS NARANJAS ===== */}
              {activeTab === 'zonas' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-4">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="text-orange-400 font-semibold">Zonas Naranjas:</span> Barrios de Suba donde
                      gano Petro en 2022 y ahora gano Abelardo. Son el electorado decisivo: clase media trabajadora,
                      estratos 2-4, que voto por el cambio y se desencanto. No son de derecha ni de izquierda:
                      quieren <span className="text-orange-400">tranquilidad y estabilidad</span>.
                    </p>
                  </div>
                  {ZONAS_NARANJAS.map((zona) => (
                    <div key={zona.upz} className="border border-slate-800 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setZonaExpandida(zonaExpandida === zona.upz ? null : zona.upz)}
                        className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-orange-400" />
                          <div className="text-left">
                            <p className="text-sm font-semibold text-slate-200">{zona.upz}</p>
                            <p className="text-[10px] text-slate-500">{zona.barrios.join(', ')}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${zonaExpandida === zona.upz ? 'rotate-90' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {zonaExpandida === zona.upz && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 space-y-3 border-t border-slate-800">
                              <div className="flex items-start gap-2">
                                <Users className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-400"><span className="text-slate-300 font-medium">Perfil:</span> {zona.perfil}</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-400"><span className="text-slate-300 font-medium">Rutas:</span> {zona.rutas}</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <Clock className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-400"><span className="text-slate-300 font-medium">Horarios:</span> {zona.horarios}</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <Target className="w-3.5 h-3.5 text-pink-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-400"><span className="text-slate-300 font-medium">Transito:</span> {zona.transito}</p>
                              </div>
                              <div className="flex gap-2 pt-2">
                                <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Piezas graficas</span>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Videos</span>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">QR</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ===== 5 EJES ===== */}
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

              {/* ===== PERFIL VOTANTE ===== */}
              {activeTab === 'perfil' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-cyan-400 mb-3">Quienes son los votantes de las Zonas Naranjas</h3>
                    <div className="space-y-2">
                      {[
                        'Familias de estratos 2, 3 y 4, residentes en conjuntos residenciales y propiedad horizontal',
                        'Clase media y media emergente: personas con trabajo estable, pequenas empresas o micronegocios',
                        'Jovenes profesionales, familias en crecimiento, comerciantes y pequenos empresarios',
                        'Personas que sienten que, con esfuerzo, han logrado mejorar su calidad de vida y temen perderlo',
                        'Votantes que en 2022 apostaron por el cambio y en 2026 se movieron buscando "probar algo distinto"',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                          <p className="text-xs text-slate-400 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Sus 5 Dolores Principales
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { label: 'INSEGURIDAD', desc: 'Robos en conjuntos, bandas rompiendo rejas, hurtos crecientes. Miedo de salir a la calle.' },
                        { label: 'COSTO DE VIDA', desc: 'Familia de 4 necesita $7,6M mensuales. Arriendos de 2-3 hab superan $2M. La plata no alcanza.' },
                        { label: 'MOVILIDAD', desc: 'TransMilenio lleno e inseguro. Trayectos eternos. Miedo al acoso para las mujeres.' },
                        { label: 'SALUD Y SERVICIOS', desc: 'Temor a enfermedad o despido que los saque del apartamento o quiebre el negocio.' },
                        { label: 'ABANDONO', desc: 'Frustracion de que las quejas no se traducen en soluciones. El gobierno no responde al barrio.' },
                      ].map((dolor, i) => (
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
                    <h3 className="text-sm font-semibold text-purple-400 mb-3">Como se sienten frente a Abelardo</h3>
                    <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                      <p><span className="text-emerald-400">Alivio:</span> Sienten esperanza de orden frente al descontrol percibido. Su discurso de autoridad se conecta con la percepcion de inseguridad.</p>
                      <p><span className="text-amber-400">Dudas:</span> Sienten que viene de una elite que no conoce la realidad de barrios como Suba. No conocen a fondo sus propuestas.</p>
                      <p><span className="text-cyan-400">Oportunidad:</span> NO se han cerrado a escuchar. Si la izquierda logra hablarles con propuestas concretas, todavia puede recuperar ese voto.</p>
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
                      {EVITAR_DECIR.map((item, i) => (
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
                    <h3 className="text-sm font-semibold text-cyan-400 mb-3">Tono y Estilo Comunicativo</h3>
                    <div className="space-y-1.5">
                      {[
                        'Hablar como la gente, no como el politico: frases cortas, vocabulario cotidiano',
                        'Respeto, nunca arrogancia: hablarle como a un igual con problemas reales',
                        'Autocritica, no autocomplacencia: reconocer errores genera mas confianza',
                        'Datos concretos, no abstracciones: usar los siete programas como ancla de credibilidad',
                        'Emocion controlada, no gritos: la calma transmite mas autoridad',
                        'Escucha activa: "entiendo su preocupacion" antes de proponer',
                        'Contraste sin odio: diferenciar de Abelardo sin insultar',
                        'Identificacion territorial: mencionar Suba, "su barrio", "su conjunto"',
                      ].map((item, i) => (
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
                      Analisis Estrategico SUBA + Nuevo Plan de Gobierno 2026-2030.
                      Estrategia completa con perfiles, ejes, canales y recomendaciones.
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
                Localidad de Suba, Bogota — Campana Ivan Cepeda 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
