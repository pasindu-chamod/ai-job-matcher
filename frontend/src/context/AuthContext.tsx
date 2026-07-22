import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { authService } from '../services/api';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(authService.getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const { user } = await authService.login(email, password);
      setUser(user);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Login failed. Please check your credentials.');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (fullName: string, email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const { user } = await authService.register(fullName, email, password);
      setUser(user);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Registration failed. Please try again.');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(''), []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};