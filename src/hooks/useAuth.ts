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

// Mock auth cuando Clerk NO esta configurado
function useMockAuth(): AuthState {
  return {
    isSignedIn: false,
    isLoaded: true,
    user: null,
    openSignIn: () => {
      window.dispatchEvent(new CustomEvent('show-config-modal'));
    },
    signOut: async () => {},
  };
}

// Auth real con Clerk cuando SI esta configurado
function useClerkAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    isSignedIn: false,
    isLoaded: false,
    user: null,
    openSignIn: () => {},
    signOut: async () => {},
  });

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        await import('@clerk/clerk-react');

        // Usar un componente wrapper para Clerk
        if (!mounted) return;

        setState({
          isSignedIn: false,
          isLoaded: true,
          user: null,
          openSignIn: () => {
            const event = new CustomEvent('clerk-sign-in');
            window.dispatchEvent(event);
          },
          signOut: async () => {
            try {
              const clerk = (window as any).Clerk;
              if (clerk) await clerk.signOut();
            } catch {
              // Silenciar error
            }
            window.location.reload();
          },
        });
      } catch {
        if (!mounted) return;
        // Fallback a mock si Clerk falla al cargar
        setState({
          isSignedIn: false,
          isLoaded: true,
          user: null,
          openSignIn: () => {
            window.dispatchEvent(new CustomEvent('show-config-modal'));
          },
          signOut: async () => {},
        });
      }
    }

    init();
    return () => { mounted = false; };
  }, []);

  return state;
}

export function useAuth(): AuthState {
  // Usar Clerk solo si esta configurado
  if (IS_CLERK_CONFIGURED) {
    return useClerkAuth();
  }
  return useMockAuth();
}

// Helper para saber si Clerk esta configurado (usado en Navbar)
export function isClerkConfigured(): boolean {
  return IS_CLERK_CONFIGURED;
}
