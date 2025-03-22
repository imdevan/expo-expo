import { createContext, useEffect, useState } from 'react';
import { AuthContextType, AuthCredentials, AuthState } from '@/types/auth';
import { fakeAuth } from '@/services/fakeAuth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing session on mount
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { user, error } = await fakeAuth.getCurrentUser();
      setState({
        user,
        isLoading: false,
        error: error || null,
      });
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: error as Error,
      });
    }
  };

  const signUp = async (credentials: AuthCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const response = await fakeAuth.signUp(credentials);
    setState((prev) => ({
      ...prev,
      user: response.user,
      isLoading: false,
      error: response.error,
    }));
    return response;
  };

  const signIn = async (credentials: AuthCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const response = await fakeAuth.signIn(credentials);
    setState((prev) => ({
      ...prev,
      user: response.user,
      isLoading: false,
      error: response.error,
    }));
    return response;
  };

  const signOut = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    await fakeAuth.signOut();
    setState({
      user: null,
      isLoading: false,
      error: null,
    });
  };

  // Don't render children until initial auth check is complete
  if (state.isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
