// Datos de ejemplo para las secciones de recursos
// Reemplaza estas URLs con las tuyas de Cloudinary, Imgur, etc.

export interface RecursoImagen {
  id: string;
  titulo: string;
  url: string;        // URL de la imagen (hipervinculo)
  thumbnail: string;  // URL miniatura
  categoria: string;
}

export interface RecursoPDF {
  id: string;
  titulo: string;
  descripcion: string;
  url: string;        // URL directa al PDF
  portada: string;    // URL imagen de portada
}

export interface RecursoVideo {
  id: string;
  titulo: string;
  descripcion: string;
  url: string;        // URL del video (YouTube, Vimeo, etc.)
  thumbnail: string;  // URL miniatura
  duracion?: string;
}

// ===== PIEZAS GRAFICAS DE APOYO =====
export const piezasGraficasApoyo: RecursoImagen[] = [
  {
    id: 'pga-1',
    titulo: 'Infografia Localidad de Suba',
    url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80',
    categoria: 'Infografia',
  },
  {
    id: 'pga-2',
    titulo: 'Mapa de Transporte Suba',
    url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
    categoria: 'Mapa',
  },
  {
    id: 'pga-3',
    titulo: 'Zonas Verdes Suba',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
    categoria: 'Ambiental',
  },
  {
    id: 'pga-4',
    titulo: 'Rutas Culturales',
    url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&q=80',
    categoria: 'Cultural',
  },
  {
    id: 'pga-5',
    titulo: 'Centros Comerciales',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    categoria: 'Comercial',
  },
  {
    id: 'pga-6',
    titulo: 'Humedales de Suba',
    url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&q=80',
    categoria: 'Ambiental',
  },
];

// ===== ESTRATEGIA DE MARKETING (PDFs) =====
export const estrategiaMarketing: RecursoPDF[] = [
  {
    id: 'em-1',
    titulo: 'Estrategia de Marketing 2025',
    descripcion: 'Documento completo con la estrategia de marketing digital para la localidad de Suba. Incluye analisis de mercado, segmentacion y tacticas de comunicacion.',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    portada: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
  },
  {
    id: 'em-2',
    titulo: 'Plan de Comunicaciones',
    descripcion: 'Plan detallado de comunicaciones internas y externas para los proyectos de desarrollo comunitario.',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    portada: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
  },
  {
    id: 'em-3',
    titulo: 'Analisis de Impacto Social',
    descripcion: 'Estudio de impacto social de los proyectos implementados en la localidad durante el ultimo ano.',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    portada: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
  },
];

// ===== PIEZAS GRAFICAS EDITABLES =====
export const piezasEditables: RecursoImagen[] = [
  {
    id: 'pe-1',
    titulo: 'Plantilla Redes Sociales',
    url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80',
    categoria: 'Editable',
  },
  {
    id: 'pe-2',
    titulo: 'Banner Eventos',
    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
    categoria: 'Editable',
  },
  {
    id: 'pe-3',
    titulo: 'Flyer Informativo',
    url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80',
    categoria: 'Editable',
  },
  {
    id: 'pe-4',
    titulo: 'Presentacion Institucional',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    categoria: 'Analisis',
  },
];

// ===== VIDEOS =====
export const videos: RecursoVideo[] = [
  {
    id: 'vid-1',
    titulo: 'Recorrido Virtual Suba',
    descripcion: 'Recorrido aereo por los principales puntos de interes de la localidad de Suba.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80',
    duracion: '5:32',
  },
  {
    id: 'vid-2',
    titulo: 'Testimonios Comunitarios',
    descripcion: 'Historias de vida de habitantes de Suba y su relacion con el territorio.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    duracion: '8:15',
  },
  {
    id: 'vid-3',
    titulo: 'Proyectos de Desarrollo',
    descripcion: 'Resumen de los proyectos de desarrollo urbano y social implementados en 2024.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80',
    duracion: '12:45',
  },
  {
    id: 'vid-4',
    titulo: 'Cultura y Tradicion',
    descripcion: 'Exploracion de las tradiciones culturales y eventos que dan vida a Suba.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
    duracion: '7:20',
  },
];
