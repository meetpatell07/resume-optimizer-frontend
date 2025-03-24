import apiClient from './apiClient';

// 🔹 Submit Job Description
export const submitJobDescription = async (jobData) => {
  const response = await apiClient.post('/job-description', jobData);
  return response.data;
};

// 🔹 Fetch Job Description by ID
export const getJobDescription = async (jobId) => {
  const response = await apiClient.get(`/job-description/${jobId}`);
  return response.data;
};
