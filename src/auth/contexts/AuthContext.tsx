import { createContext, useEffect, type ReactNode } from 'react';
import apiClient from '../../services/api-client';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// 🔐 Felhasználó típusa
type User = {
  username: string;
  role: 'user' | 'admin';
};

// 🔐 Context típusa
type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

// context létrehozása
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider komponens
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 🧠 Generikus localStorage hook használata
  const [token, setToken, removeToken] = useLocalStorage<string | null>('token', null);
  const [user, setUser, removeUser] = useLocalStorage<User | null>('user', null);
  const loading = false;

  // Token automatikus küldése minden kéréshez
  useEffect(() => {
    const id = apiClient.interceptors.request.use((config) => {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => apiClient.interceptors.request.eject(id);
  }, [token]);

  // Login logika
  const login = async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', { username, password });
    const { token: jwt, username: usern, role } = response.data;
  
    const normalizedRole = role.toLowerCase();
  
    setToken(jwt);
    setUser({ username: usern, role: normalizedRole });
  };

  // Logout logika
  const logout = () => {
    removeToken();
    removeUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};