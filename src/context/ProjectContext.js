import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/apiClient'; // Import apiClient to make API requests
import { AuthContext } from './AuthProvider';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { user } = useContext(AuthContext);  // Get user context for authentication
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProjectData();
    }
  }, [user]);

  // Fetch project data for the current user
  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/project', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProjectData(response.data);
    } catch (err) {
      setError('Failed to fetch project data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new project
  const addProject = async (project) => {
    try {
      const response = await apiClient.post('/project', project, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProjectData([...projectData, response.data]);
    } catch (err) {
      setError('Failed to add project.');
      console.error(err);
    }
  };

  // Update project
  const updateProject = async (projectId, updatedData) => {
    try {
      const response = await apiClient.put(`/project/${projectId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProjectData(
        projectData.map((proj) =>
          proj._id === projectId ? { ...proj, ...updatedData } : proj
        )
      );
    } catch (err) {
      setError('Failed to update project.');
      console.error(err);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      await apiClient.delete(`/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProjectData(projectData.filter((proj) => proj._id !== projectId));
    } catch (err) {
      setError('Failed to delete project.');
      console.error(err);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projectData,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
