import { ReactNode } from "react";

export type User = { 
    picture: string | null; 
    name?: string; 
    email?: string;
}; 

export type AuthState = { 
    isAuthenticated: boolean; 
    user: User | null; 
    token: string | null;
};

export type AuthContextType = { 
    authState: AuthState; 
    setAuthState: (authState: AuthState) => void;
};

export type AuthProviderProps = { 
    children: ReactNode;
};