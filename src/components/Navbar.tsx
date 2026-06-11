import { useState } from 'react';
import { Shield, LogIn, LogOut, User, Settings, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function ConfigModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuracion Requerida
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-300">
            Para usar el panel de administracion, debes configurar Clerk y Supabase.
            Sigue estos pasos:
          </p>

          <div className="space-y-3">
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">1</span>
                Clerk (Autenticacion)
              </h4>
              <ol className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
                <li>Ve a <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">clerk.com</a> y crea una cuenta</li>
                <li>Crea una nueva aplicacion</li>
                <li>Copia tu <strong>Publishable Key</strong></li>
                <li>En Vercel, agrega la variable: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">VITE_CLERK_PUBLISHABLE_KEY</code></li>
                <li>Activa <strong>Restricted Mode</strong> y <strong>Allowlist</strong> con tu email</li>
              </ol>
            </div>

            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                Supabase (Base de Datos)
              </h4>
              <ol className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
                <li>Ve a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">supabase.com</a></li>
                <li>Crea un proyecto nuevo</li>
                <li>En SQL Editor, ejecuta el schema de la tabla <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">pines_mapa</code></li>
                <li>Copia la <strong>URL</strong> y <strong>anon key</strong></li>
                <li>En Vercel, agrega: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">VITE_SUPABASE_URL</code> y <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">VITE_SUPABASE_ANON_KEY</code></li>
              </ol>
            </div>
          </div>

          <div className="bg-amber-950/30 border border-amber-500/20 rounded-lg p-3">
            <p className="text-xs text-amber-400">
              <strong>Nota:</strong> Actualmente la app muestra datos de demostracion. Una vez conectado Supabase, podras agregar, editar y eliminar pines reales desde el panel de administracion.
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold"
          >
            Entendido
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const { isSignedIn, user, signOut } = useAuth();
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const [showConfig, setShowConfig] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="flex items-center justify-between px-4 py-2.5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-slate-700/80 rounded-lg p-1.5 border border-slate-600/50 group-hover:bg-slate-600/80 group-hover:border-slate-500/50 transition-all">
              <img
                src="/logo-cla.png"
                alt="CLA Logo"
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-cyan-400 tracking-wider leading-tight">
                MAPA INTERACTIVO
              </h1>
              <p className="text-[9px] text-slate-500 -mt-0.5 tracking-widest uppercase">
                Localidad de Suba - Bogota
              </p>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 rounded-lg border border-cyan-500/20">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-300">
                    {(user as any)?.primaryEmailAddress?.emailAddress || 'Admin'}
                  </span>
                </div>
                {!isAdmin && (
                  <Link to="/admin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                    >
                      <Shield className="w-4 h-4 mr-1.5" />
                      Panel Admin
                    </Button>
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                    >
                      Ver Mapa
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfig(true)}
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                Ingresar
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Config Modal */}
      <ConfigModal open={showConfig} onClose={() => setShowConfig(false)} />
    </>
  );
}
