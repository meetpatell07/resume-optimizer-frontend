import React, { useState } from 'react';
import { submitJobDescription } from '../api/jobService';

const JobDescriptionPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsRequired: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitJobDescription(formData);
      console.log('Job description submitted successfully:', response);
    } catch (error) {
      console.error('Failed to submit job description');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="border p-2 mb-2" />
      <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} className="border p-2 mb-2" />
      <textarea name="skillsRequired" placeholder="Skills Required" value={formData.skillsRequired} onChange={handleChange} className="border p-2 mb-2" />
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default JobDescriptionPage;
