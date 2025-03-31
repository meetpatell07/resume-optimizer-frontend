import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Generator from './pages/Generator';
import JobDescriptionPage from './pages/JobDescriptionPage';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import Navbar from './components/Navbar';

import WelcomePage from './pages/WelcomePage'; // Import WelcomePage

import EducationPage from './pages/userData/EducationPage';
import ProjectPage from './pages/userData/ProjectPage';
import SkillPage from './pages/userData/SkillPage';
import TechnicalKnowledgePage from './pages/userData/TechnicalKnowledgePage';
import VolunteerWorkPage from './pages/userData/VolunteerWorkPage';
import WorkExperiencePage from './pages/userData/WorkExperiencePage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';

import GenerateResumeAI from './pages/resumeAI/GenerateResumeAI';

import AppProvider from './context/AppProvider'; // Import the AppProvider



function App() {
  return (
    <AppProvider> {/* Wrap your entire app with AuthProvider */}
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/welcome" element={<WelcomePage />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/generate" element={<Generator />} />
          <Route path="/job-description" element={<JobDescriptionPage />} />

          <Route path="/generate-ai" element={<GenerateResumeAI />} />

          <Route path="/add-work-experience" element={<WorkExperiencePage />} />
          <Route path="/add-skills" element={<SkillPage />} />
          <Route path="/add-education" element={<EducationPage />} />
          <Route path="/add-volunteer-work" element={<VolunteerWorkPage />} />
          <Route path="/add-technical" element={<TechnicalKnowledgePage />} />
          <Route path="/add-project" element={<ProjectPage />} />

        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
