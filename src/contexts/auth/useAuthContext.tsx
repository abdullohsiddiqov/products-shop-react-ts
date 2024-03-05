import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../services/api/http';
import { IEntity } from '../../services/types/types';


interface User {
  name: string;
  password?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: IEntity.UserSignIn) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const login = async (data: IEntity.UserSignIn) => {
    try {
      const response = await http.post('/api/v1/users/', data);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, logout, isLoggedIn, login }}>
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