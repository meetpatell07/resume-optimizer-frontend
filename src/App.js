import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Generator from "./pages/Generator";

import JobDescriptionPage from './pages/JobDescriptionPage';
import ResumeGenerationPage from './pages/ResumeGenerationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generator />} />
      </Routes>
    </Router>
  );
}

export default App;
