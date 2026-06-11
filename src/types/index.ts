export interface NotaPin {
  id: string;
  nombre: string;       // Nombre que aparece en el botón
  color: string;        // Color del botón/borde
  contenido: string;    // Contenido HTML
  creado_at: string;
}

export interface Pin {
  id: string;
  titulo: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  upz: string;
  barrio: string;
  direccion_referencia?: string;
  imagen_url: string;
  imagen_descarga_url: string;
  video_url: string;
  notas: NotaPin[];     // Notas acumuladas dentro del pin
  creado_at: string;
}

export interface PuntoLinea {
  id: string;
  linea_id: string;
  titulo: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  tamano: number;
  color: string;
  imagen_url: string;
  imagen_descarga_url: string;
  video_url: string;
  orden: number;
  notas: NotaPin[];     // Notas acumuladas dentro del punto
  creado_at: string;
}

export interface Linea {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
  grosor: number;
  coordenadas: [number, number][];
  visible: boolean;
  creado_at: string;
}

export interface BloqueNota {
  id: string;
  nombre: string;
  color: string;
  latitud: number;
  longitud: number;
  nota: {
    titulo: string;
    contenido: string;
    ultima_edicion: string;
  };
  creado_at: string;
}

export interface UPZ {
  id: string;
  nombre: string;
  colorNeon: string;
  coordenadasLimite: [number, number][];
  barrios: string[];
}

export interface BusquedaResultado {
  tipo: 'upz' | 'barrio' | 'pin';
  nombre: string;
  upz?: string;
  coordenadas: [number, number];
  descripcion?: string;
}
