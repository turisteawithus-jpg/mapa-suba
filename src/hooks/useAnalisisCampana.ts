import { useState, useEffect, useCallback } from 'react';

export interface EjeMensaje {
  id: string;
  titulo: string;
  subtitulo: string;
  mensaje: string;
  propuestas: string[];
  color: string;
}

export interface DolorVotante {
  label: string;
  descripcion: string;
}

export interface SentimientoVotante {
  label: string;
  descripcion: string;
}

export interface EvitarDecir {
  evitar: string;
  decir: string;
}

export interface AnalisisData {
  titulo: string;
  introduccion: string;
  contexto: string;
  ejes: EjeMensaje[];
  perfilQuienesSon: string[];
  perfilDolores: DolorVotante[];
  perfilSentimientos: SentimientoVotante[];
  comunicacionEvitar: EvitarDecir[];
  comunicacionTono: string[];
  lenguajeIntro: string;
  lenguajeClaves: string[];
  lenguajeEjemplos: { contexto: string; frase: string }[];
}

const STORAGE_KEY = 'suba_analisis_campana';

const DEFAULT_DATA: AnalisisData = {
  titulo: 'Analisis de Campana',
  introduccion: 'Estrategia territorial para la localidad de Suba basada en el analisis del electorado, sus preocupaciones reales y los mensajes que resuenan.',
  contexto: 'Las familias de estratos 2-4 en Suba votaron por el cambio y se desencantaron. No son de derecha ni de izquierda: son gente que quiere tranquilidad y estabilidad. Estan abiertos a escuchar si se les habla con respeto y propuestas concretas.',
  ejes: [
    {
      id: 'tranquilidad',
      titulo: 'Tranquilidad Inteligente',
      subtitulo: 'Seguridad con cabeza, no con mano dura',
      mensaje: 'La seguridad real no es tanque en el barrio: es darle un futuro al joven que hoy lo reclutan las bandas. Programas de prevencion que ya demostraron reducir homicidios.',
      propuestas: ['Programas de prevencion con oportunidades para jovenes', 'Inteligencia contra extorsion que protege al comerciante', 'Dialogo permanente entre fuerza publica y comunidades', 'Sin militarizacion: prevencion con oportunidades'],
      color: 'cyan',
    },
    {
      id: 'estabilidad',
      titulo: 'Estabilidad Economica Real',
      subtitulo: 'La plata debe alcanzar',
      mensaje: 'Nadie que trabaje 8 horas diarias deberia vivir con miedo de perder el apartamento. Programas concretos que se sienten desde el primer dia.',
      propuestas: ['Adultos mayores protegidos con pension digna', 'Renta Joven: apoyo a quienes estudian', 'Renta Ciudadana para familias vulnerables', 'Credito para pequenos negocios y emprendedores'],
      color: 'emerald',
    },
    {
      id: 'honestidad',
      titulo: 'Honestidad que se Ve',
      subtitulo: 'Austeridad desde el dia uno',
      mensaje: 'Reduccion de sueldos altos desde el primer dia. Cero lujos, cero viajes innecesarios. Todo lo ahorrado va a programas de bienestar.',
      propuestas: ['Reduccion concreta de sueldos de altos funcionarios', 'Sistema Nacional contra la corrupcion', 'Fin de privilegios tributarios', 'Austeridad del gobierno, no del pueblo'],
      color: 'orange',
    },
    {
      id: 'respeto',
      titulo: 'Respeto por el Esfuerzo',
      subtitulo: 'La clase trabajadora no es invisible',
      mensaje: 'Usted no es invisible. Su trabajo diario es lo que sostiene este pais. Proteger al pequeno comercio, formalizar el empleo y dignificar el trabajo.',
      propuestas: ['Formalizacion laboral con salario digno', 'Sistema Nacional del Cuidado: guarderias y centros', 'Las economias populares son actor central', 'Reforma para que las Juntas de Accion Comunal puedan gestionar recursos'],
      color: 'purple',
    },
    {
      id: 'esperanza',
      titulo: 'Esperanza Concreta',
      subtitulo: 'No esloganes: programas medibles',
      mensaje: 'Programas de bienestar que se sienten desde el primer dia. No promesas vacias: numeros, fechas y resultados.',
      propuestas: ['Kits escolares para estudiantes', 'Apoyo a campesinos y productores locales', 'Lideres sociales con remuneracion digna', 'Formacion en programacion e inteligencia artificial para jovenes'],
      color: 'pink',
    },
  ],
  perfilQuienesSon: [
    'Familias de estratos 2, 3 y 4, residentes en conjuntos residenciales',
    'Clase media y media emergente: personas con trabajo estable, pequenas empresas o micronegocios',
    'Jovenes profesionales, familias en crecimiento, comerciantes',
    'Personas que sienten que, con esfuerzo, han logrado mejorar y temen perderlo',
    'Votantes que apostaron por el cambio y se desencantaron',
  ],
  perfilDolores: [
    { label: 'INSEGURIDAD', descripcion: 'Robos en conjuntos, bandas rompiendo rejas, hurtos crecientes. Miedo de salir a la calle.' },
    { label: 'COSTO DE VIDA', descripcion: 'Arriendos que superan $2 millones. La plata no alcanza. Temor a quedarse sin vivienda.' },
    { label: 'MOVILIDAD', descripcion: 'Transporte publico lleno e inseguro. Trayectos eternos. Miedo al acoso.' },
    { label: 'SALUD Y SERVICIOS', descripcion: 'Temor a enfermedad o despido que los saque del apartamento o quiebre el negocio.' },
    { label: 'ABANDONO', descripcion: 'Frustracion de que las quejas no se traducen en soluciones. El gobierno no responde.' },
  ],
  perfilSentimientos: [
    { label: 'Alivio', descripcion: 'Sienten esperanza de orden frente al descontrol percibido. El discurso de autoridad se conecta con la percepcion de inseguridad.' },
    { label: 'Dudas', descripcion: 'Sienten que viene de una elite que no conoce la realidad de barrios como Suba. No conocen a fondo las propuestas.' },
    { label: 'Oportunidad', descripcion: 'NO se han cerrado a escuchar. Si se les habla con propuestas concretas, todavia pueden cambiar de opinion.' },
  ],
  comunicacionEvitar: [
    { evitar: 'Revolucion / transformacion historica', decir: 'Mejoras concretas / programas que se sienten' },
    { evitar: 'Lucha de clases / acabar con los ricos', decir: 'Quien trabaja dignamente merece estabilidad' },
    { evitar: 'Paz total / dialogo con actores armados', decir: 'Seguridad inteligente / prevencion que funciona' },
    { evitar: 'Etiquetas ideologicas', decir: 'Justicia social / dignidad para quien trabaja' },
    { evitar: 'Estado omnipresente / control de precios', decir: 'Estado eficiente que responde' },
    { evitar: 'El cambio perfecto / sin errores', decir: 'Reconocemos errores y los corregimos' },
  ],
  comunicacionTono: [
    'Hablar como la gente, no como el politico: frases cortas, vocabulario cotidiano',
    'Respeto, nunca arrogancia: hablarle como a un igual con problemas reales',
    'Autocritica, no autocomplacencia: reconocer errores genera mas confianza',
    'Datos concretos, no abstracciones: usar programas como ancla de credibilidad',
    'Emocion controlada, no gritos: la calma transmite mas autoridad',
    'Escucha activa: "entiendo su preocupacion" antes de proponer',
    'Contraste sin odio: diferenciar sin insultar',
    'Identificacion territorial: mencionar Suba, "su barrio", "su conjunto"',
  ],
  lenguajeIntro: 'El lenguaje es la herramienta mas poderosa de la campana. No se trata de decir lo que nos gusta, sino lo que el votante necesita escuchar. Cada palabra debe construir confianza, no dividir.',
  lenguajeClaves: [
    'Usar "nosotros" en vez de "yo": construir comunidad',
    'Nombrar el miedo para ofrecer esperanza: "Se que le preocupa la inseguridad, por eso..."',
    'Evitar anglicismos y tecnicismos: hablar como habla la gente del barrio',
    'Repetir las propuestas concretas: no asumir que se acuerdan, repetirlas en cada interaccion',
    'Usar el lenguaje del cuidado: "proteger", "cuidar", "acompanar" resuena mas que "transformar"',
    'Validar antes de proponer: "Tiene razon en estar preocupado, la inseguridad es real..."',
    'Evitar promesas que no se pueden cumplir: mejor decir menos y cumplirlo',
    'Usar historias, no estadisticas: "Maria, vecina de Suba, logro abrir su negocio gracias al credito..."',
  ],
  lenguajeEjemplos: [
    { contexto: 'En una esquina concurrida', frase: '"Buenas tardes. Veo que esta preocupado por la inseguridad. Tiene razon. Por eso proponemos inteligencia contra la extorsion, no mas tanques en el barrio."' },
    { contexto: 'En un conjunto residencial', frase: '"Se que el arriendo subio y la plata no alcanza. Nuestra propuesta es concreta: apoyo directo a familias, no promesas vacias."' },
    { contexto: 'Frente a un comerciante', frase: '"Usted mantiene este barrio con su trabajo. Nosotros proponemos credito accesible y proteccion contra la extorsion. Caiga quien caiga."' },
    { contexto: 'Con una madre de familia', frase: '"Entiendo su preocupacion por los jovenes. Nuestro programa les da oportunidades reales, no los deja solos."' },
  ],
};

function loadData(): AnalisisData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return DEFAULT_DATA;
}

export function useAnalisisCampana() {
  const [data, setData] = useState<AnalisisData>(loadData);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* */ }
  }, [data]);

  const updateData = useCallback((updates: Partial<AnalisisData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateEje = useCallback((index: number, eje: EjeMensaje) => {
    setData((prev) => {
      const ejes = [...prev.ejes];
      ejes[index] = eje;
      return { ...prev, ejes };
    });
  }, []);

  const addEje = useCallback(() => {
    setData((prev) => ({
      ...prev,
      ejes: [...prev.ejes, { id: `eje-${Date.now()}`, titulo: '', subtitulo: '', mensaje: '', propuestas: [], color: 'cyan' }],
    }));
  }, []);

  const removeEje = useCallback((index: number) => {
    setData((prev) => ({ ...prev, ejes: prev.ejes.filter((_, i) => i !== index) }));
  }, []);

  const resetDefaults = useCallback(() => {
    setData(DEFAULT_DATA);
  }, []);

  return { data, updateData, updateEje, addEje, removeEje, resetDefaults };
}
