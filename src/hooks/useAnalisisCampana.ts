import { useState, useEffect, useCallback } from 'react';

// ==================== INTERFACES ====================

export interface EjeMensaje {
  id: string;
  titulo: string;
  subtitulo: string;
  porQueResuena: string;
  mensajeCentral: string;
  propuestas: string[];
  color: string;
}

export interface LineaMensaje {
  id: string;
  tematica: string;
  frases: string[];
}

export interface EvitarDecir {
  evitar: string;
  porQue: string;
  decir: string;
}

export interface Canal {
  nombre: string;
  formato: string;
  contenido: string;
  tono: string;
  frecuencia: string;
}

export interface CruceEstrategico {
  dolor: string;
  propuesta: string;
  mensaje: string;
}

export interface AnalisisData {
  // General
  titulo: string;
  resumenEjecutivo: string;

  // 1. Contraste Programas
  contrasteCambios: string[];
  contrasteMantiene: string[];
  contrasteNuevo: string[];

  // 2. Evaluacion
  evalValido: string[];
  evalAjuste: string[];
  evalNoAplica: string[];
  evalVeredicto: string;

  // 3. Perfil Electorado
  perfilQuienesSon: string[];
  perfilMiedos: { label: string; descripcion: string }[];
  perfilFrenteAbelardo: string[];
  perfilFrenteIzquierda: string[];

  // 4. Sintesis Plan de Gobierno
  sintesisSeguridad: string[];
  sintesisProgramas: { nombre: string; descripcion: string }[];
  sintesisPactoProductivo: string;
  sintesisPactoSocial: string;
  sintesisPactoFiscal: string;
  sintesisEtica: string[];
  sintesisAgraria: string[];
  sintesisDigital: string[];

  // 5. Cruce Estrategico
  cruces: CruceEstrategico[];

  // 6. Ejes de Mensaje
  ejes: EjeMensaje[];

  // 7. Lineas de Mensaje
  lineasMensaje: LineaMensaje[];

  // 8. Comunicacion
  comunicacionEvitar: EvitarDecir[];
  comunicacionTono: string[];

  // 9. Canales
  canales: Canal[];

  // 10. Conclusiones
  conclusiones: string[];

  // 11. Lenguaje
  lenguajeIntro: string;
  lenguajeClaves: string[];
  lenguajeEjemplos: { contexto: string; frase: string }[];

  // 12. Reglas de Oro (Manual de Mensajes)
  reglasDeOro: { numero: number; titulo: string; descripcion: string }[];

  // Documento PDF
  pdfUrl: string;
}

// ==================== DEFAULT DATA ====================

const STORAGE_KEY = 'suba_analisis_campana';

const DEFAULT_DATA: AnalisisData = {
  titulo: 'ANALISIS ESTRATEGICO SUBA',

  resumenEjecutivo: `El electorado clave en Suba no es ni de derecha ni de izquierda: es una clase media trabajadora, asustada y decepcionada, que voto por el cambio en 2022 y se desplazo hacia Abelardo de la Espriella en 2026 por desencanto con la inseguridad, el costo de vida y la percepcion de desorden. Estas personas no se han cerrado a escuchar, pero necesitan propuestas concretas, explicadas con respeto, que hablen directamente a sus preocupaciones cotidianas. El nuevo plan de gobierno de Ivan Cepeda contiene las respuestas estructurales a esos dolores: Seguridad Humana (no mano dura represiva), politica social centrada en siete programas concretos de bienestar, austeridad republicana, lucha contra la macrocorrupcion, y un modelo economico basado en los Tres Pactos Nacionales. La tarea estrategica es traducir esas propuestas nacionales en un lenguaje que resuene en el apartamento de 65 metros de un conjunto residencial de Suba, en la tienda del barrio, en la fila del TransMilenio.`,

  // 1. Contraste Programas
  contrasteCambios: [
    'Cambio de eje conceptual: de cuatro revoluciones a TRES (Etica, Social y Economica unificadas, Politica)',
    'Emergencia de los Tres Pactos Nacionales: Productivo, Social y Fiscal como mecanismos de articulacion entre Estado, sector privado y economias populares',
    'Profundizacion en la Revolucion Agraria: capitulo completo con Alianza Nacional Alimentaria, Programa Nacional de Agroindustria y transformacion de compras publicas',
    'Sistema Nacional de Cuidado como pilar: infraestructura publica territorial, guarderias publicas, centros de cuidado, con fondo nacional dedicado',
    'Reforma agraria cuantificada: 750.000 hectareas gestionadas, 1,7 millones formalizadas, meta de 1 millon mas, cooperativas y figuras asociativas',
    'Regulacion de drogas como eje de paz: cambio de paradigma con regulacion del cannabis, rutas de legalidad y transformacion territorial',
    'Programas sociales cuantificados: siete programas concretos (Colombia Mayor 4,2 millones, Renta Joven 800 mil a 1 millon, Renta Ciudadana duplicada a 1,6 millones familias, renta discapacidad 400 mil)',
  ],
  contrasteMantiene: [
    'Seguridad Humana como eje central: prevencion, Jovenes en Paz, Servicio Social para la Paz, distincion entre seguridad inteligente y mano dura',
    'Sistema Nacional contra la Macrocorrupcion: cinco pilares (transparencia, investigacion, juzgamiento, presencia territorial, movilizacion ciudadana)',
    'Austeridad Republicana: "quien debe apretarse el cinturon es el gobierno, no el pueblo"',
    'Reforma a la salud: superar modelo Ley 100, Estado recupera rectoria, atencion primaria universal',
    'Reforma laboral y salario vital: proteccion contra despido arbitrario, formalizacion laboral',
    'Implementacion del Acuerdo de Paz: enfoque territorial',
    'Educacion publica gratuita y territorializada: matricula cero, multicampus, fortalecimiento SENA',
  ],
  contrasteNuevo: [
    'Acuerdo Digital Nacional: cerrar brecha digital, Hubs Digitales Regionales, formacion tecnologica masiva con SENA',
    'Programa Nacional de Empleabilidad Digital: formacion en programacion, IA y transicion energetica para trabajadores informales, jovenes y mujeres cabeza de hogar',
    'Turismo sostenible como eje economico: marca pais "Colombia, el pais de la belleza"',
    'Banca publica reformada: Grupo Bicentenario coordinando Bancoldex, FINAGRO, Banco Agrario, FNA y Findeter',
    'Red de mercados campesinos digitales: Alianza Nacional Alimentaria gestionara reservas estrategicas y red nacional de comercializacion',
    'Politica de Inteligencia Artificial con enfoque etico: centrada en dignidad humana, igualdad y justicia social',
  ],

  // 2. Evaluacion
  evalValido: [
    'Perfil del electorado: diagnostico del votante de estratos 2-4 en Suba se mantiene intacto',
    'Los 5 dolores principales: inseguridad, costo de vida, movilidad, salud/servicios y abandono siguen siendo los motores emocionales del voto',
    'Ejes de mensaje prioritarios: tranquilidad inteligente, estabilidad economica, honestidad, respeto al esfuerzo y esperanza concreta siguen siendo los pilares correctos',
    'Estrategia de canales: WhatsApp, Facebook, Instagram, TikTok y medios tradicionales sigue siendo valida',
    'El contraste con Abelardo: estrategia de diferenciacion informativa (no agresiva) sigue siendo pertinente',
    'Lo que NO se debe decir: recomendaciones de evitar terminos como "revolucion", "lucha de clases", "paz total" abstracta siguen siendo validas',
  ],
  evalAjuste: [
    'La narrativa de las propuestas: actualizar ejemplos numericos (4,2 millones adultos mayores, 1,6 millones familias Renta Ciudadana, 400 mil discapacidad)',
    'El eje economico: incorporar narrativa de los "Tres Pactos Nacionales" que articula a todos los sectores',
    'La revolucion agraria: ahora hay mas contenido concreto (Alianza Nacional Alimentaria, mercados campesinos)',
    'El Sistema Nacional de Cuidado: aparece como propuesta con infraestructura fisica (guarderias, centros)',
    'La economia digital: eje nuevo que resuena especialmente con jovenes de Suba',
    'La banca publica: credito con enfoque territorial para pequenos comerciantes y emprendedores',
  ],
  evalNoAplica: [
    'La mencion a la "Renta Basica Universal": el nuevo plan usa programas especificos (Renta Ciudadana, Renta Joven)',
    'Algunos datos de reduccion de pobreza: el nuevo plan habla de reduccion de 37 a 32 de cada 100 colombianos',
  ],
  evalVeredicto: 'El analisis estrategico SUBA actual SIGUE SIENDO MAYORITARIAMENTE VALIDO. No contradice el nuevo plan; por el contrario, lo FORTALECE con propuestas mas concretas, cuantificadas y con mayor nivel de detalle. La estructura emocional y el enfoque persuasivo no necesitan cambios fundamentales. El nivel de alineacion se estima en un 75-80%. El 20-25% restante son ajustes de contenido, no de estrategia.',

  // 3. Perfil Electorado
  perfilQuienesSon: [
    'Familias de estratos 2, 3 y 4, residentes en conjuntos residenciales y propiedad horizontal',
    'Clase media y media emergente: personas con trabajo estable, pequenas empresas o micronegocios',
    'Jovenes profesionales, familias en crecimiento, comerciantes y pequenos empresarios',
    'Personas que sienten que, con esfuerzo, han logrado mejorar su calidad de vida y temen perderlo',
    'Votantes que en 2022 apostaron por el cambio y en 2026 se movieron buscando "probar algo distinto" o "poner un freno"',
    'NO se identifican con etiquetas ideologicas. No se ven ni de derecha ni de izquierda: se ven como gente trabajadora que quiere tranquilidad y estabilidad',
    'Son una franja "bisagra": ni los mas ricos ni los mas pobres, sino una masa intermedia que funciona como termometro del malestar social',
  ],
  perfilMiedos: [
    { label: 'INSEGURIDAD CIUDADANA', descripcion: 'Robos dentro de conjuntos residenciales, bandas que rompen rejas, homicidios y hurtos en crecimiento. Suba es hoy una de las localidades con mas hurtos reportados de Bogota. El miedo de salir a la calle o dejar el apartamento solo es paralizante.' },
    { label: 'COSTO DE VIDA', descripcion: 'Una familia de cuatro personas necesita $7,6 millones mensuales solo para gastos basicos sin contar arriendo. Los arriendos de 2-3 habitaciones superan facilmente los $2 millones. La sensacion de "la plata no alcanza" es abrumadora.' },
    { label: 'MOVILIDAD Y TRANSPORTE', descripcion: 'Trayectos largos en TransMilenio lleno, percepcion de mas robos que en la calle. Para las mujeres, el miedo al acoso es aun mayor.' },
    { label: 'SALUD Y SERVICIOS', descripcion: 'Temor a que una enfermedad, perdida de empleo o subida de intereses los saque del apartamento o quiebre el negocio familiar.' },
    { label: 'SENTIMIENTO DE ABANDONO', descripcion: 'Frustracion de que las quejas no se traducen en soluciones. "El gobierno habla de muchos temas, pero no responde a los dolores concretos del barrio".' },
  ],
  perfilFrenteAbelardo: [
    'Sienten alivio y esperanza de orden frente al descontrol percibido',
    'Su discurso de autoridad se conecta con la percepcion de que la inseguridad esta fuera de control',
    'Para muchos, representa "alguien que por fin va a poner reglas claras"',
    'Pero tambien tienen dudas: sienten que viene de una elite que no conoce la realidad de barrios como Suba',
    'Perciben incoherencias: habla de "defender al ciudadano" pero tiene relaciones con sectores de poder economico',
    'No conocen a fondo sus propuestas ni sus alianzas politicas',
  ],
  perfilFrenteIzquierda: [
    'El sentimiento es DECEPCION MEZCLADA CON ENOJO, mas que rechazo total',
    'Reconocen que votaron por el cambio en 2022 porque estaban cansados de los mismos de siempre',
    'Sienten que la inseguridad sigue, que la plata no alcanza, y que el discurso se quedo en peleas politicas',
    '"Ya probaron la opcion de izquierda y ahora hay que castigarla con el voto"',
    'Aun asi, NO se han cerrado por completo a escuchar',
    'Si se les habla con propuestas concretas de seguridad, economia del dia a dia y respeto por la comunidad, todavia pueden recuperar parte de ese voto',
  ],

  // 4. Sintesis Plan
  sintesisSeguridad: [
    'Atender las causas sociales de la violencia: trabajo digno, ingresos justos, educacion, vivienda, salud como politica de seguridad',
    'Programas como Jovenes en Paz y Servicio Social para la Paz que han demostrado reducir homicidios',
    'Proteccion contra extorsion con respuestas tecnologicas para pequenos comerciantes',
    'Sin militarizacion: dialogo permanente entre Fuerza Publica y comunidades',
    'Fortalecimiento de inteligencia e investigacion criminal contra redes de crimen organizado',
  ],
  sintesisProgramas: [
    { nombre: 'COLOMBIA MAYOR ampliado', descripcion: '4,2 millones de adultos mayores protegidos, bono pensional fortalecido' },
    { nombre: 'RENTA JOVEN', descripcion: 'Transferencias de $800 mil a $1 millon para jovenes en universidad publica o Servicio para la Paz' },
    { nombre: 'RENTA CIUDADANA duplicada', descripcion: 'De 800 mil a 1,6 millones de familias, con credito productivo para 200 mil microempresas' },
    { nombre: 'RENTA PARA DISCAPACIDAD', descripcion: 'Proteccion a mas de 400 mil ninos, ninas y jovenes hasta 29 anos' },
    { nombre: 'PROTECCION A LIDERES SOCIALES', descripcion: 'Remuneracion economica para 5.000 defensores de la vida en regiones de riesgo' },
    { nombre: 'COMPRAS PUBLICAS AL CAMPO', descripcion: 'Redireccion de $6-6,5 billones anuales a campesinos y economias populares' },
    { nombre: 'KITS ESCOLARES NACIONALES', descripcion: 'Utiles escolares para cerca de 2 millones de estudiantes' },
  ],
  sintesisPactoProductivo: 'Mas industria nacional, Revolucion Agraria con 1 millon de hectareas mas, banca publica con credito para pequenos comerciantes y economias populares, reforma a la Ley 80 de contratacion para que Juntas de Accion Comunal sean contratistas del Estado.',
  sintesisPactoSocial: 'Salario vital consolidado con aumentos reales vinculados a productividad y costo de vida, formalizacion laboral acelerada, Sistema Nacional del Cuidado con guarderias publicas y centros de cuidado, reduccion de aporte a salud para pensionados al 4%.',
  sintesisPactoFiscal: 'Lucha contra macrocorrupcion como fuente de financiacion, fin de privilegios tributarios, simplificacion tributaria para pymes y economias populares, estabilizacion gradual de la deuda publica sin recortes sociales.',
  sintesisEtica: [
    'Sistema Nacional contra la Macrocorrupcion con cinco pilares: transparencia, investigacion, juzgamiento, presencia territorial, movilizacion ciudadana',
    'Recuperacion de lo robado: Fondo de Reparacion de Victimas de la Corrupcion',
    'Austeridad Republicana: reduccion de salarios del Presidente y ministros desde el primer dia',
    'Cero lujos, cero viajes innecesarios, cada peso ahorrado va a inversion social',
  ],
  sintesisAgraria: [
    'Alianza Nacional Alimentaria para garantizar productos nacionales de calidad y bajo precio',
    'Red nacional de comercializacion digital que prioriza produccion campesina',
    'Mercados campesinos en las ciudades: acercar productos frescos y baratos a los barrios urbanos',
    'Programa Nacional de Agroindustria para que campesinos industrialicen su produccion',
  ],
  sintesisDigital: [
    'Programa Nacional de Empleabilidad Digital con el SENA como eje central',
    'Formacion en programacion, inteligencia artificial y transicion energetica',
    'Hubs Digitales Regionales y centros de datos nacionales con soberania tecnologica',
    'Regulacion del trabajo en plataformas digitales con derechos laborales garantizados',
  ],

  // 5. Cruces Estrategicos
  cruces: [
    { dolor: 'Miedo a robos en conjuntos, bandas rompiendo rejas', propuesta: 'Seguridad Humana: prevencion con Jovenes en Paz, inteligencia contra extorsion', mensaje: 'La seguridad no es solo patrulla: es darle futuro al joven del barrio para que no termine en bandas. La prevencion ya demostro que funciona.' },
    { dolor: 'La plata no alcanza: arriendos por encima de $2 millones', propuesta: 'Pacto Social: salario vital, Renta Ciudadana 1,6 millones familias, credito 200 mil microempresas', mensaje: 'Nadie que trabaje dignamente deberia vivir con miedo de perder el apartamento. Vamos a defender su salario y las familias recibiran apoyo real.' },
    { dolor: 'Miedo a enfermedad o despido que los saque de sus hogares', propuesta: 'Reforma a la salud: sistema mixto con rectoria del Estado, atencion primaria universal', mensaje: 'La salud no puede ser una loteria donde el que no tiene plata se muere. Vamos a garantizar atencion como derecho, no como negocio.' },
    { dolor: 'Sospecha de que todos los politicos son iguales y roban', propuesta: 'Sistema Nacional contra la Macrocorrupcion + Austeridad Republicana', mensaje: 'No le vamos a pedir austeridad al pueblo: se la vamos a exigir al gobierno. Mi sueldo baja desde el dia 1. Y si alguien roba, caiga quien caiga.' },
    { dolor: 'Pequenos comerciantes ahogados por costos y extorsion', propuesta: 'Pacto Productivo: banca publica con credito, reforma Ley 80, proteccion tecnologica contra extorsion', mensaje: 'El dueno de la tienda del barrio no esta solo. Vamos a perseguir a los extorsionistas con tecnologia y darle acceso a credito justo.' },
    { dolor: 'Miedo al recorte del Estado y desaparicion de servicios', propuesta: 'Pacto Fiscal: se recorta el lujo del gobierno, no los colegios ni los hospitales', mensaje: 'Cuando Abelardo dice achiquemos el Estado, quiere menos hospitales para su barrio y mas ganancias para sus amigos. Yo voy a achicar el sueldo de los ministros.' },
    { dolor: 'Frustracion con la movilidad: TransMilenio lleno, inseguro', propuesta: 'Inversion en transporte publico digno, seguridad en el sistema', mensaje: 'Ninguna mujer deberia tener miedo de subirse al TransMilenio. Vamos a recuperar el transporte publico como un servicio seguro y digno.' },
    { dolor: 'Preocupacion por el futuro de sus hijos', propuesta: 'Siete programas sociales, Acuerdo Digital con formacion en programacion e IA', mensaje: 'Sus hijos merecen educacion gratuita, un primer empleo digno y las herramientas digitales para el futuro. No pasantias sin pago ni promesas vacias.' },
    { dolor: 'Mujeres que trabajan y cuidan, sin descanso ni apoyo', propuesta: 'Sistema Nacional del Cuidado: guarderias publicas, centros de cuidado, Fondo Nacional', mensaje: 'Las mujeres de Suba sostienen la familia y la economia. Vamos a crear guarderias y centros de cuidado para que puedan trabajar y descansar sin culpa.' },
    { dolor: 'Sensacion de que nadie nos escucha', propuesta: 'Gobierno del pueblo, con el pueblo y para el pueblo: dialogo directo', mensaje: 'A ustedes no los vamos a usar para una foto. Van a tener voz real en las decisiones que afectan su barrio. Eso se llama democracia que se siente.' },
  ],

  // 6. Ejes de Mensaje
  ejes: [
    {
      id: 'tranquilidad',
      titulo: 'Tranquilidad Inteligente',
      subtitulo: 'Seguridad con cabeza',
      porQueResuena: 'La gente de Suba quiere seguridad, pero tiene miedo de que la "mano dura" se traduzca en violencia contra sus propios hijos. Han visto suficiente violencia policial en las noticias.',
      mensajeCentral: 'La seguridad real no es tanque en el barrio: es darle un futuro al joven que hoy lo reclutan las bandas.',
      propuestas: [
        'Programas concretos de Jovenes en Paz y Servicio Social para la Paz',
        'Inteligencia contra la extorsion que protege al comerciante con tecnologia',
        'Seguridad se construye CON la comunidad, no contra ella',
        'Contraste con megacarceles de Abelardo que no resuelven las causas',
      ],
      color: 'cyan',
    },
    {
      id: 'estabilidad',
      titulo: 'Estabilidad Economica Real',
      subtitulo: 'La plata debe alcanzar',
      porQueResuena: 'El dolor mas profundo de la clase media de Suba es que "la plata no alcanza". No quieren subsidios: quieren estabilidad y oportunidades.',
      mensajeCentral: 'Nadie que trabaje 8 horas diarias deberia vivir con miedo de perder el apartamento.',
      propuestas: [
        'Defensa del salario vital con aumentos reales vinculados a productividad y costo de vida',
        'Siete programas sociales concretos: Colombia Mayor, Renta Joven, Renta Ciudadana, renta discapacidad, proteccion a lideres, compras al campo, kits escolares',
        'Pacto Productivo: credito para pequenos negocios, reforma Ley 80 para que comunas sean contratistas',
        'Acuerdo Digital: formacion en programacion e IA para jovenes de barrios como Suba',
      ],
      color: 'emerald',
    },
    {
      id: 'honestidad',
      titulo: 'Honestidad que se Ve',
      subtitulo: 'Austeridad republicana',
      porQueResuena: 'La desconfianza hacia los politicos es casi universal en Suba. Abelardo se presenta como "el nuevo", pero la gente desconfia de su elite. La austeridad republicana es una prueba tangible.',
      mensajeCentral: 'Mi sueldo y el de mis ministros baja desde el dia 1. Y si alguien roba en mi gobierno, caiga quien caiga.',
      propuestas: [
        'Reduccion concreta de sueldos presidenciales y ministeriales desde el primer dia',
        'Cero lujos, cero viajes innecesarios. Todo ahorro va a los siete programas de bienestar',
        'Pacto Fiscal: lucha contra macrocorrupcion como fuente de financiacion del gasto social',
        'Autocritica honesta: reconocer errores genera mas confianza que negarlos',
      ],
      color: 'orange',
    },
    {
      id: 'respeto',
      titulo: 'Respeto por el Esfuerzo',
      subtitulo: 'La clase trabajadora no es invisible',
      porQueResuena: 'La gente de Suba se siente ignorada por la elite politica. Quiere que alguien reconozca su esfuerzo diario. Abelardo representa la elite; Cepeda debe representar al que se levanta temprano.',
      mensajeCentral: 'Usted no es invisible. Su trabajo diario es lo que sostiene este pais.',
      propuestas: [
        'Trayectoria de Cepeda: defensor de derechos humanos, hijo de senador asesinado, acompanante de comunidades populares durante decadas',
        'Pacto Social: formalizacion laboral, Sistema Nacional del Cuidado que reconoce el trabajo de las mujeres',
        'Pacto Productivo: las economias populares y campesinas seran actores centrales, no marginales',
      ],
      color: 'purple',
    },
    {
      id: 'esperanza',
      titulo: 'Esperanza Concreta',
      subtitulo: 'No esloganes: siete programas',
      porQueResuena: 'La gente de Suba esta cansada de promesas vacias. Voto por el cambio en 2022 y siente que no vio resultados concretos en su barrio. Necesita propuestas medibles.',
      mensajeCentral: 'Le digo concretamente que voy a hacer: siete programas de bienestar que se sienten desde el primer dia.',
      propuestas: [
        '4,2 millones de adultos mayores protegidos con Colombia Mayor',
        '800 mil a $1 millon mensual para jovenes que estudian con Renta Joven',
        '1,6 millones de familias con Renta Ciudadana y credito productivo',
        '400 mil personas con discapacidad protegidas',
        '5.000 lideres sociales con remuneracion digna',
        '$6-6,5 billones redirigidos a comprarle directamente a los campesinos',
        '2 millones de estudiantes con kits escolares gratuitos',
      ],
      color: 'pink',
    },
  ],

  // 7. Lineas de Mensaje
  lineasMensaje: [
    {
      id: 'seguridad',
      tematica: 'SEGURIDAD: "Tranquilidad sin miedo"',
      frases: [
        'Yo tambien tengo miedo cuando mi familia sale a la calle. Pero el miedo no se quita con represion: se quita con inteligencia y oportunidades.',
        'En vez de megacarceles que no resuelven nada, vamos a darle empleo y educacion a los jovenes del barrio. Eso es seguridad que funciona.',
        'El comerciante del barrio no debe pagar vacuna. Vamos a usar tecnologia para atrapar a los extorsionistas y proteger su negocio.',
      ],
    },
    {
      id: 'economia',
      tematica: 'ECONOMIA: "La plata debe alcanzar"',
      frases: [
        'Usted no quiere que le regalen nada. Quiere que su trabajo pague lo suficiente para pagar el arriendo, llevar comida a la casa y dormir tranquilo. Eso es lo justo.',
        'El salario vital no es un subsidio: es el piso digno para quien trabaja. Vamos a defenderlo y aumentarlo con productividad real.',
        'Su negocio pequeno es el motor del barrio. Con el Pacto Productivo, va a tener acceso a credito justo y puede ser contratista del Estado.',
      ],
    },
    {
      id: 'honestidad',
      tematica: 'HONESTIDAD: "Mi sueldo baja, no el suyo"',
      frases: [
        'Desde el primer dia de mi gobierno, mi sueldo y el de mis ministros baja. No habra lujos, no habra viajes innecesarios. Todo lo que se ahorre va a los siete programas de bienestar.',
        'Reconozco que en nuestro gobierno hubo errores. Pero yo no voy a mirar para otro lado: quien robe en mi gobierno paga, aunque sea de mi propio equipo.',
        'Abelardo dice que va a achicar el Estado. Sabe que significa? Menos plata para el colegio de sus hijos, menos medicos en su hospital, mas dinero para los bancos de sus amigos.',
      ],
    },
    {
      id: 'servicios',
      tematica: 'SERVICIOS PUBLICOS: "El Estado que cuida"',
      frases: [
        'No voy a dejar que cierren el hospital de su localidad ni que saquen medicos del centro de salud. La salud es un derecho, no un negocio.',
        'Su hijo merece ir a un colegio publico bueno, con utiles escolares garantizados. Vamos a entregar kits escolares a 2 millones de estudiantes.',
        'Las mujeres de Suba que trabajan y cuidan merecen descanso. Vamos a crear guarderias publicas y centros de cuidado que les devuelvan tiempo y dignidad.',
      ],
    },
    {
      id: 'movilidad',
      tematica: 'MOVILIDAD: "Llegar seguro a casa"',
      frases: [
        'Ninguna mujer deberia tener miedo de subirse al TransMilenio. Vamos a poner mas seguridad en el transporte, mas iluminacion en las paradas, mas presencia policial inteligente.',
        'El transporte publico no puede ser una trampa diaria. Vamos a recuperarlo como un servicio digno: limpio, seguro, puntual.',
      ],
    },
    {
      id: 'contraste',
      tematica: 'CONTRASTE CON ABELARDO: "Conozcalo antes de votar"',
      frases: [
        'Abelardo propone recortar el Estado en un 40%. Sabe cuantos colegios cierran con eso? Sabe cuantos hospitales dejan de atender? El no lo siente: su familia no usa el hospital publico.',
        'Abelardo quiere megacarceles tipo Bukele. Sabe lo que pasa en esas carceles? Violacion sistematica de derechos humanos. Eso no es seguridad: es venganza que no resuelve nada.',
        'Abelardo promete casa propia con credito al 2%. Suena bonito, pero quien le da credito a quien gana el minimo? La promesa suena, la realidad duele.',
        'Abelardo habla de mano dura, pero se olvida de las causas. Si un joven no tiene empleo ni educacion, termina en una banda. No lo resuelve la carcel: lo resuelve la oportunidad.',
      ],
    },
  ],

  // 8. Comunicacion
  comunicacionEvitar: [
    { evitar: 'Revolucion / transformacion historica / cambio estructural', porQue: 'Suena a grandilocuencia abstracta. La gente quiere resultados concretos, no esloganes.', decir: 'Mejoras concretas / siete programas que se sienten / cambios que se ven en el barrio' },
    { evitar: 'Lucha de clases / acabar con los ricos / redistribucion', porQue: 'La clase media no se siente rica ni pobre. Se siente trabajadora. El lenguaje de confrontacion la aleja.', decir: 'Quien trabaja dignamente merece estabilidad / el esfuerzo debe ser respetado' },
    { evitar: 'Paz total / dialogo con todos los actores armados', porQue: 'Suena a negociacion con criminales. La gente quiere orden, no conversaciones que no entiende.', decir: 'Seguridad inteligente / prevencion que funciona / proteccion a las familias' },
    { evitar: 'Golpe al capital / empresarios explotadores / acabar propiedad privada', porQue: 'Muchos aspiran a tener negocio propio. El discurso antiempresarial los hace sentir atacados.', decir: 'Apoyo al pequeno comercio / proteccion al que emprende / control a los abusivos' },
    { evitar: 'Estado omnipresente / planificacion central / control de precios', porQue: 'La gente desconfia de un Estado que "todo lo controla". Quiere servicios eficientes.', decir: 'Estado eficiente que responde / servicios que llegan / menos filas, mas resultados' },
    { evitar: 'Comunismo / socialismo / etiquetas ideologicas', porQue: 'La gente de Suba no se identifica con estas etiquetas. Las asocia con autoritarismo.', decir: 'Justicia social / equidad / dignidad para quien trabaja' },
    { evitar: 'Criticar a la iglesia o valores tradicionales familiares', porQue: 'Muchas familias son creyentes y conservadoras en lo cultural. Respetan la familia como nucleo.', decir: 'La familia es lo primero / proteccion a los ninos y adultos mayores / valores de respeto' },
    { evitar: 'Todos los policias son violentos / desmontar la Fuerza Publica', porQue: 'La gente quiere mas y mejor policia, no menos. Quiere confianza, no confrontacion.', decir: 'Dignificar a los policias para que dignifiquen su trabajo / policia cercana, no represiva' },
    { evitar: 'El cambio perfecto / nuestro gobierno no ha tenido errores', porQue: 'La gente sabe que ha habido errores. Negarlo suena a cinismo o ceguera.', decir: 'Reconocemos errores y los corregimos / la autocritica es senal de honestidad' },
    { evitar: 'Solo hablar de campesinos y territorios rurales', porQue: 'El votante de Suba es urbano. Si solo se habla del campo, siente que no le hablan a el.', decir: 'Los mercados campesinos traen comida barata a su barrio' },
  ],

  comunicacionTono: [
    'Hablar como la gente, no como el politico: frases cortas, vocabulario cotidiano, ejemplos concretos del barrio',
    'Respeto, nunca arrogancia: hablarle como a un igual que tiene problemas reales',
    'Autocritica, no autocomplacencia: reconocer errores genera mas confianza que negarlos',
    'Datos concretos, no abstracciones: "4,2 millones de adultos mayores protegidos" en vez de "vamos a mejorar la seguridad"',
    'Emocion controlada, no gritos: la calma transmite mas autoridad que el grito',
    'Escucha activa: "entiendo su preocupacion", "se lo que siente" antes de proponer',
    'Contraste sin odio: diferenciar de Abelardo sin insultar, mostrando lo que sus propuestas significan',
    'Identificacion territorial: mencionar Suba, "su barrio", "su conjunto", "su tienda"',
    'Promesas medibles: "en mi primer ano vamos a reducir hurtos con prevencion"',
    '"Usted" antes que "yo": el mensaje gira en torno a las necesidades del elector',
  ],

  // 9. Canales
  canales: [
    { nombre: 'WHATSAPP', formato: 'Audios 1-2 min con voz del candidato. Videos 30-60 seg. Infografias con datos.', contenido: 'Testimonios de beneficiarios. Videos explicando cada programa. Comparativas sueldos presidenciales.', tono: 'Conversacional, directo, como hablandole a un vecino', frecuencia: 'Diaria, sin saturar. Un mensaje relevante vale mas que diez repetidos' },
    { nombre: 'FACEBOOK', formato: 'Videos 2-3 min. Lives desde barrios. Posts con fotos de recorridos.', contenido: 'Explicaciones detalladas de los siete programas. Comparativas Cepeda vs Abelardo. Testimonios de comerciantes.', tono: 'Informativo pero cercano. Responder comentarios personalmente', frecuencia: 'Regular, con contenido que invite a compartir' },
    { nombre: 'INSTAGRAM', formato: 'Reels 15-30 seg. Stories con encuestas. Carruseles explicativos.', contenido: 'Acuerdo Digital, formacion programacion e IA, Renta Joven, comparativas visuales.', tono: 'Moderno, agil, sin perder seriedad', frecuencia: 'Diaria en stories, 3-4 posts semanales' },
    { nombre: 'TIKTOK', formato: 'Videos 15-60 seg. Tendencias adaptadas. Respuestas a comentarios en video.', contenido: 'Mitos vs realidades. "Lo que Abelardo no quiere que sepas". Datos cortos de los siete programas.', tono: 'Natural, autentico, sin sobreproducir', frecuencia: 'Diaria, aprovechando tendencias' },
    { nombre: 'MEDIOS TRADICIONALES', formato: 'Entrevistas 5-10 min. Columnas de opinion. Comunicados con datos.', contenido: 'Propuestas concretas para Suba. Cronograma de visitas. Compromisos medibles.', tono: 'Serio, respetuoso, sin atacar a contrincantes', frecuencia: 'Semanal, con presencia constante' },
    { nombre: 'EVENTOS PRESENCIALES', formato: 'Recorridos a pie por conjuntos. Reuniones en salones comunitarios. Escucha activa.', contenido: 'Escuchar primero, proponer despues. Hojas con los siete programas explicados.', tono: 'Humilde, cercano, sin seguridad ostentosa', frecuencia: 'Constante: el candidato debe caminar Suba, no solo visitarla en caravana' },
  ],

  // 10. Conclusiones
  conclusiones: [
    'El votante de Suba no es de derecha ni de izquierda: es de clase media trabajadora, asustada y persuadible. Las "zonas naranjas" concentran personas que votaron por el cambio en 2022 y se desplazaron por desencanto, no por conviccion ideologica.',
    'El nuevo plan de gobierno tiene las respuestas, y son mas concretas que nunca. Los siete programas de bienestar social son la piedra angular del mensaje para Suba. Deben comunicarse como promesas medibles, no como abstracciones.',
    'Los cinco ejes del mensaje son: tranquilidad inteligente, estabilidad economica con siete programas, honestidad visible, respeto al esfuerzo y esperanza concreta.',
    'El contraste con Abelardo debe ser informativo, no agresivo. La gente de Suba valora el orden y siente alivio con su mensaje. Se le debe mostrar que hay otra forma de seguridad, mas inteligente y menos costosa.',
    'La autocritica es una fortaleza, no una debilidad. Reconocer errores del gobierno actual genera mas confianza que negarlos. El electorado de Suba castiga mas la hipocresia que el error.',
    'La austeridad republicana es la prueba de fuego. Reducir sueldos del gobierno desde el primer dia es el gesto mas poderoso de credibilidad.',
    'El Sistema Nacional del Cuidado es un mensaje poderoso para las mujeres de Suba. La promesa de guarderias publicas conecta directamente con su realidad diaria.',
    'El Acuerdo Digital y la formacion en programacion/IA resuenan con los jovenes de Suba. Es un mensaje de futuro y empleo.',
    'El canal es el mensaje: WhatsApp para audios cortos, Facebook para adultos, Instagram/TikTok para jovenes, prensa barrial para posicionamiento serio.',
    'El candidato debe caminar Suba, no solo visitarla. La presencia fisica caminando a pie, sin caravana, es el mensaje mas poderoso.',
  ],

  // 11. Lenguaje
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

  // 12. Reglas de Oro (Manual de Mensajes)
  reglasDeOro: [
    { numero: 1, titulo: 'Siempre hablamos de propuestas, no de personas', descripcion: 'La gente no quiere ver peleas politicas. Quiere saber que se va a hacer por su barrio, por su familia, por su futuro. Las propuestas concretas son nuestra fortaleza: los siete programas de bienestar, la seguridad inteligente, la austeridad republicana. Cuando hablamos de propuestas, ganamos.' },
    { numero: 2, titulo: 'No criticamos a otros precandidatos ni candidatos', descripcion: 'El contraste es informativo, no agresivo. Mostramos las diferencias con hechos y datos, no con insultos ni descalificaciones. La gente de Suba valora el respeto. Si atacamos, nos igualamos a lo que critican. Si proponemos, nos diferenciamos.' },
    { numero: 3, titulo: 'Defendemos el campo', descripcion: 'La Alianza Nacional Alimentaria, los mercados campesinos, las compras publicas al campo: todo esto trae comida fresca y barata a los barrios urbanos. Defendemos al campesino porque tambien defendemos el bolsillo de la familia de Suba.' },
    { numero: 4, titulo: 'Empezamos por lo emotivo', descripcion: 'Antes de explicar un programa, conectamos con el sentimiento. "Se que le preocupa la inseguridad", "Entiendo que la plata no alcanza". Cuando la gente siente que la entendemos, abre la puerta a escuchar las propuestas.' },
    { numero: 5, titulo: 'Resaltamos el trabajo comunitario', descripcion: 'El trabajo de las Juntas de Accion Comunal, los lideres de barrio, las organizaciones locales: eso es lo que sostiene los territorios. Resaltamos a quienes trabajan en su comunidad porque ellos son el verdadero cambio.' },
    { numero: 6, titulo: 'Desde lo territorial y local', descripcion: 'No hablamos de Colombia como abstraccion. Hablamos de Suba, de su conjunto residencial, de su tienda, de su TransMilenio. Cada mensaje debe sentirse como si fuera hecho para ese barrio especifico.' },
    { numero: 7, titulo: 'Somos especialistas en conectar con las emociones de las personas', descripcion: 'No somos una maquina de sloganes. Somos personas hablando con personas. Usamos historias reales, ejemplos concretos, palabras que lleguen al corazon. La emocion bien usada construye confianza.' },
    { numero: 8, titulo: 'Hacemos pedagogia politica', descripcion: 'Explicamos por que las cosas pasan y como las vamos a cambiar. No damos ordenes ni promesas vacias. Educamos sobre la politica porque un elector informado es un elector que vota con conviccion.' },
    { numero: 9, titulo: 'La pedagogia del miedo no es nuestra estrategia', descripcion: 'No ganamos asustando. No usamos el miedo como herramienta electoral. Ofrecemos esperanza con base en propuestas reales. El votante de Suba ya tiene suficientes miedos: lo que necesita son soluciones.' },
    { numero: 10, titulo: 'La unidad: el enfasis de nuestra estrategia', descripcion: 'Hablamos de "nosotros", no de "yo". De construir pais entre todos, no de salvadores individuales. La unidad es nuestra fuerza: unidad del campo y la ciudad, del joven y el adulto mayor, de todas las regiones.' },
  ],

  // Documento
  pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
};

// ==================== HOOK ====================

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
      ejes: [...prev.ejes, { id: `eje-${Date.now()}`, titulo: '', subtitulo: '', porQueResuena: '', mensajeCentral: '', propuestas: [], color: 'cyan' }],
    }));
  }, []);

  const removeEje = useCallback((index: number) => {
    setData((prev) => ({ ...prev, ejes: prev.ejes.filter((_, i) => i !== index) }));
  }, []);

  const updateLineaMensaje = useCallback((index: number, linea: LineaMensaje) => {
    setData((prev) => {
      const lineasMensaje = [...prev.lineasMensaje];
      lineasMensaje[index] = linea;
      return { ...prev, lineasMensaje };
    });
  }, []);

  const addLineaMensaje = useCallback(() => {
    setData((prev) => ({
      ...prev,
      lineasMensaje: [...prev.lineasMensaje, { id: `lm-${Date.now()}`, tematica: '', frases: [] }],
    }));
  }, []);

  const removeLineaMensaje = useCallback((index: number) => {
    setData((prev) => ({ ...prev, lineasMensaje: prev.lineasMensaje.filter((_, i) => i !== index) }));
  }, []);

  const updateCruce = useCallback((index: number, cruce: CruceEstrategico) => {
    setData((prev) => {
      const cruces = [...prev.cruces];
      cruces[index] = cruce;
      return { ...prev, cruces };
    });
  }, []);

  const addCruce = useCallback(() => {
    setData((prev) => ({
      ...prev,
      cruces: [...prev.cruces, { dolor: '', propuesta: '', mensaje: '' }],
    }));
  }, []);

  const removeCruce = useCallback((index: number) => {
    setData((prev) => ({ ...prev, cruces: prev.cruces.filter((_, i) => i !== index) }));
  }, []);

  const resetDefaults = useCallback(() => {
    setData(DEFAULT_DATA);
  }, []);

  return {
    data,
    updateData,
    updateEje,
    addEje,
    removeEje,
    updateLineaMensaje,
    addLineaMensaje,
    removeLineaMensaje,
    updateCruce,
    addCruce,
    removeCruce,
    resetDefaults,
  };
}
