import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../services/api/http';
import { UserSignIn } from '../../services/types/types';

interface User {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: UserSignIn) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
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

  const login = async (data: UserSignIn) => {
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

  const isAdmin = () => {
    return (
      user?.name === 'gangdramma' &&
      user?.email === 'gangdramma@gmail.com' &&
      user?.password === 'root1234'
    );
  };

  return (
    <AuthContext.Provider value={{ user, logout, isLoggedIn, login, isAdmin }}>
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
