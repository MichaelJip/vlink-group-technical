import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/useApi';

export interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  meta: {
    status: number;
    message: string;
  };
  data: T;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedGoogleUser = await AsyncStorage.getItem('googleUser');

        if (storedToken) {
          setTokenState(storedToken);
          const response = await api.get<ApiResponse<User>>('/auth/me');
          setUser(response.data.data);
        } else if (storedGoogleUser) {
          //
        }
      } catch {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('googleUser');
        setTokenState(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  const fetchUserMe = async () => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    setUser(response.data.data);
  };

  const setToken = async (newToken: string) => {
    await AsyncStorage.setItem('token', newToken);
    setTokenState(newToken);
    await fetchUserMe();
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('googleUser');
    setTokenState(null);
    setUser(null);
  };

  // Authenticated jika ada token (normal login) atau googleUser (Google login)
  const isAuthenticated = !!(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
