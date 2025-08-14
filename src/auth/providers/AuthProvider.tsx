import { useEffect, useState, type ReactNode } from 'react';
import apiClient from '../../services/api-client';
import authClient from '../services/authClient';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AuthContext, type AuthContextType } from '../contexts/AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [token, setToken, removeToken] = useLocalStorage<string | null>('token', null);
  const [user, setUser, removeUser] = useLocalStorage<AuthContextType['user']>('user', null);
  const [loading, setLoading] = useState(true);

  // token automatikus küldése minden kéréshez
  useEffect(() => {
    const id = apiClient.interceptors.request.use((config) => {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => apiClient.interceptors.request.eject(id);
  }, [token]);

// Induláskori betöltés -> loading false-ra állítása
  useEffect(() => {
    setLoading(false);
  }, []);


  // Login logika
  const login = async (username: string, password: string) => {
    const response = await authClient.post('/login', { username, password });
    const { token: jwt, username: usern, role } = response.data;
  
    const roleToLowerCase = role.toLowerCase();
  
    setToken(jwt);
    setUser({ username: usern, role: roleToLowerCase });
    return roleToLowerCase;
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
