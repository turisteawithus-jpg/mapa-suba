import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { upzData } from '@/data/upz-data';
import type { Pin, Linea, PuntoLinea } from '@/types';

export interface MapaSubaHandle {
  flyTo: (lat: number, lng: number, zoom?: number) => void;
}

interface MapaSubaProps {
  pines: Pin[];
  pinSeleccionado: Pin | null;
  onPinSelect: (pin: Pin) => void;
  onMapClick?: (lat: number, lng: number) => void;
  isAdmin?: boolean;
  // Lineas creadas por el admin (libres, movibles, fijables)
  lineas?: Linea[];
  lineaSeleccionada?: Linea | null;
  onLineaSelect?: (linea: Linea) => void;
  // Puntos sobre lineas creadas por el admin
  puntosLinea?: PuntoLinea[];
  puntoSeleccionado?: PuntoLinea | null;
  onPuntoSelect?: (punto: PuntoLinea) => void;

}

// Create neon pin icon using inline SVG string
function createNeonIcon(color: string): L.DivIcon {
  const svgHtml = `
    <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color}80);">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>
  `;
  return L.divIcon({
    className: 'custom-neon-pin',
    html: svgHtml,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

// Create circle point icon for line points (thicker than line)
function createPuntoIcon(color: string, tamano: number): L.DivIcon {
  const size = Math.max(tamano, 8);
  const halfSize = size / 2;
  const html = `
    <div style="
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${color};
      border:2px solid white;
      box-shadow:0 0 8px ${color},0 0 16px ${color}60, inset 0 0 4px rgba(255,255,255,0.4);
      cursor:pointer;
    "></div>
  `;
  return L.divIcon({
    className: 'punto-linea-marker',
    html,
    iconSize: [size, size],
    iconAnchor: [halfSize, halfSize],
  });
}

// Admin click marker icon
const adminClickIcon = L.divIcon({
  className: 'admin-click-marker',
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#00f3ff;border:2px solid white;box-shadow:0 0 10px #00f3ff,0 0 20px #00f3ff40;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export const MapaSuba = forwardRef<MapaSubaHandle, MapaSubaProps>(function MapaSuba(
  {
    pines,
    pinSeleccionado,
    onPinSelect,
    onMapClick,
    isAdmin = false,
    lineas = [],
    lineaSeleccionada,
    onLineaSelect,
    puntosLinea = [],
    puntoSeleccionado,
    onPuntoSelect,

  },
  ref
) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const adminMarkerRef = useRef<L.Marker | null>(null);
  const lineasRef = useRef<(L.Polyline | L.Polygon)[]>([]);
  const puntosRef = useRef<L.Marker[]>([]);

  const [mapReady, setMapReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Expose flyTo via ref
  useImperativeHandle(ref, () => ({
    flyTo: (lat: number, lng: number, zoom?: number) => {
      if (mapRef.current) {
        mapRef.current.flyTo([lat, lng], zoom || 15, {
          duration: 1.5,
          easeLinearity: 0.25,
        });
      }
    },
  }), []);

  // Initialize map
  useEffect(() => {
    let rafId: number;
    const tryInit = () => {
      if (!containerRef.current || mapRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        rafId = requestAnimationFrame(tryInit);
        return;
      }
      initMap();
    };

    function initMap() {
      if (!containerRef.current || mapRef.current) return;
      try {
        const map = L.map(containerRef.current, {
          center: [4.7431, -74.074],
          zoom: 13,
          zoomControl: false,
          attributionControl: false,
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 19,
            subdomains: 'abcd',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        ).addTo(map);

        L.control.attribution({ position: 'bottomright' }).addTo(map);

        mapRef.current = map;
        setTimeout(() => {
          map.invalidateSize();
          setMapReady(true);
        }, 200);
      } catch (err) {
        console.error('Error initializing map:', err);
        setInitError(err instanceof Error ? err.message : 'Error inicializando el mapa');
      }
    }

    tryInit();
    return () => {
      cancelAnimationFrame(rafId);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Setup click handler for admin mode
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    map.off('click');

    const clickHandler = (e: L.LeafletMouseEvent) => {
      if (isAdmin && onMapClick) {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
        if (adminMarkerRef.current) {
          adminMarkerRef.current.remove();
        }
        const marker = L.marker([lat, lng], { icon: adminClickIcon }).addTo(map);
        adminMarkerRef.current = marker;
      }
    };

    map.on('click', clickHandler);
    return () => { map.off('click', clickHandler); };
  }, [isAdmin, onMapClick]);

  // Draw UPZ polygons (visualizacion ligera, no delimitaciones fijas)
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    // Ya no dibujamos poligonos de UPZ ni delimitaciones fijas
    // Solo lineas del admin, pines y puntos
  }, [mapReady]);

  // Draw admin-created lines (polylines) - EDITABLES por el admin
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    lineasRef.current.forEach((l) => l.remove());
    lineasRef.current = [];

    lineas.forEach((linea) => {
      if (!linea.visible) return;

      const isSelected = linea.id === lineaSeleccionada?.id;
      const coords = linea.cerrada
        ? [...linea.coordenadas, linea.coordenadas[0]]
        : linea.coordenadas;

      // Si la linea esta cerrada y tiene filtro, dibujar poligono con fill translucido
      if (linea.cerrada) {
        const polygon = L.polygon(linea.coordenadas, {
          color: linea.color,
          weight: linea.grosor,
          opacity: 0.9,
          fillColor: linea.color,
          fillOpacity: linea.filtrar ? 0.15 : 0.08,
          lineCap: 'round',
          lineJoin: 'round',
          dashArray: isSelected ? undefined : '8, 4',
          className: linea.filtrar ? 'linea-con-filtro' : undefined,
        })
          .addTo(mapRef.current!)
          .bindTooltip(linea.nombre, {
            permanent: false,
            direction: 'top',
            className: 'linea-tooltip',
          });

        polygon.on('click', () => {
          onLineaSelect?.(linea);
        });

        // Si tiene filtro tecnologico, agregar patron SVG
        if (linea.filtrar) {
          const svgPattern = `
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tech-${linea.id}" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="${linea.color}" stroke-width="1.5" opacity="0.25"/>
                  <line x1="6" y1="0" x2="6" y2="12" stroke="${linea.color}" stroke-width="0.5" opacity="0.15"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tech-${linea.id})"/>
            </svg>
          `;
          const blob = new Blob([svgPattern], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          polygon.setStyle({ fillPattern: url } as any);
        }

        lineasRef.current.push(polygon);
      } else {
        // Linea abierta: polyline normal
        const polyline = L.polyline(coords, {
          color: linea.color,
          weight: linea.grosor,
          opacity: 0.75,
          lineCap: 'round',
          lineJoin: 'round',
          dashArray: isSelected ? undefined : '8, 4',
        })
          .addTo(mapRef.current!)
          .bindTooltip(linea.nombre, {
            permanent: false,
            direction: 'top',
            className: 'linea-tooltip',
          });

        polyline.on('click', () => {
          onLineaSelect?.(linea);
        });

        // Bring lines to back so they don't block pins/points
        polyline.bringToBack();
        lineasRef.current.push(polyline);
      }
    });
  }, [lineas, lineaSeleccionada, mapReady, onLineaSelect]);

  // Draw waypoints (visible en modo admin)
  const waypointsRef = useRef<L.CircleMarker[]>([]);
  useEffect(() => {
    if (!mapRef.current || !mapReady || !isAdmin) return;
    waypointsRef.current.forEach((w) => w.remove());
    waypointsRef.current = [];

    lineas.forEach((linea) => {
      if (!linea.visible || !linea.waypoints || linea.waypoints.length === 0) return;
      linea.waypoints.forEach((wp, idx) => {
        const circle = L.circleMarker(wp, {
          radius: 6,
          color: linea.color,
          weight: 2,
          fillColor: linea.color,
          fillOpacity: 0.6,
          className: 'waypoint-marker',
        })
          .addTo(mapRef.current!)
          .bindTooltip(`WP ${idx + 1}: ${linea.nombre}`, {
            permanent: false,
            direction: 'top',
            className: 'waypoint-tooltip',
          });
        waypointsRef.current.push(circle);
      });
    });
  }, [lineas, mapReady, isAdmin]);

  // Draw line points (puntos sobre lineas)
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    puntosRef.current.forEach((m) => m.remove());
    puntosRef.current = [];

    puntosLinea.forEach((punto) => {
      const marker = L.marker([punto.latitud, punto.longitud], {
        icon: createPuntoIcon(punto.color, punto.tamano),
        zIndexOffset: 500,
      })
        .addTo(mapRef.current!)
        .on('click', () => {
          onPuntoSelect?.(punto);
        });

      marker.bindTooltip(punto.titulo, {
        permanent: false,
        direction: 'top',
        offset: [0, -punto.tamano / 2],
        className: 'punto-tooltip',
      });

      puntosRef.current.push(marker);
    });
  }, [puntosLinea, mapReady, onPuntoSelect]);

  // Draw pin markers
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    pines.forEach((pin) => {
      const upz = upzData.find(
        (u) =>
          u.nombre.toLowerCase() === pin.upz.toLowerCase() ||
          pin.upz.toLowerCase().includes(u.nombre.toLowerCase())
      );
      const color = upz?.colorNeon || '#00f3ff';

      const marker = L.marker([pin.latitud, pin.longitud], {
        icon: createNeonIcon(color),
        zIndexOffset: 800,
      })
        .addTo(mapRef.current!)
        .on('click', () => { onPinSelect(pin); });

      marker.bindTooltip(pin.titulo, {
        permanent: false,
        direction: 'top',
        offset: [0, -10],
        className: 'pin-tooltip',
      });

      markersRef.current.push(marker);
    });
  }, [pines, onPinSelect, mapReady]);

  // Fly to selected pin
  useEffect(() => {
    if (pinSeleccionado && mapRef.current && mapReady) {
      mapRef.current.flyTo(
        [pinSeleccionado.latitud, pinSeleccionado.longitud],
        16,
        { duration: 1.5, easeLinearity: 0.25 }
      );
    }
  }, [pinSeleccionado, mapReady]);

  // Fly to selected punto
  useEffect(() => {
    if (puntoSeleccionado && mapRef.current && mapReady) {
      mapRef.current.flyTo(
        [puntoSeleccionado.latitud, puntoSeleccionado.longitud],
        16,
        { duration: 1.5, easeLinearity: 0.25 }
      );
    }
  }, [puntoSeleccionado, mapReady]);

  if (initError) {
    return (
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}
      >
        <div className="text-center p-6">
          <p className="text-red-400 text-sm mb-2">Error al cargar el mapa</p>
          <p className="text-slate-500 text-xs">{initError}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mapa-suba-container"
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#0a0a0a' }}
    />
  );
});
