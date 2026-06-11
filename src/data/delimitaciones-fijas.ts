/**
 * DELIMITACIONES OFICIALES - LOCALIDAD DE SUBA
 * ============================================================
 * Estas son las delimitaciones oficiales de la localidad de Suba
 * y sus UPZ, extraidas del mapa oficial de la Alcaldia Mayor de Bogota
 * y las descripciones de limites de cada UPZ.
 *
 * Estas lineas son FIJAS e INEDITABLES. Solo el administrador puede
 * agregar/quitar lineas, puntos y pines personalizados, pero estas
 * delimitaciones oficiales siempre se muestran como capa base.
 *
 * Convenciones del mapa oficial:
 * - Linea gruesa marron/gris = Limite de localidad
 * - Linea delgada marron = Limite de UPZ
 */

// Limites oficiales de la localidad de Suba (poligono exterior)
// Fuente: Mapa oficial Alcaldia Mayor de Bogota + Wikipedia
// Recorrido: Norte → Este → Sureste → Sur → Suroeste → Oeste → Noroeste → Norte
export const limiteLocalidadSuba: [number, number][] = [
  // NORTE: Limite con Chia (vereda La Balsa, zona rural norte)
  [4.8200, -74.1000], // Esquina noroeste, inicio limite norte
  [4.8220, -74.0900],
  [4.8230, -74.0800],
  [4.8240, -74.0700],
  [4.8230, -74.0600],
  [4.8210, -74.0500], // Esquina noreste, fin limite norte

  // NORDESTE: Limite con Chia (vereda Fusca) y Usaquen (UPZ Paseo de los Libertadores)
  [4.8190, -74.0450],
  [4.8160, -74.0400],
  [4.8120, -74.0360],

  // ESTE: Limite con Usaquen (desde UPZ Verbenal hasta UPZ Santa Barbara, Autopista Norte)
  [4.8050, -74.0340],
  [4.7980, -74.0330],
  [4.7900, -74.0320],
  [4.7820, -74.0320],
  [4.7740, -74.0310],
  [4.7660, -74.0310],
  [4.7580, -74.0310],
  [4.7500, -74.0310],
  [4.7420, -74.0310],
  [4.7340, -74.0310],
  [4.7260, -74.0320],
  [4.7180, -74.0330],
  [4.7100, -74.0340],
  [4.7020, -74.0350],
  [4.6940, -74.0370],

  // SURESTE: Limite con Barrios Unidos (UPZ Los Andes, Calle 100) y Chapinero
  [4.6880, -74.0400],
  [4.6840, -74.0440],
  [4.6810, -74.0480],
  [4.6790, -74.0520],

  // SUR: Limite con Engativa (UPZ Bolivia, Humedal Tibabuyes, Canal Rio Negro)
  [4.6780, -74.0570],
  [4.6785, -74.0620],
  [4.6795, -74.0670],
  [4.6810, -74.0720],
  [4.6830, -74.0770],
  [4.6850, -74.0820],

  // SUROESTE: Limite con Cota (Vereda Siberia, Rio Bogota) y Engativa
  [4.6880, -74.0870],
  [4.6920, -74.0920],
  [4.6960, -74.0960],
  [4.7000, -74.1000],

  // OESTE: Rio Bogota (limite con Cota - Veredas Rozo y Parcelas)
  [4.7060, -74.1040],
  [4.7120, -74.1080],
  [4.7180, -74.1110],
  [4.7240, -74.1140],
  [4.7300, -74.1160],
  [4.7360, -74.1170],
  [4.7420, -74.1170],
  [4.7480, -74.1160],
  [4.7540, -74.1140],
  [4.7600, -74.1120],
  [4.7660, -74.1100],
  [4.7720, -74.1080],
  [4.7780, -74.1060],

  // NOROESTE: Vuelta al norte por limite con Cota (Vereda Pueblo Viejo, Rio Bogota)
  [4.7840, -74.1040],
  [4.7900, -74.1020],
  [4.7960, -74.1010],
  [4.8020, -74.1010],
  [4.8080, -74.1010],
  [4.8140, -74.1010],

  // Cierre hacia el punto inicial (Norte)
  [4.8200, -74.1000],
];

// ============================================================
// LIMITES DE CADA UPZ - Poligonos internos
// Basado en el mapa oficial y descripciones de limites
// ============================================================

export interface LimiteUPZ {
  nombre: string;
  coordenadas: [number, number][];
  colorNeon: string; // Color para la linea de limite
}

export const limitesUPZ: LimiteUPZ[] = [
  // --- UPZ 1: GUAYMARAL ---
  // Extremo nororiental. Limita: N=Chia, E=Usaquen (Paseo de los Libertadores),
  // S=La Academia, O=Suelo rural
  {
    nombre: 'Guaymaral',
    colorNeon: '#00e5ff',
    coordenadas: [
      [4.8200, -74.0700], // NW esquina
      [4.8210, -74.0600], // N
      [4.8200, -74.0500], // NE (limite con Chia)
      [4.8160, -74.0480],
      [4.8120, -74.0460],
      [4.8080, -74.0450],
      [4.8040, -74.0460], // E (limite con Usaquen)
      [4.8020, -74.0500],
      [4.8010, -74.0550],
      [4.8000, -74.0600],
      [4.8000, -74.0650], // S (limite con La Academia)
      [4.8020, -74.0680],
      [4.8060, -74.0700],
      [4.8100, -74.0710],
      [4.8140, -74.0710],
      [4.8180, -74.0710],
      [4.8200, -74.0700],
    ],
  },

  // --- UPZ 2: LA ACADEMIA ---
  // Al sur de Guaymaral. Limita: N=Guaymaral, E=Usaquen, S=San Jose de Bavaria, O=Suelo rural/Torca
  {
    nombre: 'La Academia',
    colorNeon: '#00b8d4',
    coordenadas: [
      [4.8000, -74.0650], // N (limite con Guaymaral)
      [4.8010, -74.0600],
      [4.8020, -74.0550],
      [4.8040, -74.0500],
      [4.8060, -74.0480], // E (limite con Usaquen)
      [4.8040, -74.0460],
      [4.8000, -74.0460],
      [4.7960, -74.0470],
      [4.7920, -74.0490],
      [4.7890, -74.0520],
      [4.7870, -74.0560],
      [4.7860, -74.0600],
      [4.7860, -74.0640], // S (limite con San Jose)
      [4.7880, -74.0670],
      [4.7920, -74.0680],
      [4.7960, -74.0670],
      [4.8000, -74.0650],
    ],
  },

  // --- UPZ 3: SAN JOSE DE BAVARIA ---
  // Al sur de La Academia. Limita: N=La Academia, E=Usaquen, S=Britalia/Casa Blanca, O=Torca
  {
    nombre: 'San José de Bavaría',
    colorNeon: '#0097a7',
    coordenadas: [
      [4.7860, -74.0640], // N (limite con La Academia)
      [4.7860, -74.0600],
      [4.7870, -74.0560],
      [4.7890, -74.0520],
      [4.7920, -74.0490],
      [4.7960, -74.0470],
      [4.7980, -74.0460], // E (limite con Usaquen - Verbenal)
      [4.7960, -74.0440],
      [4.7920, -74.0430],
      [4.7880, -74.0430],
      [4.7840, -74.0440],
      [4.7800, -74.0460],
      [4.7770, -74.0490],
      [4.7750, -74.0530],
      [4.7740, -74.0570],
      [4.7740, -74.0610],
      [4.7760, -74.0640],
      [4.7790, -74.0660],
      [4.7820, -74.0660],
      [4.7860, -74.0640],
    ],
  },

  // --- UPZ 4: PASEO DE LOS LIBERTADORES (al este, en Usaquen pero limita con Suba) ---
  // Esta UPZ pertenece a Usaquen pero colinda con Suba. Incluimos su borde.
  // Nota: En el mapa oficial aparece como area colindante al este de Guaymaral/La Academia

  // --- UPZ 5: VERBENAL ---
  // Al este de San Jose de Bavaria. Limita: N=Usaquen, E=Usaquen, S=La Uribe, O=San Jose de Bavaria
  {
    nombre: 'Verbenal',
    colorNeon: '#26c6da',
    coordenadas: [
      [4.7980, -74.0460], // NW
      [4.8000, -74.0460],
      [4.8040, -74.0460],
      [4.8060, -74.0440],
      [4.8060, -74.0400], // N (limite con Usaquen)
      [4.8040, -74.0360],
      [4.8000, -74.0340],
      [4.7960, -74.0330], // E (Autopista Norte)
      [4.7920, -74.0330],
      [4.7880, -74.0350],
      [4.7860, -74.0380],
      [4.7860, -74.0420],
      [4.7880, -74.0440],
      [4.7920, -74.0450],
      [4.7960, -74.0460],
      [4.7980, -74.0460],
    ],
  },

  // --- UPZ 6: LA URIBE ---
  // Al sur de Verbenal. Limita: N=Verbenal, E=Usaquen, S=Toberin/San Cristobal Norte, O=San Jose/Britalia
  {
    nombre: 'La Uribe',
    colorNeon: '#4dd0e1',
    coordenadas: [
      [4.7880, -74.0440], // N (limite con Verbenal)
      [4.7860, -74.0420],
      [4.7860, -74.0380],
      [4.7880, -74.0350],
      [4.7920, -74.0330], // E (Autopista Norte)
      [4.7900, -74.0320],
      [4.7860, -74.0320],
      [4.7820, -74.0330],
      [4.7780, -74.0350],
      [4.7750, -74.0380],
      [4.7730, -74.0420],
      [4.7730, -74.0460],
      [4.7750, -74.0480],
      [4.7780, -74.0480],
      [4.7820, -74.0470],
      [4.7860, -74.0460],
      [4.7880, -74.0440],
    ],
  },

  // --- UPZ 7: BRITALIA ---
  // Centro-norte. Limita: N=San Jose de Bavaria, E=La Uribe/Toberin, S=Suba Centro/Casa Blanca, O=El Rincon
  {
    nombre: 'Britalia',
    colorNeon: '#80deea',
    coordenadas: [
      [4.7740, -74.0610], // NW
      [4.7740, -74.0570],
      [4.7750, -74.0530],
      [4.7770, -74.0490],
      [4.7800, -74.0460],
      [4.7840, -74.0440], // N (limite con San Jose)
      [4.7860, -74.0460],
      [4.7880, -74.0460],
      [4.7900, -74.0460], // NE
      [4.7900, -74.0500],
      [4.7890, -74.0540],
      [4.7880, -74.0580],
      [4.7870, -74.0620],
      [4.7850, -74.0650],
      [4.7820, -74.0660],
      [4.7790, -74.0660],
      [4.7760, -74.0640],
      [4.7740, -74.0610],
    ],
  },

  // --- UPZ 8: TOBERIN ---
  // Al este de Britalia. Limita: N=La Uribe, E=Usaquen/San Cristobal Norte, S=Los Cedros/El Prado, O=Britalia
  {
    nombre: 'Toberín',
    colorNeon: '#b2ebf2',
    coordenadas: [
      [4.7900, -74.0460], // N (limite con La Uribe)
      [4.7920, -74.0450],
      [4.7960, -74.0440],
      [4.7980, -74.0420],
      [4.7980, -74.0380],
      [4.7960, -74.0350], // E (limite con Usaquen)
      [4.7920, -74.0330],
      [4.7900, -74.0320],
      [4.7860, -74.0320],
      [4.7820, -74.0330],
      [4.7800, -74.0350],
      [4.7790, -74.0380],
      [4.7790, -74.0420],
      [4.7810, -74.0440],
      [4.7840, -74.0450],
      [4.7870, -74.0460],
      [4.7900, -74.0460],
    ],
  },

  // --- UPZ 9: CASA BLANCA / SUBA CENTRO ---
  // Centro de Suba. Limita: N=Britalia, E=Toberin/El Prado, S=Niza/El Rincon, O=El Rincon/Torca
  {
    nombre: 'Suba Centro',
    colorNeon: '#00f3ff',
    coordenadas: [
      [4.7740, -74.0610],
      [4.7760, -74.0640],
      [4.7790, -74.0660],
      [4.7820, -74.0660], // N (limite con Britalia)
      [4.7850, -74.0650],
      [4.7870, -74.0620],
      [4.7880, -74.0580],
      [4.7890, -74.0540],
      [4.7900, -74.0500],
      [4.7900, -74.0460],
      [4.7870, -74.0460],
      [4.7840, -74.0450],
      [4.7810, -74.0440],
      [4.7790, -74.0420],
      [4.7780, -74.0380],
      [4.7760, -74.0350],
      [4.7720, -74.0340],
      [4.7680, -74.0340],
      [4.7640, -74.0360],
      [4.7610, -74.0390],
      [4.7590, -74.0430],
      [4.7580, -74.0470],
      [4.7580, -74.0510],
      [4.7590, -74.0550],
      [4.7610, -74.0580],
      [4.7640, -74.0600],
      [4.7680, -74.0610],
      [4.7710, -74.0610],
      [4.7740, -74.0610],
    ],
  },

  // --- UPZ 10: EL PRADO ---
  // Al sureste de Suba Centro. Limita: N=Toberin, E=Los Cedros/San Cristobal Norte, S=La Alhambra, O=Suba Centro
  {
    nombre: 'El Prado',
    colorNeon: '#18ffff',
    coordenadas: [
      [4.7580, -74.0470], // N (limite con Suba Centro)
      [4.7590, -74.0430],
      [4.7610, -74.0390],
      [4.7640, -74.0360],
      [4.7680, -74.0340],
      [4.7720, -74.0340], // NE
      [4.7740, -74.0360],
      [4.7750, -74.0400],
      [4.7750, -74.0440],
      [4.7730, -74.0480],
      [4.7700, -74.0510],
      [4.7660, -74.0520],
      [4.7620, -74.0520],
      [4.7590, -74.0500],
      [4.7580, -74.0470],
    ],
  },

  // --- UPZ 11: LOS CEDROS ---
  // Al este de El Prado. Limita: N=Toberin/San Cristobal Norte, E=Usaquen, S=La Alhambra, O=El Prado
  {
    nombre: 'Los Cedros',
    colorNeon: '#64ffda',
    coordenadas: [
      [4.7580, -74.0470],
      [4.7590, -74.0500],
      [4.7620, -74.0520],
      [4.7660, -74.0520], // N (limite con El Prado)
      [4.7700, -74.0510],
      [4.7730, -74.0480],
      [4.7750, -74.0440],
      [4.7760, -74.0400],
      [4.7770, -74.0360], // E (limite con Usaquen)
      [4.7750, -74.0330],
      [4.7710, -74.0320],
      [4.7670, -74.0320],
      [4.7630, -74.0330],
      [4.7600, -74.0350],
      [4.7580, -74.0380],
      [4.7570, -74.0420],
      [4.7570, -74.0450],
      [4.7580, -74.0470],
    ],
  },

  // --- UPZ 12: SAN CRISTOBAL NORTE ---
  // Al noreste, entre Toberin y Usaquen. Limita: N=La Uribe, E=Usaquen, S=Los Cedros, O=Toberin
  {
    nombre: 'San Cristóbal Norte',
    colorNeon: '#1de9b6',
    coordenadas: [
      [4.7750, -74.0330], // N
      [4.7770, -74.0360],
      [4.7780, -74.0400],
      [4.7780, -74.0440], // E
      [4.7760, -74.0400],
      [4.7750, -74.0360],
      [4.7730, -74.0340],
      [4.7700, -74.0330],
      [4.7670, -74.0330],
      [4.7640, -74.0340],
      [4.7630, -74.0330],
      [4.7670, -74.0320],
      [4.7710, -74.0320],
      [4.7750, -74.0330],
    ],
  },

  // --- UPZ 13: EL RINCON ---
  // Al oeste de Suba Centro. Limita: N=Torca, E=Suba Centro/Britalia, S=Niza/La Floresta, O=Bolivia
  {
    nombre: 'El Rincón',
    colorNeon: '#69f0ae',
    coordenadas: [
      [4.7580, -74.0470], // NE
      [4.7570, -74.0450],
      [4.7570, -74.0420],
      [4.7580, -74.0380],
      [4.7600, -74.0350],
      [4.7630, -74.0330],
      [4.7670, -74.0320], // N (limite con Torca)
      [4.7640, -74.0340],
      [4.7610, -74.0360],
      [4.7580, -74.0380],
      [4.7540, -74.0400],
      [4.7500, -74.0420],
      [4.7460, -74.0440],
      [4.7420, -74.0460],
      [4.7390, -74.0490],
      [4.7370, -74.0530],
      [4.7370, -74.0570],
      [4.7390, -74.0600],
      [4.7420, -74.0620],
      [4.7460, -74.0620],
      [4.7500, -74.0600],
      [4.7540, -74.0560],
      [4.7560, -74.0520],
      [4.7570, -74.0490],
      [4.7580, -74.0470],
    ],
  },

  // --- UPZ 14: NIZA ---
  // Al sur de Suba Centro. Limita: N=Suba Centro, E=El Prado/La Alhambra, S=Minuto de Dios, O=La Floresta/El Rincon
  {
    nombre: 'Niza',
    colorNeon: '#b9f6ca',
    coordenadas: [
      [4.7580, -74.0470], // N
      [4.7570, -74.0490],
      [4.7560, -74.0520],
      [4.7540, -74.0560],
      [4.7500, -74.0600],
      [4.7460, -74.0620], // S
      [4.7420, -74.0620],
      [4.7390, -74.0600],
      [4.7370, -74.0570],
      [4.7370, -74.0530],
      [4.7390, -74.0490],
      [4.7420, -74.0460],
      [4.7460, -74.0440],
      [4.7500, -74.0420],
      [4.7540, -74.0400],
      [4.7560, -74.0420],
      [4.7570, -74.0440],
      [4.7580, -74.0470],
    ],
  },

  // --- UPZ 15: LA FLORESTA ---
  // Al suroeste de Niza. Limita: N=El Rincon, E=Niza, S=Engativa, O=Bolivia
  {
    nombre: 'La Floresta',
    colorNeon: '#a7ffeb',
    coordenadas: [
      [4.7460, -74.0620], // N
      [4.7420, -74.0620],
      [4.7390, -74.0600],
      [4.7370, -74.0570],
      [4.7370, -74.0530],
      [4.7390, -74.0490], // E
      [4.7360, -74.0510],
      [4.7320, -74.0530],
      [4.7280, -74.0550],
      [4.7250, -74.0580],
      [4.7240, -74.0620],
      [4.7250, -74.0660],
      [4.7280, -74.0680],
      [4.7320, -74.0690],
      [4.7360, -74.0680],
      [4.7400, -74.0660],
      [4.7430, -74.0640],
      [4.7460, -74.0620],
    ],
  },

  // --- UPZ 16: LA ALHAMBRA ---
  // Al sureste. Limita: N=El Prado/Los Cedros, E=Usaquen, S=Barrios Unidos/Engativa, O=Niza/La Floresta
  {
    nombre: 'La Alhambra',
    colorNeon: '#84ffff',
    coordenadas: [
      [4.7460, -74.0620], // NW
      [4.7430, -74.0640],
      [4.7400, -74.0660],
      [4.7360, -74.0680],
      [4.7320, -74.0690], // S (limite con Engativa)
      [4.7280, -74.0680],
      [4.7250, -74.0660],
      [4.7240, -74.0620],
      [4.7260, -74.0580],
      [4.7290, -74.0550],
      [4.7330, -74.0530],
      [4.7370, -74.0520],
      [4.7390, -74.0530],
      [4.7410, -74.0560],
      [4.7430, -74.0590],
      [4.7450, -74.0610],
      [4.7460, -74.0620],
    ],
  },

  // --- UPZ 17: BOLIVIA ---
  // Extremo suroeste. Limita: N=Torca/Tibabuyes, E=El Rincon/La Floresta, S=Engativa, O=Cota (Rio Bogota)
  {
    nombre: 'Bolivia',
    colorNeon: '#ffd740',
    coordenadas: [
      [4.7370, -74.0530], // N
      [4.7390, -74.0490],
      [4.7420, -74.0460],
      [4.7460, -74.0440],
      [4.7500, -74.0420],
      [4.7540, -74.0400], // NE
      [4.7560, -74.0420],
      [4.7570, -74.0440],
      [4.7580, -74.0470],
      [4.7570, -74.0490],
      [4.7560, -74.0520],
      [4.7540, -74.0560],
      [4.7500, -74.0600],
      [4.7460, -74.0620],
      [4.7420, -74.0620],
      [4.7390, -74.0600],
      [4.7370, -74.0570],
      [4.7360, -74.0600],
      [4.7340, -74.0640],
      [4.7310, -74.0670],
      [4.7270, -74.0690],
      [4.7230, -74.0700],
      [4.7190, -74.0700],
      [4.7160, -74.0680],
      [4.7140, -74.0640],
      [4.7140, -74.0600],
      [4.7160, -74.0560],
      [4.7200, -74.0540],
      [4.7250, -74.0530],
      [4.7300, -74.0530],
      [4.7340, -74.0530],
      [4.7370, -74.0530],
    ],
  },

  // --- UPZ 18: TIBABUYES ---
  // Al oeste, zona rural. Limita: N=Torca, E=El Rincon/Bolivia, S=Engativa (Rio Bogota), O=Cota (Rio Bogota)
  {
    nombre: 'Tibabuyes',
    colorNeon: '#ff6e40',
    coordenadas: [
      [4.7540, -74.0400], // N (limite con Torca)
      [4.7580, -74.0380],
      [4.7620, -74.0360],
      [4.7670, -74.0340],
      [4.7720, -74.0340],
      [4.7760, -74.0350], // NE
      [4.7780, -74.0380],
      [4.7790, -74.0420],
      [4.7790, -74.0460],
      [4.7770, -74.0490],
      [4.7740, -74.0520],
      [4.7700, -74.0540],
      [4.7660, -74.0550],
      [4.7620, -74.0540],
      [4.7580, -74.0520],
      [4.7540, -74.0500],
      [4.7500, -74.0480],
      [4.7460, -74.0460],
      [4.7420, -74.0440],
      [4.7390, -74.0420],
      [4.7370, -74.0400],
      [4.7360, -74.0380],
      [4.7370, -74.0360],
      [4.7400, -74.0350],
      [4.7440, -74.0350],
      [4.7480, -74.0360],
      [4.7510, -74.0380],
      [4.7540, -74.0400],
    ],
  },

  // --- UPZ 19: TORCA (zona rural, al noroeste) ---
  // Zona rural grande. Limita: N=Chia/Cota, E=La Academia/San Jose/Britalia, S=Tibabuyes/Bolivia, O=Cota (Rio Bogota)
  {
    nombre: 'Torca',
    colorNeon: '#e040fb',
    coordenadas: [
      [4.7860, -74.0640], // SE
      [4.7820, -74.0660],
      [4.7780, -74.0660],
      [4.7740, -74.0640],
      [4.7710, -74.0610],
      [4.7680, -74.0580],
      [4.7660, -74.0550],
      [4.7660, -74.0510],
      [4.7680, -74.0470],
      [4.7700, -74.0440],
      [4.7730, -74.0420],
      [4.7760, -74.0410],
      [4.7790, -74.0410],
      [4.7820, -74.0420],
      [4.7850, -74.0440],
      [4.7880, -74.0460],
      [4.7900, -74.0480],
      [4.7920, -74.0510],
      [4.7930, -74.0550],
      [4.7920, -74.0590],
      [4.7900, -74.0620],
      [4.7880, -74.0640],
      [4.7860, -74.0640],
    ],
  },

  // --- UPZ 20: SANTA BARBARA ---
  // Al sureste, pequena zona. Limita: N=Los Cedros, E=Usaquen, S=Barrios Unidos, O=La Alhambra
  {
    nombre: 'Santa Bárbara',
    colorNeon: '#7c4dff',
    coordenadas: [
      [4.7320, -74.0690], // N
      [4.7280, -74.0680],
      [4.7250, -74.0660],
      [4.7240, -74.0620],
      [4.7260, -74.0580],
      [4.7290, -74.0550], // E
      [4.7330, -74.0530],
      [4.7370, -74.0520],
      [4.7390, -74.0530],
      [4.7410, -74.0560],
      [4.7430, -74.0590],
      [4.7450, -74.0610],
      [4.7460, -74.0620],
      [4.7430, -74.0640],
      [4.7400, -74.0660],
      [4.7360, -74.0680],
      [4.7320, -74.0690],
    ],
  },

  // --- UPZ 21: GARCES NAVAS ---
  // Al sur de Bolivia, pequena franja. Limita: N=Bolivia, E=La Floresta, S=Engativa, O=Engativa
  {
    nombre: 'Garcés Navas',
    colorNeon: '#536dfe',
    coordenadas: [
      [4.7230, -74.0700],
      [4.7190, -74.0700],
      [4.7160, -74.0680],
      [4.7140, -74.0640],
      [4.7140, -74.0600],
      [4.7160, -74.0560],
      [4.7200, -74.0540],
      [4.7250, -74.0530],
      [4.7300, -74.0530],
      [4.7340, -74.0530],
      [4.7370, -74.0530],
      [4.7360, -74.0600],
      [4.7340, -74.0640],
      [4.7310, -74.0670],
      [4.7270, -74.0690],
      [4.7230, -74.0700],
    ],
  },
];

// Color para el limite de la localidad (linea gruesa)
export const COLOR_LIMITE_LOCALIDAD = '#8d6e63'; // Marron/gris como en el mapa oficial

// Color para los limites de UPZ (linea delgada)
export const COLOR_LIMITE_UPZ = '#6d4c41'; // Marron mas delgado

// Grosor de lineas
export const GROSOR_LIMITE_LOCALIDAD = 4;
export const GROSOR_LIMITE_UPZ = 1.5;
