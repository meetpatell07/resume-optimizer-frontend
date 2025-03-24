import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <h1>AI Resume Optimizer</h1>
      <p>Optimize your resume for ATS with AI</p>
      <Link to="/job-description">
        <button className="btn-primary">Get Started</button>
      </Link>
    </div>
  );
};

export default HomePage;
