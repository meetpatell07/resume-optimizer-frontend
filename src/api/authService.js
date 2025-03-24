import apiClient from './apiClient';

// 🔹 User Login
export const loginUser = async (credentials) => {
  const response = await apiClient.post('/users/login', credentials);
  return response.data;
};

// 🔹 User Signup
export const signupUser = async (userData) => {
  const response = await apiClient.post('/users/signup', userData);
  return response.data;
};

// 🔹 Get User Profile
export const fetchUserProfile = async () => {
  const response = await apiClient.get('/users/profile');
  return response.data;
};
