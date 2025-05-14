'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from "react"; 
import { AuthContextType, AuthProviderProps, AuthState } from "types/AuthStateTypes";

const AuthContext = createContext<AuthContextType | null>(null); 

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const picture = localStorage.getItem('profilePicture');
    if (token) {
      setAuthState({
        isAuthenticated: true,
        user: { picture },
        token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}