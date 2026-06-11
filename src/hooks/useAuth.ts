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
    isLoaded: false,
    user: null,
    openSignIn: () => {},
    signOut: async () => {},
  });

  useEffect(() => {
    // Si Clerk NO esta configurado, marcar como cargado con mock
    if (!IS_CLERK_CONFIGURED) {
      setState({
        isSignedIn: false,
        isLoaded: true,
        user: null,
        openSignIn: () => {},
        signOut: async () => {},
      });
      return;
    }

    // Clerk configurado — esperar a que este listo
    let mounted = true;

    function initAuth() {
      const clerk = (window as any).Clerk;
      if (!clerk || !clerk.loaded || !mounted) return false;

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
        openSignIn: () => {},
        signOut: async () => {
          await clerk.signOut();
          window.location.href = '/#/admin';
        },
      });
      return true;
    }

    // Intentar cada 200ms hasta que Clerk este listo
    const interval = setInterval(() => {
      if (initAuth()) {
        clearInterval(interval);
      }
    }, 200);

    // Timeout de seguridad: 8 segundos
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (mounted) {
        setState(prev => prev.isLoaded ? prev : {
          isSignedIn: false,
          isLoaded: true,
          user: null,
          openSignIn: () => {},
          signOut: async () => {},
        });
      }
    }, 8000);

    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return state;
}

export function isClerkConfigured(): boolean {
  return IS_CLERK_CONFIGURED;
}

// Esperar a que Clerk JS SDK este cargado en window
export function waitForClerk(callback: () => void): () => void {
  if (!IS_CLERK_CONFIGURED) {
    return () => {};
  }

  let cancelled = false;
  const interval = setInterval(() => {
    if (cancelled) {
      clearInterval(interval);
      return;
    }
    const clerk = (window as any).Clerk;
    if (clerk?.loaded) {
      clearInterval(interval);
      callback();
    }
  }, 200);

  return () => {
    cancelled = true;
    clearInterval(interval);
  };
}
