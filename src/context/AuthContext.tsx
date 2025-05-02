
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('forestImpactUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This is a frontend-only mock - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      // Mock successful login
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0]
      };
      
      setUser(newUser);
      localStorage.setItem('forestImpactUser', JSON.stringify(newUser));
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login: ' + (error instanceof Error ? error.message : 'Unknown error'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // This is a frontend-only mock - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock successful signup
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name
      };
      
      setUser(newUser);
      localStorage.setItem('forestImpactUser', JSON.stringify(newUser));
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account: ' + (error instanceof Error ? error.message : 'Unknown error'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forestImpactUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
