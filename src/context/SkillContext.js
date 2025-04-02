import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import apiClient from '../api/apiClient'; // Import apiClient to make API requests

// Create SkillContext
const SkillContext = createContext();

// SkillContext Provider Component
export const SkillProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch skills by user ID
  useEffect(() => {
    if (user) {
      fetchSkills(user.id);
    }
  }, [user]);

  // Function to fetch skills from the server
  const fetchSkills = async (userId) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/skill`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSkills(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching skills');
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new skill
  const addSkill = async (skillData) => {
    try {
      const response = await apiClient.post('/skill', skillData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSkills((prevSkills) => [...prevSkills, response.data]);
    } catch (err) {
      setError('Error adding skill');
    }
  };

  // Function to update an existing skill
  const updateSkill = async (skillId, updatedData) => {
    try {
      const response = await apiClient.put(`/skill/${skillId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill._id === skillId ? response.data : skill
        )
      );
    } catch (err) {
      setError('Error updating skill');
    }
  };

  // Function to delete a skill
  const deleteSkill = async (skillId) => {
    try {
      await apiClient.delete(`/skill/${skillId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== skillId));
    } catch (err) {
      setError('Error deleting skill');
    }
  };

  return (
    <SkillContext.Provider
      value={{
        skills,
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

// Custom hook to use SkillContext
export const useSkills = () => {
  return useContext(SkillContext);
};
