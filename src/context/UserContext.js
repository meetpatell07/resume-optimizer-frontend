import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/apiClient'; // Import apiClient to make API requests

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Store token separately

  // Fetch user profile from backend
  const fetchUserProfile = async () => {
    if (!token) return; // Do not attempt to fetch without a token

    try {
      setLoading(true);
      const response = await apiClient.get(`/user`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from the local storage
        },
      });

      // Handle successful response
      setUser(response.data.user);  // Set the user data
    } catch (err) {
      // Improved error handling
      console.error('Failed to fetch user data:', err);
      setError('Failed to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (updatedData) => {
    if (!token) return; // Do not attempt to update without a token

    try {
      setLoading(true);
      const response = await apiClient.put(`/user`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from local storage
        },
      });

      // Handle successful update
      console.log('Updated user data:', response.data.user);
      setUser(response.data.user);  // Update the user data
    } catch (err) {
      // Improved error handling
      console.error('Failed to update user data:', err);
      setError('Failed to update user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Manage user login (set token and fetch user data)
  const login = (userToken) => {
    localStorage.setItem('token', userToken); // Store the token securely
    setToken(userToken);
    fetchUserProfile(); // Fetch user data after login
  };

  // Manage user logout (clear token and user data)
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null);
    setUser(null); // Clear user data
  };

  // Fetch user on mount (after login)
  useEffect(() => {
    if (token) {
      fetchUserProfile();  // Fetch user profile if token exists
    }
  }, [token]);  // Re-fetch user when token is updated

  return (
    <UserContext.Provider value={{ user, loading, error, updateUserProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
