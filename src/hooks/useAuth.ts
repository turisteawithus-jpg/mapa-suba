import { useState, useEffect } from 'react';

interface AuthState {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: any;
  openSignIn: () => void;
  signOut: () => Promise<void>;
}

const clerkKey = import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY || '';

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    isSignedIn: false,
    isLoaded: false,
    user: null,
    openSignIn: () => {},
    signOut: async () => {},
  });

  useEffect(() => {
    // Si NO hay Clerk configurado, usar mock
    if (!clerkKey || clerkKey.includes('placeholder')) {
      setState({
        isSignedIn: false,
        isLoaded: true,
        user: null,
        openSignIn: () => {},
        signOut: async () => {},
      });
      return;
    }

    // Si Clerk SI esta configurado, cargarlo dinamicamente
    let cancelled = false;

    async function loadClerk() {
      try {
        const { useAuth: useClerkAuth } = await import('@clerk/clerk-react');
        // Clerk se cargara cuando el provider este disponible
        if (!cancelled) {
          setState({
            isSignedIn: false,
            isLoaded: true,
            user: null,
            openSignIn: () => {
              window.location.href = '#/admin';
            },
            signOut: async () => {},
          });
        }
      } catch {
        // Fallback al mock si Clerk falla
        if (!cancelled) {
          setState({
            isSignedIn: false,
            isLoaded: true,
            user: null,
            openSignIn: () => {},
            signOut: async () => {},
          });
        }
      }
    }

    loadClerk();
    return () => { cancelled = true; };
  }, []);

  return state;
}
