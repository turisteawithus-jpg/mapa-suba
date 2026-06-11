import { useState, useEffect } from 'react';

const CLERK_KEY = typeof import.meta !== 'undefined'
  ? (import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY || '')
  : '';

const IS_CLERK_CONFIGURED = CLERK_KEY.length > 0 && !CLERK_KEY.includes('placeholder');

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

interface AuthState {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: AuthUser | null;
  openSignIn: () => void;
  signOut: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    isSignedIn: false,
    isLoaded: !IS_CLERK_CONFIGURED, // Cargado inmediatamente si no hay Clerk
    user: null,
    openSignIn: () => {
      window.location.href = '/#/admin';
    },
    signOut: async () => {},
  });

  useEffect(() => {
    // Si Clerk NO esta configurado, usar mock
    if (!IS_CLERK_CONFIGURED) {
      setState({
        isSignedIn: false,
        isLoaded: true,
        user: null,
        openSignIn: () => {
          window.location.href = '/#/admin';
        },
        signOut: async () => {},
      });
      return;
    }

    // Si Clerk SI esta configurado, escuchar cambios de auth
    let mounted = true;

    function checkClerkAuth() {
      try {
        const clerk = (window as any).Clerk;
        if (!clerk || !mounted) return;

        const isSignedIn = clerk.session?.status === 'active';
        const user = clerk.user;

        setState({
          isSignedIn,
          isLoaded: true,
          user: user ? {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress || '',
            fullName: user.fullName || '',
          } : null,
          openSignIn: () => {
            window.location.href = '/#/admin';
          },
          signOut: async () => {
            await clerk.signOut();
            window.location.reload();
          },
        });
      } catch {
        // Si falla, usar mock
        if (mounted) {
          setState({
            isSignedIn: false,
            isLoaded: true,
            user: null,
            openSignIn: () => {
              window.location.href = '/#/admin';
            },
            signOut: async () => {},
          });
        }
      }
    }

    // Esperar a que Clerk este listo
    const interval = setInterval(() => {
      const clerk = (window as any).Clerk;
      if (clerk?.loaded) {
        clearInterval(interval);
        checkClerkAuth();

        // Suscribirse a cambios de sesion
        clerk.addListener((resources: any) => {
          if (!mounted) return;
          const isSignedIn = resources.session?.status === 'active';
          const user = resources.user;
          setState(prev => ({
            ...prev,
            isSignedIn,
            user: user ? {
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress || '',
              fullName: user.fullName || '',
            } : null,
          }));
        });
      }
    }, 100);

    // Timeout de seguridad
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (mounted && !state.isLoaded) {
        setState({
          isSignedIn: false,
          isLoaded: true,
          user: null,
          openSignIn: () => {
            window.location.href = '/#/admin';
          },
          signOut: async () => {},
        });
      }
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return state;
}

// Helper para saber si Clerk esta configurado
export function isClerkConfigured(): boolean {
  return IS_CLERK_CONFIGURED;
}
