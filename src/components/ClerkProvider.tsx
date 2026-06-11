import { useState, useEffect, type ReactNode } from 'react';

const CLERK_KEY = typeof import.meta !== 'undefined'
  ? (import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY || '')
  : '';

const IS_CLERK_CONFIGURED = CLERK_KEY.length > 0 && !CLERK_KEY.includes('placeholder');

// Exportar para usar en otros lugares
export function isClerkConfigured(): boolean {
  return IS_CLERK_CONFIGURED;
}

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const [ClerkModule, setClerkModule] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Si Clerk NO esta configurado, no cargar nada
    if (!IS_CLERK_CONFIGURED) {
      setLoaded(true);
      return;
    }

    // Cargar Clerk dinamicamente
    import('@clerk/clerk-react').then((mod) => {
      setClerkModule(mod);
      setLoaded(true);
    }).catch(() => {
      // Si falla la carga, continuar sin Clerk
      setLoaded(true);
    });
  }, []);

  // Mientras carga Clerk, mostrar un spinner minimo
  if (!loaded) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#020617',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '2px solid rgba(0, 243, 255, 0.2)',
          borderTop: '2px solid #00f3ff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    );
  }

  // Si Clerk esta configurado y cargado, envolver con ClerkProvider
  if (IS_CLERK_CONFIGURED && ClerkModule?.ClerkProvider) {
    const { ClerkProvider } = ClerkModule;
    return (
      <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
        {children}
      </ClerkProvider>
    );
  }

  // Si Clerk NO esta configurado, renderizar sin envoltura
  return <>{children}</>;
}
