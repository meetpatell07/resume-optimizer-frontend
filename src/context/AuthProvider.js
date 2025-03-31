// context/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken } from '../api/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { // Named export
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
