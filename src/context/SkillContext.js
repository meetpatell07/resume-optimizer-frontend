import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';
import apiClient from '../api/apiClient'; // Import apiClient to make API requests


export const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
  const { user } = useContext(AuthContext);  // Get user context for authentication
  const [skillsData, setSkillsData] = useState({ technicalSkills: [], softSkills: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchSkillsData();
    }
  }, [user]);

  // Fetch skill data for the current user
  const fetchSkillsData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/skill', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // console.log(response.data)
      setSkillsData(response.data);
    } catch (err) {
      setError('Failed to fetch skills data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add skill data
  const addSkill = async (skill) => {
    try {
      const response = await apiClient.post('/skill', skill, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSkillsData({
        technicalSkills: response.data.technicalSkills,
        softSkills: response.data.softSkills,
      });
    } catch (err) {
      setError('Failed to add skill.');
      console.error(err);
    }
  };

  // Update skill data
  const updateSkill = async (skillId, updatedData) => {
    try {
      const response = await apiClient.put(`/api/skill/${skillId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSkillsData({
        technicalSkills: response.data.technicalSkills,
        softSkills: response.data.softSkills,
      });
    } catch (err) {
      setError('Failed to update skill.');
      console.error(err);
    }
  };

  // Delete skill data
  const deleteSkill = async (skillId) => {
    try {
      await apiClient.delete(`/api/skill/${skillId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSkillsData({
        technicalSkills: skillsData.technicalSkills.filter((skill) => skill._id !== skillId),
        softSkills: skillsData.softSkills.filter((skill) => skill._id !== skillId),
      });
    } catch (err) {
      setError('Failed to delete skill.');
      console.error(err);
    }
  };

  return (
    <SkillContext.Provider
      value={{
        skillsData,
        loading,
        error,
        addSkill,
        updateSkill,
        deleteSkill,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};
