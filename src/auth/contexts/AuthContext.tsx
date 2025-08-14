import { createContext } from 'react';

// Felhasználó típusa
type User = {
  username: string;
  role: 'user' | 'admin';
};

// Context típusa
type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<'admin' | 'user'>;
  logout: () => void;
};

// context létrehozása
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export type { AuthContextType, User };