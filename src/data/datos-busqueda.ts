import { upzCentros } from './upz-data';

export interface BusquedaItem {
  tipo: 'upz' | 'barrio' | 'direccion';
  nombre: string;
  upz?: string;
  coordenadas: [number, number];
  descripcion?: string;
}

// ============================================================
// 12 UPZ OFICIALES DE SUBA
// ============================================================
const barriosPorUPZ: Record<string, string[]> = {
  'La Academia': [
    'La Academia', 'Villa del Prado Norte', 'Mirandela', 'Nueva Zelandia',
    'Villanova', 'San Jose de la Academia', 'Santa Catalina',
    'Tejares del Norte', 'Portales del Norte', 'Villa Lucy', 'Oikos',
    'San Felipe', 'Gibraltar', 'Guicani', 'Nueva Generacion',
  ],
  'Guaymaral': [
    'Guaymaral', 'Cerezos', 'Hacienda Guaymaral', 'Lagos de Guaymaral',
    'Prados de Guaymaral', 'San Jose de Guaymaral', 'Villa de Guaymaral',
    'La Balsa', 'Villa del Rosario', 'Villas de Fusca', 'Fusca',
    'Villa Juliana', 'San Luis', 'El Portico de Guaymaral', 'Villa Camila',
    'La Primavera', 'Mirador del Norte',
  ],
  'San José de Bavaría': [
    'San Jose de Bavaria', 'Villa del Prado Bavaria', 'Bavaria',
    'Villa Magdala', 'El Contador', 'San Jose del Prado', 'Villa del Puente',
    'Prado Pinzon', 'Santa Ana de Bavaria', 'Villa del Puente II',
    'Villa del Prado III', 'Portales de San Jose', 'Villa del Rio',
    'La Cabana', 'Villa Hermosa de Bavaria', 'Villa del Cedro',
  ],
  'Britalia': [
    'Britalia', 'Britalia Norte', 'Britalia Sur', 'Villa del Prado Britalia',
    'El Paseo de Britalia', 'Portales de Britalia', 'San Jose de Britalia',
    'Villa del Rio Britalia', 'Villa Magdala Britalia', 'Villa Catalina Britalia',
    'Paseo de los Libertadores', 'Alameda de Britalia',
  ],
  'El Prado': [
    'El Prado', 'Prado Norte', 'Prado Sur', 'Villa del Prado El Prado',
    'El Paseo del Prado', 'Portales del Prado', 'San Jose del Prado',
    'Villa del Rio El Prado', 'Prado Veraniego', 'Prado Veraniego Norte',
    'Prado Veraniego Sur', 'Prado Alto',
  ],
  'La Alhambra': [
    'La Alhambra', 'Alhambra Norte', 'Alhambra Sur', 'Villa de la Alhambra',
    'Santa Barbara', 'Santa Barbara Norte', 'Santa Barbara Sur',
    'Villa de Santa Barbara', 'Boyaca Real', 'Bonanza', 'Canal Salitre',
  ],
  'Casablanca Suba': [
    'Casablanca', 'Casablanca Norte', 'Casablanca Sur', 'Casablanca Suba',
    'El Portico', 'El Pinar', 'Tuna Alta', 'Tuna Baja', 'Prados de Suba',
    'Villa del Campo', 'Costa Azul', 'Santa Isabel', 'San Francisco',
    'Bosques de San Jorge', 'El Salitre', 'Alcazar de Suba',
    'Almendros Norte', 'Campanela', 'La Fontana', 'La Campina', 'Java',
    'Las Orquideas', 'Londres', 'Miraflores', 'Navetas',
  ],
  'Niza': [
    'Niza', 'Niza Norte', 'Niza Sur', 'Niza IX',
    'Colina Campestre', 'Gratamira', 'Casa Blanca', 'Casa Blanca Norte',
    'Catalayud', 'Atenas', 'El Velero', 'Del Monte', 'Calatrava',
    'Campania', 'Ciudad Jardin Norte', 'Colinas de Suba',
    'Cordoba', 'Covadonga', 'Iberia', 'Lagos de Cordoba', 'Las Villas',
    'Lindaraja', 'Provenza', 'Sotileza', 'Malibu', 'Monaco', 'Pasadena',
    'Puente Largo', 'El Recreo de los Frailes', 'Ilarco', 'Batan',
    'Estoril',
  ],
  'La Floresta': [
    'La Floresta', 'Floresta Norte', 'Floresta Sur', 'Villa de la Floresta',
    'Andes Norte', 'Club los Lagartos', 'Coasmedas', 'Julio Florez',
    'La Alborada', 'La Floresta Norte', 'Morato', 'Nuevo Monterrey',
    'Pontezuela', 'Potosi', 'Santa Rosa', 'San Nicolas', 'Teusaca',
  ],
  'Suba': [
    'Suba Centro', 'Suba', 'Costa Azul', 'Santa Isabel',
    'San Francisco', 'Bosques de San Jorge', 'El Salitre', 'Alcazar de Suba',
    'Almendros Norte', 'Campanela', 'La Fontana', 'La Campina', 'Java',
    'Las Orquideas', 'Londres', 'Miraflores', 'Navetas',
    'Almendros de Suba', 'Las Flores', 'Pradera de Suba', 'Rincon de Santa Ines',
    'Turingia', 'Villa Esperanza', 'Villa Hermosa', 'Villa Susana', 'El Pencil',
    'Los Lagos', 'Alto de la Toma', 'Acacias', 'Alaska', 'Gloria Lara',
    'Monarcas', 'El Portico', 'El Pinar',
  ],
  'El Rincón': [
    'El Rincon', 'Rincon del Norte', 'Villa del Rincon', 'Costa Rica',
    'Villa Elisa', 'Arrayanes', 'El Condor', 'Aures', 'Bochalema',
    'La Chucua', 'Ciudadela Colsubsidio', 'Villa del Progreso', 'El Palmar',
    'Prados de Santa Barbara', 'La Campina del Rincon', 'Lombardia',
    'Comuneros', 'Taberin', 'Tibabuyes Urbano', 'Teusaquillo de Suba',
  ],
  'Tibabuyes': [
    'Tibabuyes', 'Tibabuyes Norte', 'Tibabuyes Sur', 'Compartir',
    'Atenas', 'Berlin', 'Bilbao', 'Caniza I', 'Caniza II', 'Caniza III',
    'Carolina II', 'Carolina III', 'El Cedro', 'Fontanar del Rio',
    'La Gaitana', 'La Isabela', 'Los Nogales de Tibabuyes', 'Miramar',
    'Nueva Tibabuyes', 'Nuevo Corinto', 'Prados de Santa Barbara',
    'Rincon de Boyaca', 'Sabana de Tibabuyes', 'San Carlos de Suba',
    'San Pedro de Tibabuyes', 'Santa Cecilia', 'Santa Rita',
    'Tibabuyes Universal', 'Toscana', 'Verona', 'Villa Cindy',
    'Villa de las Flores', 'Villa Gloria',
  ],
};

const direccionesSuba: Array<{ nombre: string; coordenadas: [number, number]; upz: string }> = [
  { nombre: 'Av. Ciudad de Cali', coordenadas: [4.743, -74.085], upz: 'Suba' },
  { nombre: 'Av. Boyacá', coordenadas: [4.755, -74.056], upz: 'Suba' },
  { nombre: 'Autopista Norte', coordenadas: [4.760, -74.045], upz: 'San José de Bavaría' },
  { nombre: 'Av. Suba (Calle 145)', coordenadas: [4.745, -74.075], upz: 'Suba' },
  { nombre: 'Calle 127', coordenadas: [4.710, -74.070], upz: 'Niza' },
  { nombre: 'Carrera 91', coordenadas: [4.740, -74.074], upz: 'Suba' },
  { nombre: 'Av. Longitudinal de Occidente', coordenadas: [4.720, -74.100], upz: 'Tibabuyes' },
  { nombre: 'Calle 170', coordenadas: [4.770, -74.050], upz: 'Britalia' },
  { nombre: 'Av. El Rincón', coordenadas: [4.730, -74.090], upz: 'El Rincón' },
  { nombre: 'Calle 100', coordenadas: [4.680, -74.070], upz: 'La Alhambra' },
  { nombre: 'Av. Calle 80', coordenadas: [4.710, -74.110], upz: 'Tibabuyes' },
  { nombre: 'Carrera 7', coordenadas: [4.750, -74.030], upz: 'El Prado' },
  { nombre: 'Av. San José (Calle 170)', coordenadas: [4.780, -74.055], upz: 'San José de Bavaría' },
  { nombre: 'Carrera 86', coordenadas: [4.740, -74.080], upz: 'Niza' },
  { nombre: 'Calle 134', coordenadas: [4.720, -74.065], upz: 'El Prado' },
  { nombre: 'Av. Las Villas', coordenadas: [4.740, -74.058], upz: 'Britalia' },
  { nombre: 'Carrera 68', coordenadas: [4.730, -74.060], upz: 'La Alhambra' },
  { nombre: 'Calle 147', coordenadas: [4.750, -74.070], upz: 'Casablanca Suba' },
];

export function generarDatosBusqueda(): BusquedaItem[] {
  const items: BusquedaItem[] = [];

  // UPZs
  for (const [upzNombre, coordenadas] of Object.entries(upzCentros)) {
    items.push({
      tipo: 'upz',
      nombre: upzNombre,
      coordenadas,
      descripcion: `UPZ ${upzNombre} - Localidad de Suba`,
    });
  }

  // Barrios
  for (const [upz, barrios] of Object.entries(barriosPorUPZ)) {
    const centroUPZ = upzCentros[upz];
    if (!centroUPZ) continue;

    barrios.forEach((barrio, index) => {
      const offset = 0.005;
      const angle = (index / barrios.length) * Math.PI * 2;
      const lat = centroUPZ[0] + Math.sin(angle) * offset * (0.5 + Math.random() * 0.5);
      const lng = centroUPZ[1] + Math.cos(angle) * offset * (0.5 + Math.random() * 0.5);

      items.push({
        tipo: 'barrio',
        nombre: barrio,
        upz,
        coordenadas: [lat, lng] as [number, number],
        descripcion: `Barrio ${barrio}, UPZ ${upz}`,
      });
    });
  }

  // Direcciones
  direccionesSuba.forEach((dir) => {
    items.push({
      tipo: 'direccion',
      nombre: dir.nombre,
      upz: dir.upz,
      coordenadas: dir.coordenadas,
      descripcion: `${dir.nombre}, UPZ ${dir.upz}`,
    });
  });

  return items;
}

export const todosLosDatosBusqueda = generarDatosBusqueda();
