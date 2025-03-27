import apiClient from './apiClient';

// 🔹 Upload Resume (PDF/Doc File)
export const uploadResume = async (formData) => {
  const response = await apiClient.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// 🔹 Generate Optimized Resume (Based on Job ID)
export const generateResume = async (jobId) => {
  const response = await apiClient.post(`/resumes/optimize/${jobId}`);
  return response.data;
};

// 🔹 Fetch Optimized Resume (If already generated)
export const fetchOptimizedResume = async (resumeId) => {
  const response = await apiClient.get(`/resumes/${resumeId}`);
  return response.data;
};
