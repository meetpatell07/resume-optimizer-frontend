import apiClient from './apiClient';

// 🔹 Generate Optimized Resume
export const generateResume = async (jobId) => {
  const response = await apiClient.post(`/resumes/optimize/${jobId}`);
  return response.data;
};
