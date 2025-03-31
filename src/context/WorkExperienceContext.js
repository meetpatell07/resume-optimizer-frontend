import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

export const WorkExperienceContext = createContext();

export const WorkExperienceProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user context for authentication
  const [workExperience, setWorkExperience] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchWorkExperienceData();
    }
  }, [user]);

  // Fetch work experience data for the current user
  const fetchWorkExperienceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/workExperience', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWorkExperience(response.data);
    } catch (err) {
      setError('Failed to fetch work experience data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add work experience data
  const addWorkExperience = async (work) => {
    try {
      const response = await axios.post('/api/workExperience', work, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWorkExperience([...workExperience, response.data]);
    } catch (err) {
      setError('Failed to add work experience.');
      console.error(err);
    }
  };

  // Update work experience data
  const updateWorkExperience = async (workId, updatedData) => {
    try {
      const response = await axios.put(`/api/workExperience/${workId}/work-experience`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWorkExperience(
        workExperience.map((work) => (work._id === workId ? response.data : work))
      );
    } catch (err) {
      setError('Failed to update work experience.');
      console.error(err);
    }
  };

  // Delete work experience data
  const deleteWorkExperience = async (workId) => {
    try {
      await axios.delete(`/api/workExperience/${workId}/work-experience`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWorkExperience(workExperience.filter((work) => work._id !== workId));
    } catch (err) {
      setError('Failed to delete work experience.');
      console.error(err);
    }
  };

  return (
    <WorkExperienceContext.Provider
      value={{
        workExperience,
        loading,
        error,
        addWorkExperience,
        updateWorkExperience,
        deleteWorkExperience,
      }}
    >
      {children}
    </WorkExperienceContext.Provider>
  );
};
