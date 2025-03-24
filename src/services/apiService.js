import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; // Change this to your backend URL

// Axios instance for backend API requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// POST request to submit job description
export const submitJobDescription = async (data) => {
  try {
    const response = await api.post('/job-description', data);
    return response.data;
  } catch (error) {
    console.error('Error submitting job description:', error);
  }
};

// POST request to generate optimized resume
export const generateResume = async (data) => {
  try {
    const response = await api.post('/resumes/optimize', data);
    return response.data;
  } catch (error) {
    console.error('Error generating resume:', error);
  }
};
