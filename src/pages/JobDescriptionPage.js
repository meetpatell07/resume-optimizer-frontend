import React, { useState } from 'react';
import { submitJobDescription } from '../../services/apiService';

const JobDescriptionPage = () => {
  const [jobDescription, setJobDescription] = useState({
    title: '',
    description: '',
    skillsRequired: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await submitJobDescription(jobDescription);
    console.log('Job description submitted:', response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={jobDescription.title}
        onChange={(e) => setJobDescription({ ...jobDescription, title: e.target.value })}
      />
      <textarea
        placeholder="Job Description"
        value={jobDescription.description}
        onChange={(e) => setJobDescription({ ...jobDescription, description: e.target.value })}
      />
      <textarea
        placeholder="Skills Required"
        value={jobDescription.skillsRequired}
        onChange={(e) => setJobDescription({ ...jobDescription, skillsRequired: e.target.value })}
      />
      <button type="submit">Submit Job Description</button>
    </form>
  );
};

export default JobDescriptionPage;
