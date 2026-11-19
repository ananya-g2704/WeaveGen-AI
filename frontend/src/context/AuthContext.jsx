import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, isSupabaseConfigured } from '../services/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to load user session:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await authService.signIn(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signup = async (fullName, email, password, role) => {
    const newUser = await authService.signUp(fullName, email, password, role);
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    await authService.signOut();
    setUser(null);
  };

  const selectRole = async (newRole) => {
    await authService.updateRole(newRole);
    setUser((prev) => (prev ? { ...prev, role: newRole } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDevMode: !isSupabaseConfigured,
        login,
        signup,
        logout,
        selectRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
