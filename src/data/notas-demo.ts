import type { BloqueNota } from '@/types';

export const bloquesNotaDemo: BloqueNota[] = [
  {
    id: 'nota-1',
    nombre: 'Notas UPZ Suba Centro',
    color: '#00f3ff',
    latitud: 4.7431,
    longitud: -74.0740,
    nota: {
      titulo: 'Información UPZ Suba Centro',
      contenido: '<h2>Suba Centro</h2><p>UPZ central de la localidad de Suba. Aquí se concentran los principales <b>servicios administrativos</b> y <i>comerciales</i> de la zona.</p><h3>Puntos de interés:</h3><ul><li>Alcaldía Local de Suba</li><li>Centro Comercial Suba</li><li>Parque Principal</li><li>Estación de Policía</li></ul><p><b>Nota:</b> Esta UPZ tiene alta densidad poblacional y es zona de tránsito constante.</p>',
      ultima_edicion: '2024-06-10T10:00:00Z',
    },
    creado_at: '2024-06-01T08:00:00Z',
  },
  {
    id: 'nota-2',
    nombre: 'Ruta Ciclovía',
    color: '#22c55e',
    latitud: 4.7250,
    longitud: -74.0850,
    nota: {
      titulo: 'Ciclovía de Suba - Domingos',
      contenido: '<h2>Ruta de la Ciclovía</h2><p>Los <b>domingos y festivos</b> de 7:00 a.m. a 2:00 p.m., varias vías de Suba se cierran al tráfico vehicular para uso de ciclistas y peatones.</p><h3>Ruta principal:</h3><ul><li>Av. Ciudad de Cali (desde Calle 127 hasta Calle 170)</li><li>Carrera 91 (desde Calle 145 hasta Calle 165)</li><li>Calle 147 (desde Autopista hasta Av. Cali)</li></ul><p><i>Recomendación: Llegar temprano para evitar aglomeraciones.</i></p>',
      ultima_edicion: '2024-06-08T14:30:00Z',
    },
    creado_at: '2024-06-02T09:00:00Z',
  },
  {
    id: 'nota-3',
    nombre: 'Proyectos en Construcción',
    color: '#ff6b35',
    latitud: 4.7180,
    longitud: -74.0680,
    nota: {
      titulo: 'Obras y Proyectos 2024',
      contenido: '<h2>Proyectos en Desarrollo</h2><p>Listado de <b>proyectos de infraestructura</b> actualmente en ejecución en la localidad de Suba:</p><h3>1. Ampliación Av. Ciudad de Cali</h3><p><b>Estado:</b> En construcción<br><b>Fin estimado:</b> Diciembre 2024<br><b>Impacto:</b> Reducción de congestión vial en un 30%</p><h3>2. Nuevo Centro de Salud - UPZ El Prado</h3><p><b>Estado:</b> En planificación<br><b>Inicio:</b> Enero 2025<br><b>Capacidad:</b> 50 camas</p><h3>3. Remodelación Parque Tibabuyes</h3><p><b>Estado:</b> En ejecución<br><b>Avance:</b> 65%<br><b>Inclusión:</b> Zonas deportivas y senderos ecológicos</p><p><u>Última actualización: Junio 2024</u></p>',
      ultima_edicion: '2024-06-11T08:15:00Z',
    },
    creado_at: '2024-06-03T11:00:00Z',
  },
  {
    id: 'nota-4',
    nombre: 'Eventos Comunitarios',
    color: '#a855f7',
    latitud: 4.7550,
    longitud: -74.0500,
    nota: {
      titulo: 'Calendario de Eventos 2024',
      contenido: '<h2>Próximos Eventos en Suba</h2><h3>Junio 2024</h3><ul><li><b>15 Jun</b> - Festival de Verano en el Parque Principal</li><li><b>22 Jun</b> - Maratón Suba 10K</li><li><b>29 Jun</b> - Feria Emprendedores locales</li></ul><h3>Julio 2024</h3><ul><li><b>06 Jul</b> - Concierto de música local</li><li><b>20 Jul</b> - Desfile 20 de Julio - Independencia</li><li><b>27 Jul</b> - Jornada de limpieza comunitaria</li></ul><p><i>Los eventos están sujetos a cambios por condiciones climáticas.</i></p><p>Para más información contactar a la <b>Alcaldía Local de Suba</b>.</p>',
      ultima_edicion: '2024-06-09T16:00:00Z',
    },
    creado_at: '2024-06-04T14:00:00Z',
  },
];
