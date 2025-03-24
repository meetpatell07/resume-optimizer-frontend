import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDescriptionPage from './pages/JobDescriptionPage';
import ResumeGenerationPage from './pages/ResumeGenerationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job-description" element={<JobDescriptionPage />} />
        <Route path="/resume-generation" element={<ResumeGenerationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
