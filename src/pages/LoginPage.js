import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Import apiClient to make API requests

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Destructure login from AuthContext
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the API using apiClient
      const response = await apiClient.post('/login', { email, password });

      if (response.data.token) {
        // If login is successful, call the login function from AuthContext
        login(response.data.token);
        console.log(response.data.token)

        // Redirect the user to the home page or dashboard
        navigate('/generate');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Error logging in. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <label htmlFor="email" className="block text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="block text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
