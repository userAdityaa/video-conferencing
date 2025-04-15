import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User { 
    id: string; 
    name: string;
    email: string;
}

export const useGoogleAuth = () => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const token = localStorage.getItem('authToken');
            if (token) {
              const response = await axios.get('/api/auth/verify', {
                headers: { Authorization: `Bearer ${token}` }
              });
              setIsAuthenticated(true);
              setUser(response.data.user);
            }
          } catch (err) {
            console.error('Auth verification failed:', err);
            logout();
          } finally {
            setLoading(false);
          }
        };
    
        checkAuth();
    }, []);

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/login');
    };

    return { isAuthenticated, user, loading, logout };
}