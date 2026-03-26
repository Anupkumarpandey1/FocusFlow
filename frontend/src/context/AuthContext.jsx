import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // In a robust app, you would fetch /api/users/me here to validate token
      // For this MVP, restoring from localStorage keeps it fast.
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  let API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
  // Bulletproof against trailing slashes and missing /api from the user's Vercel config
  if (API_BASE.endsWith('/')) API_BASE = API_BASE.slice(0, -1);
  if (!API_BASE.endsWith('/api')) API_BASE = `${API_BASE}/api`;

  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE}/users/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user context!
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    await axios.post(`${API_BASE}/users/register`, { name, email, password });
    // After successful register, immediately login
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
        {!loading && children}
    </AuthContext.Provider>
  );
};
