import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

import apiClient from '../api/apiClient'; // Import apiClient to make API requests


export const VolunteerWorkContext = createContext();

export const VolunteerWorkProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user context for authentication
  const [volunteerWork, setVolunteerWork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchVolunteerWorkData();
    }
  }, [user]);

  // Fetch volunteer work data for the current user
  const fetchVolunteerWorkData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/volunteer', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setVolunteerWork(response.data);
    } catch (err) {
      setError('Failed to fetch volunteer work data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add volunteer work data
  const addVolunteerWork = async (work) => {
    try {
      const response = await apiClient.post('/volunteer', work, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setVolunteerWork([...volunteerWork, response.data]);
    } catch (err) {
      setError('Failed to add volunteer work.');
      console.error(err);
    }
  };

  // Update volunteer work data
  const updateVolunteerWork = async (workId, updatedData) => {
    try {
      const response = await apiClient.put(`/volunteer/${workId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setVolunteerWork(
        volunteerWork.map((work) => (work._id === workId ? response.data : work))
      );
    } catch (err) {
      setError('Failed to update volunteer work.');
      console.error(err);
    }
  };

  // Delete volunteer work data
  const deleteVolunteerWork = async (workId) => {
    try {
      await apiClient.delete(`/volunteer/${workId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setVolunteerWork(volunteerWork.filter((work) => work._id !== workId));
    } catch (err) {
      setError('Failed to delete volunteer work.');
      console.error(err);
    }
  };

  return (
    <VolunteerWorkContext.Provider
      value={{
        volunteerWork,
        loading,
        error,
        addVolunteerWork,
        updateVolunteerWork,
        deleteVolunteerWork,
      }}
    >
      {children}
    </VolunteerWorkContext.Provider>
  );
};
