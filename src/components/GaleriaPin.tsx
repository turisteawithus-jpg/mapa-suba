import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Image, Video } from 'lucide-react';

interface GaleriaPinProps {
  imagenes?: string[];
  videos?: { url: string; titulo: string }[];
}

export function GaleriaPin({ imagenes, videos }: GaleriaPinProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    if (!ref.current) return;
    const amount = 180;
    ref.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const tieneImagenes = imagenes && imagenes.length > 0;
  const tieneVideos = videos && videos.length > 0;

  if (!tieneImagenes && !tieneVideos) return null;

  return (
    <div className="space-y-3">
      {tieneImagenes && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Image className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Galeria</span>
          </div>
          <div className="relative group">
            <div ref={imgRef} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
              {imagenes!.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all group/img relative">
                  <img src={url} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/30 transition-all flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                    <ExternalLink className="w-3 h-3 text-white" />
                  </div>
                </a>
              ))}
            </div>
            {imagenes!.length > 1 && (
              <>
                <button onClick={() => scroll(imgRef, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500/10">
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button onClick={() => scroll(imgRef, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500/10">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {tieneVideos && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Video className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Videos</span>
          </div>
          <div className="relative group">
            <div ref={vidRef} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
              {videos!.map((v, i) => (
                <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all group/vid relative flex items-center justify-center bg-slate-900">
                  <Play className="w-5 h-5 text-emerald-400 relative z-10 group-hover/vid:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  {v.titulo && <span className="absolute bottom-1 left-1.5 right-1.5 text-[8px] text-slate-300 truncate z-10">{v.titulo}</span>}
                </a>
              ))}
            </div>
            {videos!.length > 1 && (
              <>
                <button onClick={() => scroll(vidRef, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950/70 border border-emerald-500/30 text-emerald-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-500/10">
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button onClick={() => scroll(vidRef, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950/70 border border-emerald-500/30 text-emerald-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-500/10">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
