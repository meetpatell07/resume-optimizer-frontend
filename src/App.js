import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider'; // Import the AuthProvider
import Home from './pages/HomePage';
import Generator from './pages/Generator';
import JobDescriptionPage from './pages/JobDescriptionPage';
import ResumeGenerationPage from './pages/ResumeGenerationPage';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import Navbar from './components/Navbar';

import WelcomePage from './pages/WelcomePage'; // Import WelcomePage



function App() {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/welcome" element={<WelcomePage />} /> 
          <Route path="/generate" element={<Generator />} />
          <Route path="/job-description" element={<JobDescriptionPage />} />
          <Route path="/resume-generation" element={<ResumeGenerationPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
