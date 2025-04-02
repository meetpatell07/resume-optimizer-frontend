import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import apiClient from '../api/apiClient'; // Import apiClient to make API requests

export const TechnicalKnowledgeContext = createContext();

export const TechnicalKnowledgeProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user context for authentication
  const [technicalKnowledge, setTechnicalKnowledge] = useState({
    programmingLanguages: [],
    toolsAndFrameworks: [],
    certifications: [],
    otherDetails: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchTechnicalKnowledgeData();
    }
  }, [user]);

  // Fetch technical knowledge data for the current user
  const fetchTechnicalKnowledgeData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/technical', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTechnicalKnowledge(response.data);
    } catch (err) {
      setError('Failed to fetch technical knowledge data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new technical knowledge data
  const addTechnicalKnowledge = async (knowledge) => {
    try {
      const response = await apiClient.post('/technical', knowledge, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Append the new knowledge to the respective category (e.g., programmingLanguages)
      setTechnicalKnowledge((prevData) => ({
        ...prevData,
        ...response.data, // This assumes the backend returns an updated object with all fields
      }));
    } catch (err) {
      setError('Failed to add technical knowledge.');
      console.error(err);
    }
  };

  // Update existing technical knowledge data
  const updateTechnicalKnowledge = async (techId, updatedData) => {
    try {
      const response = await apiClient.put(`/technical/${techId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Replace the updated knowledge in the state
      setTechnicalKnowledge((prevData) => ({
        ...prevData,
        ...response.data, // Again assuming the backend returns the full updated data object
      }));
    } catch (err) {
      setError('Failed to update technical knowledge.');
      console.error(err);
    }
  };

  // Delete specific technical knowledge data by ID
  const deleteTechnicalKnowledge = async (techId) => {
    try {
      await apiClient.delete(`/technical/${techId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Filter out the deleted item from the relevant category
      setTechnicalKnowledge((prevData) => {
        const updatedData = { ...prevData };
        
        updatedData.programmingLanguages = updatedData.programmingLanguages.filter(
          (tech) => tech._id !== techId
        );
        updatedData.toolsAndFrameworks = updatedData.toolsAndFrameworks.filter(
          (tech) => tech._id !== techId
        );
        updatedData.certifications = updatedData.certifications.filter(
          (tech) => tech._id !== techId
        );

        return updatedData;
      });
    } catch (err) {
      setError('Failed to delete technical knowledge.');
      console.error(err);
    }
  };

  return (
    <TechnicalKnowledgeContext.Provider
      value={{
        technicalKnowledge,
        loading,
        error,
        addTechnicalKnowledge,
        updateTechnicalKnowledge,
        deleteTechnicalKnowledge,
      }}
    >
      {children}
    </TechnicalKnowledgeContext.Provider>
  );
};
