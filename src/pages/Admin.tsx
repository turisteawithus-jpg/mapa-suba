import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, waitForClerk, isClerkConfigured } from '@/hooks/useAuth';
import { SignIn } from '@clerk/clerk-react';
import {
  Save,
  Trash2,
  Edit3,
  Plus,
  MapPin,
  AlertTriangle,
  X,
  Check,
  Loader2,
  List,
  MousePointerClick,
  Route,
  CircleDot,
  StickyNote,
  Crosshair,
  FolderOpen,
  Image,
  Video,
  MessageCircle,
  Type,
  Download,
} from 'lucide-react';
// Import local: AdminAnalisis se importa arriba como componente externo
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapaSuba } from '@/components/MapaSuba';
import type { MapaSubaHandle } from '@/components/MapaSuba';
import { usePines } from '@/hooks/usePines';
import { useLineas } from '@/hooks/useLineas';
import { useNotas } from '@/hooks/useNotas';
import { useUPZRef } from '@/hooks/useUPZRef';
import { useRecursos } from '@/hooks/useRecursos';
import { useTextLabels } from '@/hooks/useTextLabels';
import { AdminAnalisis } from '@/components/AdminAnalisis';
import { AdminExportador } from '@/components/AdminExportador';
import { NotaEditor } from '@/components/NotaPanel';
import { upzData } from '@/data/upz-data';
import type { Pin, NotaPin } from '@/types';



type AdminTab = 'pins' | 'lineas' | 'puntos' | 'notas' | 'refupz' | 'recursos' | 'analisis' | 'labels' | 'exportar';

// ========== PIN FORM ==========
interface PinFormData {
  titulo: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  upz: string;
  barrio: string;
  direccion_referencia: string;
  imagen_url: string;
  imagen_descarga_url: string;
  video_url: string;
  notas: NotaPin[];
  galeria_imagenes: string[];
  galeria_videos: { url: string; titulo: string }[];
  tamano: number;
}

const emptyPinForm: PinFormData = {
  titulo: '',
  descripcion: '',
  latitud: '',
  longitud: '',
  upz: '',
  barrio: '',
  direccion_referencia: '',
  imagen_url: '',
  imagen_descarga_url: '',
  video_url: '',
  notas: [],
  galeria_imagenes: [],
  galeria_videos: [],
  tamano: 28,
};

// ========== LINEA FORM ==========
interface LineaFormData {
  nombre: string;
  descripcion: string;
  color: string;
  grosor: number;
  snapToRoad: boolean;
  cerrada: boolean;
  filtrar: boolean;
}

const emptyLineaForm: LineaFormData = {
  nombre: '',
  descripcion: '',
  color: '#00f3ff',
  grosor: 4,
  snapToRoad: false,
  cerrada: false,
  filtrar: false,
};

// ========== PUNTO FORM ==========
interface PuntoFormData {
  titulo: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  linea_id: string;
  tamano: number;
  color: string;
  imagen_url: string;
  imagen_descarga_url: string;
  video_url: string;
  orden: string;
  notas: NotaPin[];
  galeria_imagenes: string[];
  galeria_videos: { url: string; titulo: string }[];
}

const emptyPuntoForm: PuntoFormData = {
  titulo: '',
  descripcion: '',
  latitud: '',
  longitud: '',
  linea_id: '',
  tamano: 10,
  color: '#00f3ff',
  imagen_url: '',
  imagen_descarga_url: '',
  video_url: '',
  orden: '1',
  notas: [],
  galeria_imagenes: [],
  galeria_videos: [],
};

// ========== LABEL FORM ==========
interface LabelFormData {
  texto: string;
  latitud: string;
  longitud: string;
  fontSize: number;
  color: string;
  rotacion: number;
}

const emptyLabelForm: LabelFormData = {
  texto: '',
  latitud: '',
  longitud: '',
  fontSize: 14,
  color: '#00f3ff',
  rotacion: 0,
};

// ========== NOTA FORM ==========
interface NotaFormData {
  nombre: string;
  color: string;
  latitud: string;
  longitud: string;
  titulo_nota: string;
  contenido: string;
}

const emptyNotaForm: NotaFormData = {
  nombre: '',
  color: '#22c55e',
  latitud: '',
  longitud: '',
  titulo_nota: '',
  contenido: '',
};

const COLORS = [
  '#00f3ff', '#ff6b35', '#a855f7', '#22c55e', '#ef4444',
  '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6', '#f97316',
];

// ===== ADMIN RECURSOS COMPONENT =====
function AdminRecursos() {
  const {
    piezasGraficasApoyo,
    estrategiaMarketing,
    piezasEditables,
    videos,
    updatePiezas,
    updateEstrategia,
    updateEditables,
    updateVideos,
  } = useRecursos();

  const [activeSection, setActiveSection] = useState<'imagenes' | 'pdfs' | 'editables' | 'videos'>('imagenes');

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
        <FolderOpen className="w-5 h-5" />
        Centro de Recursos
      </h2>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'imagenes' as const, label: 'Piezas Graficas', color: 'cyan' },
          { key: 'pdfs' as const, label: 'Marketing', color: 'orange' },
          { key: 'editables' as const, label: 'Editables', color: 'purple' },
          { key: 'videos' as const, label: 'Videos', color: 'emerald' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              activeSection === tab.key
                ? `border-${tab.color}-500/30 bg-${tab.color}-500/10 text-${tab.color}-400`
                : 'border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Piezas Graficas de Apoyo */}
      {activeSection === 'imagenes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Piezas Graficas de Apoyo</h3>
            <button
              onClick={() => updatePiezas([...piezasGraficasApoyo, { id: `pga-${Date.now()}`, titulo: '', url: '', thumbnail: '', categoria: '' }])}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Agregar
            </button>
          </div>
          {piezasGraficasApoyo.map((item, i) => (
            <div key={item.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <Input value={item.titulo} onChange={(e) => {
                  const updated = [...piezasGraficasApoyo];
                  updated[i] = { ...updated[i], titulo: e.target.value };
                  updatePiezas(updated);
                }} placeholder="Titulo" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
                <button onClick={() => updatePiezas(piezasGraficasApoyo.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <Input value={item.url} onChange={(e) => {
                const updated = [...piezasGraficasApoyo];
                updated[i] = { ...updated[i], url: e.target.value, thumbnail: e.target.value };
                updatePiezas(updated);
              }} placeholder="URL de la imagen" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
              {item.url && <img src={item.url} alt={item.titulo} className="w-20 h-20 object-cover rounded-lg border border-slate-700" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
            </div>
          ))}
        </div>
      )}

      {/* Estrategia de Marketing */}
      {activeSection === 'pdfs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Estrategia de Marketing</h3>
            <button
              onClick={() => updateEstrategia([...estrategiaMarketing, { id: `em-${Date.now()}`, titulo: '', descripcion: '', url: '', portada: '' }])}
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Agregar
            </button>
          </div>
          {estrategiaMarketing.map((item, i) => (
            <div key={item.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <Input value={item.titulo} onChange={(e) => {
                  const updated = [...estrategiaMarketing];
                  updated[i] = { ...updated[i], titulo: e.target.value };
                  updateEstrategia(updated);
                }} placeholder="Titulo del PDF" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
                <button onClick={() => updateEstrategia(estrategiaMarketing.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <Input value={item.descripcion} onChange={(e) => {
                const updated = [...estrategiaMarketing];
                updated[i] = { ...updated[i], descripcion: e.target.value };
                updateEstrategia(updated);
              }} placeholder="Descripcion" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
              <Input value={item.url} onChange={(e) => {
                const updated = [...estrategiaMarketing];
                updated[i] = { ...updated[i], url: e.target.value };
                updateEstrategia(updated);
              }} placeholder="URL del PDF" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
            </div>
          ))}
        </div>
      )}

      {/* Piezas Editables */}
      {activeSection === 'editables' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Piezas Graficas Editables y Analisis Estrategico Actual</h3>
            <button
              onClick={() => updateEditables([...piezasEditables, { id: `pe-${Date.now()}`, titulo: '', url: '', thumbnail: '', categoria: '' }])}
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Agregar
            </button>
          </div>
          {piezasEditables.map((item, i) => (
            <div key={item.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <Input value={item.titulo} onChange={(e) => {
                  const updated = [...piezasEditables];
                  updated[i] = { ...updated[i], titulo: e.target.value };
                  updateEditables(updated);
                }} placeholder="Titulo" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
                <button onClick={() => updateEditables(piezasEditables.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <Input value={item.url} onChange={(e) => {
                const updated = [...piezasEditables];
                updated[i] = { ...updated[i], url: e.target.value, thumbnail: e.target.value };
                updateEditables(updated);
              }} placeholder="URL de la imagen" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
            </div>
          ))}
        </div>
      )}

      {/* Videos */}
      {activeSection === 'videos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Videos</h3>
            <button
              onClick={() => updateVideos([...videos, { id: `vid-${Date.now()}`, titulo: '', descripcion: '', url: '', thumbnail: '' }])}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Agregar
            </button>
          </div>
          {videos.map((item, i) => (
            <div key={item.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <Input value={item.titulo} onChange={(e) => {
                  const updated = [...videos];
                  updated[i] = { ...updated[i], titulo: e.target.value };
                  updateVideos(updated);
                }} placeholder="Titulo del video" className="bg-slate-900 border-slate-700 text-slate-200 text-xs flex-1" />
                <button onClick={() => updateVideos(videos.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <Input value={item.url} onChange={(e) => {
                const updated = [...videos];
                updated[i] = { ...updated[i], url: e.target.value };
                updateVideos(updated);
              }} placeholder="URL del video (YouTube, Vimeo, etc.)" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
              <Input value={item.descripcion} onChange={(e) => {
                const updated = [...videos];
                updated[i] = { ...updated[i], descripcion: e.target.value };
                updateVideos(updated);
              }} placeholder="Descripcion" className="bg-slate-900 border-slate-700 text-slate-200 text-xs" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Admin() {
  const { isSignedIn, isLoaded, openSignIn } = useAuth();
  const { pines, loading: pinesLoading, addPin, editPin, removePin } = usePines();
  const { lineas, puntos, addLinea, editLinea, removeLinea, addPunto, editPunto, removePunto } = useLineas();
  const { notas, addNota, editNota, removeNota } = useNotas();
  const { centros: centrosUPZ, setCentroUPZ } = useUPZRef();
  const { labels: textLabels, addLabel, editLabel, removeLabel } = useTextLabels();

  const [tab, setTab] = useState<AdminTab>('pins');
  // UPZ seleccionada para definir punto de referencia
  const [upzRefSeleccionada, setUpzRefSeleccionada] = useState<string>('');
  const [subTab, setSubTab] = useState<'form' | 'list'>('form');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pin state
  const [pinForm, setPinForm] = useState<PinFormData>(emptyPinForm);
  const [editingPinId, setEditingPinId] = useState<string | null>(null);

  // Linea state
  const [lineaForm, setLineaForm] = useState<LineaFormData>(emptyLineaForm);
  const [editingLineaId, setEditingLineaId] = useState<string | null>(null);
  const [lineCoords, setLineCoords] = useState<[number, number][]>([]);

  // Punto state
  const [puntoForm, setPuntoForm] = useState<PuntoFormData>(emptyPuntoForm);
  const [editingPuntoId, setEditingPuntoId] = useState<string | null>(null);

  // Label state
  const [labelForm, setLabelForm] = useState<LabelFormData>(emptyLabelForm);
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);

  // Nota state
  const [notaForm, setNotaForm] = useState<NotaFormData>(emptyNotaForm);
  const [editingNotaId, setEditingNotaId] = useState<string | null>(null);
  // Estados para editor de notas en pines/puntos
  const [mostrarNotaEditor, setMostrarNotaEditor] = useState(false);
  const [editandoNotaIndex, setEditandoNotaIndex] = useState<number | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clerkReady, setClerkReady] = useState(false);
  const mapaRef = useRef<MapaSubaHandle>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      openSignIn();
    }
  }, [isLoaded, isSignedIn, openSignIn]);

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  // Esperar a que Clerk este listo antes de mostrar SignIn
  useEffect(() => {
    if (!isClerkConfigured()) return;
    const cleanup = waitForClerk(() => setClerkReady(true));
    return cleanup;
  }, []);

  const handleMapClick = useCallback((lat: number, lng: number) => {
    if (tab === 'refupz' && upzRefSeleccionada) {
      setCentroUPZ(upzRefSeleccionada, lat, lng);
      showMessage('success', `Punto de referencia de "${upzRefSeleccionada}" actualizado: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    } else if (tab === 'pins') {
      setPinForm((prev) => ({
        ...prev,
        latitud: lat.toFixed(6),
        longitud: lng.toFixed(6),
      }));
    } else if (tab === 'lineas') {
      setLineCoords((prev) => [...prev, [lat, lng] as [number, number]]);
    } else if (tab === 'puntos') {
      setPuntoForm((prev) => ({
        ...prev,
        latitud: lat.toFixed(6),
        longitud: lng.toFixed(6),
      }));
    } else if (tab === 'labels') {
      setLabelForm((prev) => ({
        ...prev,
        latitud: lat.toFixed(6),
        longitud: lng.toFixed(6),
      }));
    } else if (tab === 'notas') {
      setNotaForm((prev) => ({
        ...prev,
        latitud: lat.toFixed(6),
        longitud: lng.toFixed(6),
      }));
    }
    showMessage('success', `Coordenadas capturadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  }, [tab, upzRefSeleccionada, setCentroUPZ, showMessage]);

  // ===== PIN CRUD =====
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const pinData = {
      titulo: pinForm.titulo,
      descripcion: pinForm.descripcion,
      latitud: parseFloat(pinForm.latitud),
      longitud: parseFloat(pinForm.longitud),
      upz: pinForm.upz,
      barrio: pinForm.barrio,
      direccion_referencia: pinForm.direccion_referencia || undefined,
      imagen_url: pinForm.imagen_url || '',
      imagen_descarga_url: pinForm.imagen_descarga_url || '',
      video_url: pinForm.video_url || '',
      notas: pinForm.notas,
      galeria_imagenes: pinForm.galeria_imagenes,
      galeria_videos: pinForm.galeria_videos,
      tamano: pinForm.tamano,
    };
    if (editingPinId) {
      editPin(editingPinId, pinData);
      showMessage('success', 'Pin actualizado correctamente');
      setEditingPinId(null);
    } else {
      addPin(pinData);
      showMessage('success', 'Pin creado correctamente');
    }
    setPinForm(emptyPinForm);
    setIsSubmitting(false);
  };

  const handleEditPin = (pin: Pin) => {
    setPinForm({
      titulo: pin.titulo,
      descripcion: pin.descripcion,
      latitud: pin.latitud.toString(),
      longitud: pin.longitud.toString(),
      upz: pin.upz,
      barrio: pin.barrio,
      direccion_referencia: pin.direccion_referencia || '',
      imagen_url: pin.imagen_url,
      imagen_descarga_url: pin.imagen_descarga_url,
      video_url: pin.video_url,
      notas: [...pin.notas],
      galeria_imagenes: pin.galeria_imagenes ? [...pin.galeria_imagenes] : [],
      galeria_videos: pin.galeria_videos ? [...pin.galeria_videos] : [],
      tamano: pin.tamano || 28,
    });
    setEditingPinId(pin.id);
    setSubTab('form');
    setTab('pins');
  };

  // ===== LINEA CRUD =====
  const handleLineaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lineCoords.length < 2) {
      showMessage('error', 'Agrega al menos 2 puntos a la línea (clic en el mapa)');
      return;
    }

    let finalCoords = lineCoords;

    // Si snapToRoad esta activo, calcular ruta por vias con OSRM
    if (lineaForm.snapToRoad && lineCoords.length >= 2) {
      try {
        const coordsStr = lineCoords.map((c) => `${c[1]},${c[0]}`).join(';');
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`
        );
        const data = await res.json();
        if (data.routes && data.routes[0]) {
          finalCoords = data.routes[0].geometry.coordinates.map(
            (c: number[]) => [c[1], c[0]] as [number, number]
          );
          showMessage('success', 'Ruta calculada por las vías correctamente');
        }
      } catch {
        showMessage('error', 'No se pudo calcular la ruta por vías. Se usaran coordenadas directas.');
      }
    }

    const lineaData = {
      nombre: lineaForm.nombre,
      descripcion: lineaForm.descripcion,
      color: lineaForm.color,
      grosor: lineaForm.grosor,
      coordenadas: finalCoords,
      waypoints: lineCoords,
      snapToRoad: lineaForm.snapToRoad,
      cerrada: lineaForm.cerrada,
      filtrar: lineaForm.filtrar,
    };

    if (editingLineaId) {
      editLinea(editingLineaId, lineaData);
      showMessage('success', 'Línea actualizada correctamente');
      setEditingLineaId(null);
    } else {
      addLinea({ ...lineaData, visible: true });
      showMessage('success', 'Línea creada correctamente');
    }
    setLineaForm(emptyLineaForm);
    setLineCoords([]);
  };

  // ===== PUNTO CRUD =====
  const handlePuntoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!puntoForm.linea_id) {
      showMessage('error', 'Selecciona una línea');
      return;
    }
    if (editingPuntoId) {
      editPunto(editingPuntoId, {
        titulo: puntoForm.titulo,
        descripcion: puntoForm.descripcion,
        latitud: parseFloat(puntoForm.latitud),
        longitud: parseFloat(puntoForm.longitud),
        linea_id: puntoForm.linea_id,
        tamano: puntoForm.tamano,
        color: puntoForm.color,
        imagen_url: puntoForm.imagen_url,
        imagen_descarga_url: puntoForm.imagen_descarga_url,
        video_url: puntoForm.video_url,
        orden: parseInt(puntoForm.orden),
        notas: puntoForm.notas,
        galeria_imagenes: puntoForm.galeria_imagenes,
        galeria_videos: puntoForm.galeria_videos,
      });
      showMessage('success', 'Punto actualizado correctamente');
      setEditingPuntoId(null);
    } else {
      addPunto({
        titulo: puntoForm.titulo,
        descripcion: puntoForm.descripcion,
        latitud: parseFloat(puntoForm.latitud),
        longitud: parseFloat(puntoForm.longitud),
        linea_id: puntoForm.linea_id,
        tamano: puntoForm.tamano,
        color: puntoForm.color,
        imagen_url: puntoForm.imagen_url,
        imagen_descarga_url: puntoForm.imagen_descarga_url,
        video_url: puntoForm.video_url,
        orden: parseInt(puntoForm.orden),
        notas: puntoForm.notas,
        galeria_imagenes: puntoForm.galeria_imagenes,
        galeria_videos: puntoForm.galeria_videos,
      });
      showMessage('success', 'Punto creado correctamente');
    }
    setPuntoForm(emptyPuntoForm);
  };

  // ===== LABEL CRUD =====
  const handleLabelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const labelData = {
      texto: labelForm.texto,
      latitud: parseFloat(labelForm.latitud),
      longitud: parseFloat(labelForm.longitud),
      fontSize: labelForm.fontSize,
      color: labelForm.color,
      rotacion: labelForm.rotacion,
    };
    if (editingLabelId) {
      editLabel(editingLabelId, labelData);
      showMessage('success', 'Texto actualizado');
      setEditingLabelId(null);
    } else {
      addLabel(labelData);
      showMessage('success', 'Texto agregado al mapa');
    }
    setLabelForm(emptyLabelForm);
  };

  const handleEditLabel = (label: import('@/types').TextoLabel) => {
    setLabelForm({
      texto: label.texto,
      latitud: label.latitud.toString(),
      longitud: label.longitud.toString(),
      fontSize: label.fontSize,
      color: label.color,
      rotacion: label.rotacion,
    });
    setEditingLabelId(label.id);
    setSubTab('form');
    setTab('labels');
  };

  // ===== NOTA CRUD =====
  const handleNotaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotaId) {
      editNota(editingNotaId, {
        nombre: notaForm.nombre,
        color: notaForm.color,
        latitud: parseFloat(notaForm.latitud),
        longitud: parseFloat(notaForm.longitud),
        nota: {
          titulo: notaForm.titulo_nota,
          contenido: notaForm.contenido,
          ultima_edicion: new Date().toISOString(),
        },
      });
      showMessage('success', 'Nota actualizada correctamente');
      setEditingNotaId(null);
    } else {
      addNota({
        nombre: notaForm.nombre,
        color: notaForm.color,
        latitud: parseFloat(notaForm.latitud),
        longitud: parseFloat(notaForm.longitud),
        nota: {
          titulo: notaForm.titulo_nota || notaForm.nombre,
          contenido: notaForm.contenido,
          ultima_edicion: new Date().toISOString(),
        },
      });
      showMessage('success', 'Nota creada correctamente');
    }
    setNotaForm(emptyNotaForm);
  };

  const loading = pinesLoading;

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    // Si Clerk esta configurado pero aun no carga, mostrar spinner
    if (isClerkConfigured() && !clerkReady) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Cargando autenticacion...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          {/* Mostrar formulario de Clerk directamente al entrar por URL */}
          <div className="rounded-xl overflow-hidden" style={{
            border: '1px solid rgba(0, 243, 255, 0.15)',
            boxShadow: '0 0 40px rgba(0, 243, 255, 0.05)',
          }}>
            <SignIn
              routing="hash"
              signUpUrl="#/admin"
              fallbackRedirectUrl="#/admin"
              appearance={{
                elements: {
                  rootBox: { background: 'transparent' },
                  card: { background: 'rgba(15, 23, 42, 0.95)', border: 'none' },
                  headerTitle: { color: '#e2e8f0' },
                  headerSubtitle: { color: '#94a3b8' },
                  socialButtonsBlockButton: { border: '1px solid rgba(100, 116, 139, 0.3)' },
                  formFieldLabel: { color: '#94a3b8' },
                  formFieldInput: { background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(100, 116, 139, 0.3)', color: '#e2e8f0' },
                  footerActionLink: { color: '#00f3ff' },
                  primaryButton: { background: '#00f3ff', color: '#0f172a', fontWeight: '600' },
                  primaryButtonHover: { background: '#22d3ee' },
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: 'pins', label: 'Pines', icon: <MapPin className="w-4 h-4" />, count: pines.length },
    { key: 'lineas', label: 'Líneas', icon: <Route className="w-4 h-4" />, count: lineas.length },
    { key: 'puntos', label: 'Puntos', icon: <CircleDot className="w-4 h-4" />, count: puntos.length },
    { key: 'notas', label: 'Notas', icon: <StickyNote className="w-4 h-4" />, count: notas.length },
    { key: 'refupz', label: 'Ref. UPZ', icon: <Crosshair className="w-4 h-4" /> },
    { key: 'recursos', label: 'Recursos', icon: <FolderOpen className="w-4 h-4" /> },
    { key: 'analisis', label: 'Analisis', icon: <MessageCircle className="w-4 h-4" /> },
    { key: 'labels', label: 'Textos', icon: <Type className="w-4 h-4" />, count: textLabels.length },
    { key: 'exportar', label: 'Exportar', icon: <Download className="w-4 h-4" /> },
  ];

  const getUPZBarrios = (upzNombre: string) => {
    const upz = upzData.find((u) => u.nombre === upzNombre);
    return upz?.barrios || [];
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-950 pt-16">
        {/* Alert Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 right-4 z-[2000] px-4 py-3 rounded-lg border shadow-lg flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400'
                : 'bg-red-950/90 border-red-500/30 text-red-400'
            }`}
          >
            {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span className="text-sm">{message.text}</span>
            <button onClick={() => setMessage(null)} className="ml-2"><X className="w-3 h-3" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-950 border-r border-cyan-500/20 flex-shrink-0 hidden lg:flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-slate-300">Administración</h2>
            <p className="text-xs text-slate-500 mt-1">Gestión del mapa de Suba</p>
          </div>
          <nav className="p-2 space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setSubTab('form'); }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  tab === t.key
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                {t.icon}
                {t.label}
                <span className="ml-auto text-xs bg-slate-800 px-2 py-0.5 rounded-full">{t.count}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MousePointerClick className="w-3 h-3" />
              <span>Haz clic en el mapa para capturar coordenadas</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Tabs */}
          <div className="lg:hidden flex border-b border-slate-800 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setSubTab('form'); }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs whitespace-nowrap ${
                  tab === t.key
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400'
                }`}
              >
                {t.icon}
                {t.label}
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-full">{t.count}</span>
              </button>
            ))}
          </div>

          {/* Sub Tabs - ocultos cuando es refupz, recursos o analisis */}
          {tab !== 'refupz' && tab !== 'recursos' && tab !== 'analisis' && tab !== 'exportar' && (
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setSubTab('form')}
                className={`flex items-center gap-2 px-4 py-3 text-sm ${
                  subTab === 'form'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'pins' && (editingPinId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                {tab === 'lineas' && (editingLineaId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                {tab === 'puntos' && (editingPuntoId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                {tab === 'labels' && (editingLabelId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                {tab === 'notas' && (editingNotaId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                {subTab === 'form' ? 'Formulario' : 'Lista'}
              </button>
              <button
                onClick={() => setSubTab('list')}
                className={`flex items-center gap-2 px-4 py-3 text-sm ${
                  subTab === 'list'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <List className="w-4 h-4" />
                Lista
              </button>
            </div>
          )}

          {tab === 'refupz' ? (
            /* ===== REFERENCIA UPZ LAYOUT ===== */
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 h-[calc(100vh-7rem)]">
              {/* Map */}
              <div className="h-[50vh] xl:h-full relative">
                <MapaSuba
                  ref={mapaRef}
                  pines={pines}
                  pinSeleccionado={null}
                  onPinSelect={() => {}}
                  onMapClick={handleMapClick}
                  isAdmin={true}
                  lineas={lineas}
                  puntosLinea={puntos}
                  textLabels={textLabels}
                      />
                <div className="absolute top-2 left-2 z-[1000] bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-cyan-500/20">
                  <p className="text-xs text-cyan-400 flex items-center gap-1.5">
                    <Crosshair className="w-3 h-3" />
                    {upzRefSeleccionada
                      ? `Clic en el mapa para definir referencia de: ${upzRefSeleccionada}`
                      : 'Selecciona una UPZ de la lista para definir su punto de referencia'}
                  </p>
                </div>
              </div>

              {/* UPZ List */}
              <div className="p-4 xl:p-6 overflow-y-auto bg-slate-950">
                <div className="max-w-lg mx-auto">
                  <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2 mb-4">
                    <Crosshair className="w-5 h-5 text-cyan-400" />
                    Puntos de Referencia UPZ
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Selecciona una UPZ y haz clic en el mapa para definir dónde centrará el mapa cuando un usuario la seleccione.
                  </p>
                  <div className="space-y-2">
                    {upzData.map((upz) => {
                      const centro = centrosUPZ[upz.nombre];
                      const isSelected = upzRefSeleccionada === upz.nombre;
                      return (
                        <button
                          key={upz.id}
                          onClick={() => setUpzRefSeleccionada(upz.nombre)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                            isSelected
                              ? 'bg-cyan-500/10 border border-cyan-500/30'
                              : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{
                              background: upz.colorNeon,
                              boxShadow: `0 0 6px ${upz.colorNeon}`,
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <span className={`text-xs font-medium block ${isSelected ? 'text-cyan-400' : 'text-slate-300'}`}>
                              {upz.nombre}
                            </span>
                            {centro && (
                              <span className="text-[10px] text-slate-500 font-mono">
                                {centro[0].toFixed(4)}, {centro[1].toFixed(4)}
                              </span>
                            )}
                          </div>
                          {isSelected && (
                            <span className="text-[10px] text-cyan-400 font-medium flex-shrink-0">Seleccionado</span>
                          )}
                          {centro && !isSelected && (
                            <MapPin className="w-3 h-3 text-slate-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : tab === 'recursos' ? (
            /* ===== RECURSOS EDITOR ===== */
            <AdminRecursos />
          ) : tab === 'analisis' ? (
            /* ===== ANALISIS EDITOR ===== */
            <AdminAnalisis />
          ) : tab === 'exportar' ? (
            /* ===== EXPORTAR DATOS ===== */
            <AdminExportador />
          ) : subTab === 'form' ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
              {/* Map */}
              <div className="h-[40vh] xl:h-[calc(100vh-8rem)] relative">
                <MapaSuba
                  ref={mapaRef}
                  pines={pines}
                  pinSeleccionado={null}
                  onPinSelect={() => {}}
                  onMapClick={handleMapClick}
                  isAdmin={true}
                  lineas={lineas}
                  puntosLinea={puntos}
                  textLabels={textLabels}
                      />
                <div className="absolute top-2 left-2 z-[1000] bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-cyan-500/20">
                  <p className="text-xs text-cyan-400 flex items-center gap-1.5">
                    <MousePointerClick className="w-3 h-3" />
                    {tab === 'lineas' ? `Modo Línea: ${lineCoords.length} puntos agregados` : 'Modo Admin: Clic en el mapa para capturar coordenadas'}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="p-4 xl:p-6 overflow-y-auto">
                <div className="max-w-lg mx-auto">
                  {/* ===== PIN FORM ===== */}
                  {tab === 'pins' && (
                    <form onSubmit={handlePinSubmit} className="space-y-4">
                      <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                        {editingPinId ? <Edit3 className="w-5 h-5 text-cyan-400" /> : <Plus className="w-5 h-5 text-cyan-400" />}
                        {editingPinId ? 'Editar Pin' : 'Nuevo Pin'}
                      </h2>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Título *</Label>
                        <Input value={pinForm.titulo} onChange={(e) => setPinForm({ ...pinForm, titulo: e.target.value })} placeholder="Ej: Parque Principal de Suba" required
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Descripción</Label>
                        <Textarea value={pinForm.descripcion} onChange={(e) => setPinForm({ ...pinForm, descripcion: e.target.value })} placeholder="Describe este lugar..." rows={3}
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 resize-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-slate-300 text-xs">Latitud *</Label>
                          <Input type="number" step="any" value={pinForm.latitud} onChange={(e) => setPinForm({ ...pinForm, latitud: e.target.value })} placeholder="4.743100" required
                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-300 text-xs">Longitud *</Label>
                          <Input type="number" step="any" value={pinForm.longitud} onChange={(e) => setPinForm({ ...pinForm, longitud: e.target.value })} placeholder="-74.074000" required
                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">UPZ *</Label>
                        <Select value={pinForm.upz} onValueChange={(value) => setPinForm({ ...pinForm, upz: value, barrio: '' })}>
                          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200"><SelectValue placeholder="Selecciona una UPZ" /></SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700 max-h-60">
                            {upzData.map((upz) => (
                              <SelectItem key={upz.id} value={upz.nombre} className="text-slate-200">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ background: upz.colorNeon }} />{upz.nombre}</div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Barrio *</Label>
                        <Select value={pinForm.barrio} onValueChange={(value) => setPinForm({ ...pinForm, barrio: value })} disabled={!pinForm.upz}>
                          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200"><SelectValue placeholder={pinForm.upz ? 'Selecciona un barrio' : 'Primero selecciona una UPZ'} /></SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700 max-h-60">
                            {getUPZBarrios(pinForm.upz).map((barrio) => (
                              <SelectItem key={barrio} value={barrio} className="text-slate-200">{barrio}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">URL de Imagen</Label>
                        <Input type="url" value={pinForm.imagen_url} onChange={(e) => setPinForm({ ...pinForm, imagen_url: e.target.value })} placeholder="https://ejemplo.com/imagen.jpg"
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">URL de Video (YouTube)</Label>
                        <Input type="url" value={pinForm.video_url} onChange={(e) => setPinForm({ ...pinForm, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..."
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>

                      {/* Tamaño del Pin */}
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          Tamaño del pin: {pinForm.tamano}px
                        </Label>
                        <Slider
                          value={[pinForm.tamano]}
                          onValueChange={(v) => setPinForm({ ...pinForm, tamano: v[0] })}
                          min={16}
                          max={48}
                          step={2}
                          className="py-2"
                        />
                        <p className="text-[10px] text-slate-600">Arrastra para cambiar el tamaño del pin en el mapa</p>
                      </div>

                      {/* Galeria de Imagenes */}
                      <div className="border-t border-slate-800 pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-300 text-xs flex items-center gap-1.5">
                            <Image className="w-3.5 h-3.5 text-cyan-400" />
                            Galeria de Imagenes ({pinForm.galeria_imagenes.length})
                          </Label>
                          <button
                            type="button"
                            onClick={() => setPinForm({ ...pinForm, galeria_imagenes: [...pinForm.galeria_imagenes, ''] })}
                            className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Agregar
                          </button>
                        </div>
                        {pinForm.galeria_imagenes.map((url, i) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              type="url"
                              value={url}
                              onChange={(e) => {
                                const updated = [...pinForm.galeria_imagenes];
                                updated[i] = e.target.value;
                                setPinForm({ ...pinForm, galeria_imagenes: updated });
                              }}
                              placeholder="https://ejemplo.com/imagen.jpg"
                              className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => setPinForm({ ...pinForm, galeria_imagenes: pinForm.galeria_imagenes.filter((_, idx) => idx !== i) })}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Galeria de Videos */}
                      <div className="border-t border-slate-800 pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-300 text-xs flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5 text-emerald-400" />
                            Galeria de Videos ({pinForm.galeria_videos.length})
                          </Label>
                          <button
                            type="button"
                            onClick={() => setPinForm({ ...pinForm, galeria_videos: [...pinForm.galeria_videos, { url: '', titulo: '' }] })}
                            className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Agregar
                          </button>
                        </div>
                        {pinForm.galeria_videos.map((v, i) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              type="url"
                              value={v.url}
                              onChange={(e) => {
                                const updated = [...pinForm.galeria_videos];
                                updated[i] = { ...updated[i], url: e.target.value };
                                setPinForm({ ...pinForm, galeria_videos: updated });
                              }}
                              placeholder="URL del video"
                              className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 text-xs flex-1"
                            />
                            <Input
                              type="text"
                              value={v.titulo}
                              onChange={(e) => {
                                const updated = [...pinForm.galeria_videos];
                                updated[i] = { ...updated[i], titulo: e.target.value };
                                setPinForm({ ...pinForm, galeria_videos: updated });
                              }}
                              placeholder="Titulo"
                              className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 text-xs w-28"
                            />
                            <button
                              type="button"
                              onClick={() => setPinForm({ ...pinForm, galeria_videos: pinForm.galeria_videos.filter((_, idx) => idx !== i) })}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Notas del Pin */}
                      <div className="border-t border-slate-800 pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                            <StickyNote className="w-3.5 h-3.5 text-emerald-400" />
                            Notas ({pinForm.notas.length})
                          </h4>
                          {!mostrarNotaEditor && (
                            <button
                              type="button"
                              onClick={() => { setMostrarNotaEditor(true); setEditandoNotaIndex(null); }}
                              className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Agregar
                            </button>
                          )}
                        </div>

                        {/* Lista de notas existentes */}
                        {pinForm.notas.length > 0 && (
                          <div className="space-y-1.5">
                            {pinForm.notas.map((nota, idx) => (
                              <div
                                key={nota.id}
                                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-900/60 border border-slate-800"
                              >
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: nota.color }} />
                                <span className="text-xs text-slate-300 flex-1 truncate">{nota.nombre}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditandoNotaIndex(idx);
                                    setMostrarNotaEditor(true);
                                  }}
                                  className="text-slate-500 hover:text-cyan-400"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPinForm(prev => ({
                                      ...prev,
                                      notas: prev.notas.filter((_, i) => i !== idx),
                                    }));
                                  }}
                                  className="text-slate-500 hover:text-red-400"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Editor de notas */}
                        {mostrarNotaEditor && (
                          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-3">
                            <NotaEditor
                              nota={editandoNotaIndex !== null ? pinForm.notas[editandoNotaIndex] : null}
                              onSave={(nombre, color, contenido) => {
                                if (editandoNotaIndex !== null) {
                                  // Editar existente
                                  setPinForm(prev => ({
                                    ...prev,
                                    notas: prev.notas.map((n, i) =>
                                      i === editandoNotaIndex
                                        ? { ...n, nombre, color, contenido }
                                        : n
                                    ),
                                  }));
                                } else {
                                  // Nueva nota
                                  setPinForm(prev => ({
                                    ...prev,
                                    notas: [
                                      ...prev.notas,
                                      {
                                        id: `nota-${Date.now()}`,
                                        nombre,
                                        color,
                                        contenido,
                                        creado_at: new Date().toISOString(),
                                      },
                                    ],
                                  }));
                                }
                                setMostrarNotaEditor(false);
                                setEditandoNotaIndex(null);
                              }}
                              onClose={() => {
                                setMostrarNotaEditor(false);
                                setEditandoNotaIndex(null);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold">
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingPinId ? <Edit3 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                          {editingPinId ? 'Actualizar' : 'Guardar'}
                        </Button>
                        {editingPinId && (
                          <Button type="button" variant="outline" onClick={() => { setEditingPinId(null); setPinForm(emptyPinForm); }}
                            className="border-slate-700 text-slate-400 hover:bg-slate-800"><X className="w-4 h-4 mr-2" />Cancelar</Button>
                        )}
                      </div>
                    </form>
                  )}

                  {/* ===== LINEA FORM ===== */}
                  {tab === 'lineas' && (
                    <form onSubmit={handleLineaSubmit} className="space-y-4">
                      <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                        {editingLineaId ? <Edit3 className="w-5 h-5 text-orange-400" /> : <Plus className="w-5 h-5 text-orange-400" />}
                        {editingLineaId ? 'Editar Línea' : 'Nueva Línea'}
                      </h2>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Nombre *</Label>
                        <Input value={lineaForm.nombre} onChange={(e) => setLineaForm({ ...lineaForm, nombre: e.target.value })} placeholder="Ej: Av. Ciudad de Cali" required
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Descripción</Label>
                        <Textarea value={lineaForm.descripcion} onChange={(e) => setLineaForm({ ...lineaForm, descripcion: e.target.value })} placeholder="Describe esta ruta..." rows={3}
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 resize-none" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Color</Label>
                        <div className="flex flex-wrap gap-2">
                          {COLORS.map((c) => (
                            <button key={c} type="button" onClick={() => setLineaForm({ ...lineaForm, color: c })}
                              className={`w-8 h-8 rounded-lg border-2 transition-all ${lineaForm.color === c ? 'border-white scale-110' : 'border-transparent hover:border-white/30'}`}
                              style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Grosor: {lineaForm.grosor}px</Label>
                        <Slider value={[lineaForm.grosor]} onValueChange={(v) => setLineaForm({ ...lineaForm, grosor: v[0] })} min={1} max={10} step={1}
                          className="py-2" />
                      </div>

                      {/* Opciones de linea avanzadas */}
                      <div className="space-y-2 border border-slate-800 rounded-lg p-3 bg-slate-900/30">
                        <p className="text-xs text-slate-400 font-medium mb-2">Opciones avanzadas</p>

                        {/* Seguir vias */}
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${lineaForm.snapToRoad ? 'bg-orange-500 border-orange-500' : 'border-slate-600 group-hover:border-slate-500'}`}>
                            {lineaForm.snapToRoad && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={lineaForm.snapToRoad}
                            onChange={(e) => setLineaForm({ ...lineaForm, snapToRoad: e.target.checked })}
                            className="sr-only"
                          />
                          <span className="text-xs text-slate-300">Seguir vías (calcula ruta por calles)</span>
                        </label>

                        {/* Cerrar figura */}
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${lineaForm.cerrada ? 'bg-orange-500 border-orange-500' : 'border-slate-600 group-hover:border-slate-500'}`}>
                            {lineaForm.cerrada && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={lineaForm.cerrada}
                            onChange={(e) => setLineaForm({ ...lineaForm, cerrada: e.target.checked })}
                            className="sr-only"
                          />
                          <span className="text-xs text-slate-300">Cerrar figura (conecta último punto con el primero)</span>
                        </label>

                        {/* Filtro tecnologico - solo visible si cerrada */}
                        {lineaForm.cerrada && (
                          <label className="flex items-center gap-2.5 cursor-pointer group ml-5">
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${lineaForm.filtrar ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600 group-hover:border-slate-500'}`}>
                              {lineaForm.filtrar && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input
                              type="checkbox"
                              checked={lineaForm.filtrar}
                              onChange={(e) => setLineaForm({ ...lineaForm, filtrar: e.target.checked })}
                              className="sr-only"
                            />
                            <span className="text-xs text-slate-300">Aplicar filtro tecnológico translúcido</span>
                          </label>
                        )}
                      </div>

                      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-2">Puntos de la línea ({lineCoords.length}):</p>
                        {lineCoords.length === 0 ? (
                          <p className="text-xs text-slate-600">Haz clic en el mapa para agregar puntos</p>
                        ) : (
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {lineCoords.map((coord, i) => (
                              <div key={i} className="flex items-center justify-between text-xs text-slate-400 font-mono">
                                <span>Punto {i + 1}: {coord[0].toFixed(4)}, {coord[1].toFixed(4)}</span>
                                <button type="button" onClick={() => setLineCoords((prev) => prev.filter((_, idx) => idx !== i))}
                                  className="text-red-400 hover:text-red-300"><X className="w-3 h-3" /></button>
                              </div>
                            ))}
                          </div>
                        )}
                        {lineCoords.length > 0 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => setLineCoords([])}
                            className="mt-2 border-slate-700 text-slate-400 hover:bg-slate-800 text-xs">
                            Limpiar puntos
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                          <Save className="w-4 h-4 mr-2" />
                          {editingLineaId ? 'Actualizar' : 'Guardar'} Línea
                        </Button>
                        {editingLineaId && (
                          <Button type="button" variant="outline" onClick={() => { setEditingLineaId(null); setLineaForm(emptyLineaForm); setLineCoords([]); }}
                            className="border-slate-700 text-slate-400 hover:bg-slate-800"><X className="w-4 h-4 mr-2" />Cancelar</Button>
                        )}
                      </div>
                    </form>
                  )}

                  {/* ===== PUNTO FORM ===== */}
                  {tab === 'puntos' && (
                    <form onSubmit={handlePuntoSubmit} className="space-y-4">
                      <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                        {editingPuntoId ? <Edit3 className="w-5 h-5 text-purple-400" /> : <Plus className="w-5 h-5 text-purple-400" />}
                        {editingPuntoId ? 'Editar Punto' : 'Nuevo Punto'}
                      </h2>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Línea *</Label>
                        <Select value={puntoForm.linea_id} onValueChange={(value) => setPuntoForm({ ...puntoForm, linea_id: value })}>
                          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200"><SelectValue placeholder="Selecciona una línea" /></SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700 max-h-60">
                            {lineas.map((l) => (
                              <SelectItem key={l.id} value={l.id} className="text-slate-200">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ background: l.color }} />{l.nombre}</div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Título *</Label>
                        <Input value={puntoForm.titulo} onChange={(e) => setPuntoForm({ ...puntoForm, titulo: e.target.value })} placeholder="Ej: Estación TransMilenio" required
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Descripción</Label>
                        <Textarea value={puntoForm.descripcion} onChange={(e) => setPuntoForm({ ...puntoForm, descripcion: e.target.value })} placeholder="Describe este punto..." rows={3}
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 resize-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-slate-300 text-xs">Latitud *</Label>
                          <Input type="number" step="any" value={puntoForm.latitud} onChange={(e) => setPuntoForm({ ...puntoForm, latitud: e.target.value })} placeholder="4.743100" required
                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-300 text-xs">Longitud *</Label>
                          <Input type="number" step="any" value={puntoForm.longitud} onChange={(e) => setPuntoForm({ ...puntoForm, longitud: e.target.value })} placeholder="-74.074000" required
                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Tamaño del punto: {puntoForm.tamano}px</Label>
                        <Slider value={[puntoForm.tamano]} onValueChange={(v) => setPuntoForm({ ...puntoForm, tamano: v[0] })} min={6} max={20} step={1}
                          className="py-2" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Color</Label>
                        <div className="flex flex-wrap gap-2">
                          {COLORS.map((c) => (
                            <button key={c} type="button" onClick={() => setPuntoForm({ ...puntoForm, color: c })}
                              className={`w-8 h-8 rounded-lg border-2 transition-all ${puntoForm.color === c ? 'border-white scale-110' : 'border-transparent hover:border-white/30'}`}
                              style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">URL de Imagen</Label>
                        <Input type="url" value={puntoForm.imagen_url} onChange={(e) => setPuntoForm({ ...puntoForm, imagen_url: e.target.value })} placeholder="https://ejemplo.com/imagen.jpg"
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Orden en la línea</Label>
                        <Input type="number" value={puntoForm.orden} onChange={(e) => setPuntoForm({ ...puntoForm, orden: e.target.value })} min={1}
                          className="bg-slate-900 border-slate-700 text-slate-200 font-mono text-sm" />
                      </div>

                      {/* Galeria de Imagenes */}
                      <div className="border-t border-slate-800 pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-300 text-xs flex items-center gap-1.5">
                            <Image className="w-3.5 h-3.5 text-cyan-400" />
                            Galeria de Imagenes ({puntoForm.galeria_imagenes.length})
                          </Label>
                          <button
                            type="button"
                            onClick={() => setPuntoForm({ ...puntoForm, galeria_imagenes: [...puntoForm.galeria_imagenes, ''] })}
                            className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Agregar
                          </button>
                        </div>
                        {puntoForm.galeria_imagenes.map((url, i) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              type="url"
                              value={url}
                              onChange={(e) => {
                                const updated = [...puntoForm.galeria_imagenes];
                                updated[i] = e.target.value;
                                setPuntoForm({ ...puntoForm, galeria_imagenes: updated });
                              }}
                              placeholder="https://ejemplo.com/imagen.jpg"
                              className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => setPuntoForm({ ...puntoForm, galeria_imagenes: puntoForm.galeria_imagenes.filter((_, idx) => idx !== i) })}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Galeria de Videos */}
                      <div className="border-t border-slate-800 pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-300 text-xs flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5 text-emerald-400" />
                            Galeria de Videos ({puntoForm.galeria_videos.length})
                          </Label>
                          <button
                            type="button"
                            onClick={() => setPuntoForm({ ...puntoForm, galeria_videos: [...puntoForm.galeria_videos, { url: '', titulo: '' }] })}
                            className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Agregar
                          </button>
                        </div>
                        {puntoForm.galeria_videos.map((v, i) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              type="url"
                              value={v.url}
                              onChange={(e) => {
                                const updated = [...puntoForm.galeria_videos];
                                updated[i] = { ...updated[i], url: e.target.value };
                                setPuntoForm({ ...puntoForm, galeria_videos: updated });
                              }}
                              placeholder="URL del video"
                              className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 text-xs flex-1"
                            />
                            <Input
                              type="text"
                              value={v.titulo}
                              onChange={(e) => {
                                const updated = [...puntoForm.galeria_videos];
                                updated[i] = { ...updated[i], titulo: e.target.value };
                                setPuntoForm({ ...puntoForm, galeria_videos: updated });
                              }}
                              placeholder="Titulo"
                              className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 text-xs w-28"
                            />
                            <button
                              type="button"
                              onClick={() => setPuntoForm({ ...puntoForm, galeria_videos: puntoForm.galeria_videos.filter((_, idx) => idx !== i) })}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Notas del Punto */}
                      <div className="border-t border-slate-800 pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                            <StickyNote className="w-3.5 h-3.5 text-emerald-400" />
                            Notas ({puntoForm.notas.length})
                          </h4>
                          {!mostrarNotaEditor && (
                            <button
                              type="button"
                              onClick={() => { setMostrarNotaEditor(true); setEditandoNotaIndex(null); }}
                              className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Agregar
                            </button>
                          )}
                        </div>
                        {puntoForm.notas.length > 0 && (
                          <div className="space-y-1.5">
                            {puntoForm.notas.map((nota, idx) => (
                              <div
                                key={nota.id}
                                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-900/60 border border-slate-800"
                              >
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: nota.color }} />
                                <span className="text-xs text-slate-300 flex-1 truncate">{nota.nombre}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditandoNotaIndex(idx);
                                    setMostrarNotaEditor(true);
                                  }}
                                  className="text-slate-500 hover:text-cyan-400"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPuntoForm(prev => ({
                                      ...prev,
                                      notas: prev.notas.filter((_, i) => i !== idx),
                                    }));
                                  }}
                                  className="text-slate-500 hover:text-red-400"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        {mostrarNotaEditor && (
                          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-3">
                            <NotaEditor
                              nota={editandoNotaIndex !== null ? puntoForm.notas[editandoNotaIndex] : null}
                              onSave={(nombre, color, contenido) => {
                                if (editandoNotaIndex !== null) {
                                  setPuntoForm(prev => ({
                                    ...prev,
                                    notas: prev.notas.map((n, i) =>
                                      i === editandoNotaIndex
                                        ? { ...n, nombre, color, contenido }
                                        : n
                                    ),
                                  }));
                                } else {
                                  setPuntoForm(prev => ({
                                    ...prev,
                                    notas: [
                                      ...prev.notas,
                                      {
                                        id: `nota-${Date.now()}`,
                                        nombre,
                                        color,
                                        contenido,
                                        creado_at: new Date().toISOString(),
                                      },
                                    ],
                                  }));
                                }
                                setMostrarNotaEditor(false);
                                setEditandoNotaIndex(null);
                              }}
                              onClose={() => {
                                setMostrarNotaEditor(false);
                                setEditandoNotaIndex(null);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold">
                          <Save className="w-4 h-4 mr-2" />
                          {editingPuntoId ? 'Actualizar' : 'Guardar'} Punto
                        </Button>
                        {editingPuntoId && (
                          <Button type="button" variant="outline" onClick={() => { setEditingPuntoId(null); setPuntoForm(emptyPuntoForm); }}
                            className="border-slate-700 text-slate-400 hover:bg-slate-800"><X className="w-4 h-4 mr-2" />Cancelar</Button>
                        )}
                      </div>
                    </form>
                  )}

                  {/* ===== LABEL FORM ===== */}
                  {tab === 'labels' && (
                    <form onSubmit={handleLabelSubmit} className="space-y-4">
                      <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                        {editingLabelId ? <Edit3 className="w-5 h-5 text-pink-400" /> : <Plus className="w-5 h-5 text-pink-400" />}
                        {editingLabelId ? 'Editar Texto' : 'Nuevo Texto en Mapa'}
                      </h2>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Texto *</Label>
                        <Input value={labelForm.texto} onChange={(e) => setLabelForm({ ...labelForm, texto: e.target.value })} placeholder="Ej: Barrio El Rincon" required
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-slate-300 text-xs">Latitud *</Label>
                          <Input type="number" step="any" value={labelForm.latitud} onChange={(e) => setLabelForm({ ...labelForm, latitud: e.target.value })} placeholder="4.743100" required
                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-300 text-xs">Longitud *</Label>
                          <Input type="number" step="any" value={labelForm.longitud} onChange={(e) => setLabelForm({ ...labelForm, longitud: e.target.value })} placeholder="-74.074000" required
                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Tamaño de fuente: {labelForm.fontSize}px</Label>
                        <Slider value={[labelForm.fontSize]} onValueChange={(v) => setLabelForm({ ...labelForm, fontSize: v[0] })} min={8} max={32} step={1}
                          className="py-2" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Rotacion: {labelForm.rotacion}°</Label>
                        <Slider value={[labelForm.rotacion]} onValueChange={(v) => setLabelForm({ ...labelForm, rotacion: v[0] })} min={-180} max={180} step={5}
                          className="py-2" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Color</Label>
                        <div className="flex flex-wrap gap-2">
                          {COLORS.map((c) => (
                            <button key={c} type="button" onClick={() => setLabelForm({ ...labelForm, color: c })}
                              className={`w-8 h-8 rounded-lg border-2 transition-all ${labelForm.color === c ? 'border-white scale-110' : 'border-transparent hover:border-white/30'}`}
                              style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold">
                          <Save className="w-4 h-4 mr-2" />
                          {editingLabelId ? 'Actualizar' : 'Guardar'} Texto
                        </Button>
                        {editingLabelId && (
                          <Button type="button" variant="outline" onClick={() => { setEditingLabelId(null); setLabelForm(emptyLabelForm); }}
                            className="border-slate-700 text-slate-400 hover:bg-slate-800"><X className="w-4 h-4 mr-2" />Cancelar</Button>
                        )}
                      </div>
                    </form>
                  )}

                  {/* ===== NOTA FORM ===== */}
                  {tab === 'notas' && (
                    <form onSubmit={handleNotaSubmit} className="space-y-4">
                      <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                        {editingNotaId ? <Edit3 className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5 text-emerald-400" />}
                        {editingNotaId ? 'Editar Nota' : 'Nueva Nota'}
                      </h2>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Nombre del bloque *</Label>
                        <Input value={notaForm.nombre} onChange={(e) => setNotaForm({ ...notaForm, nombre: e.target.value })} placeholder="Ej: Notas de la UPZ" required
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Color</Label>
                        <div className="flex flex-wrap gap-2">
                          {COLORS.map((c) => (
                            <button key={c} type="button" onClick={() => setNotaForm({ ...notaForm, color: c })}
                              className={`w-8 h-8 rounded-lg border-2 transition-all ${notaForm.color === c ? 'border-white scale-110' : 'border-transparent hover:border-white/30'}`}
                              style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-slate-300 text-xs">Latitud *</Label>
                          <Input type="number" step="any" value={notaForm.latitud} onChange={(e) => setNotaForm({ ...notaForm, latitud: e.target.value })} placeholder="4.743100" required
                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-300 text-xs">Longitud *</Label>
                          <Input type="number" step="any" value={notaForm.longitud} onChange={(e) => setNotaForm({ ...notaForm, longitud: e.target.value })} placeholder="-74.074000" required
                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Título de la nota</Label>
                        <Input value={notaForm.titulo_nota} onChange={(e) => setNotaForm({ ...notaForm, titulo_nota: e.target.value })} placeholder="Título interno de la nota"
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Contenido inicial</Label>
                        <Textarea value={notaForm.contenido} onChange={(e) => setNotaForm({ ...notaForm, contenido: e.target.value })} placeholder="Contenido HTML de la nota..." rows={4}
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 resize-none font-mono text-xs" />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                          <Save className="w-4 h-4 mr-2" />
                          {editingNotaId ? 'Actualizar' : 'Guardar'} Nota
                        </Button>
                        {editingNotaId && (
                          <Button type="button" variant="outline" onClick={() => { setEditingNotaId(null); setNotaForm(emptyNotaForm); }}
                            className="border-slate-700 text-slate-400 hover:bg-slate-800"><X className="w-4 h-4 mr-2" />Cancelar</Button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* List View */
            <div className="p-4 xl:p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <List className="w-5 h-5 text-cyan-400" />
                  {tab === 'pins' && 'Lista de Pines'}
                  {tab === 'lineas' && 'Lista de Líneas'}
                  {tab === 'puntos' && 'Lista de Puntos'}
                  {tab === 'notas' && 'Lista de Notas'}
                </h2>

                {/* PIN LIST */}
                {tab === 'pins' && (
                  <>
                    {pines.length === 0 ? (
                      <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
                        <MapPin className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500">No hay pines registrados</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {pines.map((pin) => (
                          <motion.div key={pin.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-200 truncate">{pin.titulo}</h3>
                                <div className="flex flex-wrap gap-2 mt-1.5">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{pin.upz}</span>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{pin.barrio}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{pin.descripcion}</p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button variant="ghost" size="sm" onClick={() => handleEditPin(pin)}
                                  className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"><Edit3 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(`pin-${pin.id}`)}
                                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
                              </div>
                            </div>
                            {showDeleteConfirm === `pin-${pin.id}` && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-3">
                                <p className="text-xs text-red-400 flex-1">¿Eliminar este pin?</p>
                                <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(null)} className="border-slate-700 text-slate-400">Cancelar</Button>
                                <Button variant="destructive" size="sm" onClick={() => { removePin(pin.id); setShowDeleteConfirm(null); }} className="bg-red-600 hover:bg-red-700"><Trash2 className="w-3 h-3 mr-1" />Eliminar</Button>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* LINEA LIST */}
                {tab === 'lineas' && (
                  <>
                    {lineas.length === 0 ? (
                      <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
                        <Route className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500">No hay líneas registradas</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {lineas.map((linea) => (
                          <motion.div key={linea.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ background: linea.color, boxShadow: `0 0 6px ${linea.color}` }} />
                                  <h3 className="text-sm font-semibold text-slate-200 truncate">{linea.nombre}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1.5">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{linea.coordenadas.length} puntos</span>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">Grosor: {linea.grosor}px</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{linea.descripcion}</p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button variant="ghost" size="sm" onClick={() => { setEditingLineaId(linea.id); setLineaForm({ nombre: linea.nombre, descripcion: linea.descripcion, color: linea.color, grosor: linea.grosor, snapToRoad: linea.snapToRoad || false, cerrada: linea.cerrada || false, filtrar: linea.filtrar || false }); setLineCoords(linea.coordenadas); setSubTab('form'); }}
                                  className="text-slate-400 hover:text-orange-400 hover:bg-orange-500/10"><Edit3 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(`linea-${linea.id}`)}
                                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
                              </div>
                            </div>
                            {showDeleteConfirm === `linea-${linea.id}` && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-3">
                                <p className="text-xs text-red-400 flex-1">¿Eliminar esta línea y todos sus puntos?</p>
                                <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(null)} className="border-slate-700 text-slate-400">Cancelar</Button>
                                <Button variant="destructive" size="sm" onClick={() => { removeLinea(linea.id); setShowDeleteConfirm(null); }} className="bg-red-600 hover:bg-red-700"><Trash2 className="w-3 h-3 mr-1" />Eliminar</Button>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* PUNTO LIST */}
                {tab === 'puntos' && (
                  <>
                    {puntos.length === 0 ? (
                      <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
                        <CircleDot className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500">No hay puntos registrados</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {puntos.map((punto) => (
                          <motion.div key={punto.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ background: punto.color, boxShadow: `0 0 6px ${punto.color}` }} />
                                  <h3 className="text-sm font-semibold text-slate-200 truncate">{punto.titulo}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1.5">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Tamaño: {punto.tamano}px</span>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">Orden: {punto.orden}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{punto.descripcion}</p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button variant="ghost" size="sm" onClick={() => { setEditingPuntoId(punto.id); setPuntoForm({ titulo: punto.titulo, descripcion: punto.descripcion, latitud: punto.latitud.toString(), longitud: punto.longitud.toString(), linea_id: punto.linea_id, tamano: punto.tamano, color: punto.color, imagen_url: punto.imagen_url, imagen_descarga_url: punto.imagen_descarga_url, video_url: punto.video_url, orden: punto.orden.toString(), notas: punto.notas, galeria_imagenes: punto.galeria_imagenes ? [...punto.galeria_imagenes] : [], galeria_videos: punto.galeria_videos ? [...punto.galeria_videos] : [] }); setSubTab('form'); }}
                                  className="text-slate-400 hover:text-purple-400 hover:bg-purple-500/10"><Edit3 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(`punto-${punto.id}`)}
                                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
                              </div>
                            </div>
                            {showDeleteConfirm === `punto-${punto.id}` && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-3">
                                <p className="text-xs text-red-400 flex-1">¿Eliminar este punto?</p>
                                <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(null)} className="border-slate-700 text-slate-400">Cancelar</Button>
                                <Button variant="destructive" size="sm" onClick={() => { removePunto(punto.id); setShowDeleteConfirm(null); }} className="bg-red-600 hover:bg-red-700"><Trash2 className="w-3 h-3 mr-1" />Eliminar</Button>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* LABEL LIST */}
                {tab === 'labels' && (
                  <>
                    {textLabels.length === 0 ? (
                      <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
                        <Type className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500">No hay textos en el mapa</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {textLabels.map((label) => (
                          <motion.div key={label.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold" style={{ color: label.color, textShadow: `0 0 8px ${label.color}80` }}>{label.texto}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1.5">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{label.fontSize}px</span>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{label.rotacion}°</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-mono">{label.latitud.toFixed(4)}, {label.longitud.toFixed(4)}</p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button variant="ghost" size="sm" onClick={() => handleEditLabel(label)}
                                  className="text-slate-400 hover:text-pink-400 hover:bg-pink-500/10"><Edit3 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(`label-${label.id}`)}
                                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
                              </div>
                            </div>
                            {showDeleteConfirm === `label-${label.id}` && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-3">
                                <p className="text-xs text-red-400 flex-1">¿Eliminar este texto?</p>
                                <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(null)} className="border-slate-700 text-slate-400">Cancelar</Button>
                                <Button variant="destructive" size="sm" onClick={() => { removeLabel(label.id); setShowDeleteConfirm(null); }} className="bg-red-600 hover:bg-red-700"><Trash2 className="w-3 h-3 mr-1" />Eliminar</Button>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* NOTA LIST */}
                {tab === 'notas' && (
                  <>
                    {notas.length === 0 ? (
                      <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
                        <StickyNote className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500">No hay notas registradas</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {notas.map((nota) => (
                          <motion.div key={nota.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded" style={{ background: nota.color, boxShadow: `0 0 6px ${nota.color}` }} />
                                  <h3 className="text-sm font-semibold text-slate-200 truncate">{nota.nombre}</h3>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">{nota.nota.titulo}</p>
                                <p className="text-xs text-slate-500 mt-1 font-mono">{nota.latitud.toFixed(4)}, {nota.longitud.toFixed(4)}</p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button variant="ghost" size="sm" onClick={() => { setEditingNotaId(nota.id); setNotaForm({ nombre: nota.nombre, color: nota.color, latitud: nota.latitud.toString(), longitud: nota.longitud.toString(), titulo_nota: nota.nota.titulo, contenido: nota.nota.contenido }); setSubTab('form'); }}
                                  className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"><Edit3 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(`nota-${nota.id}`)}
                                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
                              </div>
                            </div>
                            {showDeleteConfirm === `nota-${nota.id}` && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-3">
                                <p className="text-xs text-red-400 flex-1">¿Eliminar esta nota?</p>
                                <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(null)} className="border-slate-700 text-slate-400">Cancelar</Button>
                                <Button variant="destructive" size="sm" onClick={() => { removeNota(nota.id); setShowDeleteConfirm(null); }} className="bg-red-600 hover:bg-red-700"><Trash2 className="w-3 h-3 mr-1" />Eliminar</Button>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  );
}
