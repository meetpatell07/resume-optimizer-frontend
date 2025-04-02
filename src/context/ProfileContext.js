import React, { createContext, useState, useEffect, useContext } from "react";
import apiClient from '../api/apiClient'; // Import apiClient to make API requests
import { AuthContext } from './AuthProvider';

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);  // Get user context for authentication
  

  // Fetch user profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/user", {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
      });
      setProfile(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updatedData) => {
    setLoading(true);
    try {
      const response = await apiClient.put(
        `/update-user`,
        updatedData,
        {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }
      );
      setProfile(response.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update profile" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error, fetchProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
