import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';
import apiClient from '../api/apiClient'; // Import apiClient to make API requests


export const EducationContext = createContext();

export const EducationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);  // Get user context for authentication
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchEducationData();
    }
  }, [user]);

  // Fetch education data for the current user
  const fetchEducationData = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get('/education', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setEducationData(response.data);
    } catch (err) {
      setError('Failed to fetch education data.');
      console.log('Error fetching education data:', err.response ? err.response.data : err.message); // Log detailed error message
    } finally {
      setLoading(false);
    }
  };

  // Add education
  const addEducation = async (education) => {
    try {
      const response = await apiClient.post('/education', education, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEducationData([...educationData, response.data]);
    } catch (err) {
      setError('Failed to add education.');
      console.error(err);
    }
  };

  // Update education
  const updateEducation = async (educationId, updatedData) => {
    try {
      const response = await apiClient.put(`/education/${educationId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEducationData(
        educationData.map((edu) =>
          edu._id === educationId ? { ...edu, ...updatedData } : edu
        )
      );
    } catch (err) {
      setError('Failed to update education.');
      console.error(err);
    }
  };

  // Delete education
  const deleteEducation = async (educationId) => {
    try {
      await apiClient.delete(`/education/${educationId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEducationData(educationData.filter((edu) => edu._id !== educationId));
    } catch (err) {
      setError('Failed to delete education.');
      console.error(err);
    }
  };

  return (
    <EducationContext.Provider
      value={{
        educationData,
        loading,
        error,
        addEducation,
        updateEducation,
        deleteEducation,
      }}
    >
      {children}
    </EducationContext.Provider>
  );
};
