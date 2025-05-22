import React, { createContext, useContext, useState } from 'react';
import { users, AuthUser } from '../data/users';

interface AuthContextType {
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Store user in localStorage (exclude password)
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
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