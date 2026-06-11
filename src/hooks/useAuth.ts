export function useAuth() {
  return {
    isSignedIn: false,
    isLoaded: true,
    user: null,
    openSignIn: () => {},
    signOut: async () => {},
  };
}
