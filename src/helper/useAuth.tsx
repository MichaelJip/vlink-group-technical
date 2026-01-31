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

export interface GoogleUser {
  email: string;
  name: string;
  photo: string;
  idToken: string;
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
  googleUser: GoogleUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setToken: (token: string) => Promise<void>;
  setGoogleUser: (googleUser: GoogleUser) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [googleUser, setGoogleUserState] = useState<GoogleUser | null>(null);
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
          setGoogleUserState(JSON.parse(storedGoogleUser));
        }
      } catch {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('googleUser');
        setTokenState(null);
        setUser(null);
        setGoogleUserState(null);
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

  const setGoogleUser = async (newGoogleUser: GoogleUser) => {
    await AsyncStorage.setItem('googleUser', JSON.stringify(newGoogleUser));
    setGoogleUserState(newGoogleUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('googleUser');
    setTokenState(null);
    setUser(null);
    setGoogleUserState(null);
  };

  const isAuthenticated = !!(token && user) || !!googleUser;

  return (
    <AuthContext.Provider
      value={{
        user,
        googleUser,
        token,
        isLoading,
        isAuthenticated,
        setToken,
        setGoogleUser,
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
