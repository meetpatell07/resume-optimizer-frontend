import React, { useState, useContext } from 'react';
import { loginUser } from '../api/authService';
import { AuthContext } from '../context/AuthProvider';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      login(response.token); // 🔹 Save token in AuthContext
      console.log('User logged in:', response);
    } catch (error) {
      console.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-5">
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 mb-2" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 mb-2" />
      <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
    </form>
  );
};

export default LoginPage;
