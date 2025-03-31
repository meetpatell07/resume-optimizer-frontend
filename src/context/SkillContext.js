import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

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
      const response = await axios.get('/api/skills', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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
      const response = await axios.post('/api/skills', skill, {
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
      const response = await axios.put(`/api/skills/${skillId}`, updatedData, {
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
      await axios.delete(`/api/skills/${skillId}`, {
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
