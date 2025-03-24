import React, { useState } from 'react';
import { generateResume } from '../services/apiService';

const ResumeGenerationPage = () => {
  const [resume, setResume] = useState(null);
  const [atsScore, setAtsScore] = useState(null);

  const handleGenerate = async () => {
    const response = await generateResume({ /* send necessary data */ });
    setResume(response.resume);
    setAtsScore(response.atsScore);
  };

  return (
    <div>
      <button onClick={handleGenerate}>Generate Resume</button>
      {resume && <div>{resume}</div>}
      {atsScore && <div>ATS Score: {atsScore}</div>}
    </div>
  );
};

export default ResumeGenerationPage;
