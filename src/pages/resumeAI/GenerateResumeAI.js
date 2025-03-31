import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient'; // Import the API client

const GenerateResumeAI = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    responsibilities: '',
    skillsRequired: '',
    qualifications: '',
    opportunities: '',
    otherDetails: '',
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle resume generation
  const handleGenerateResume = async () => {
    const {
      jobTitle,
      companyName,
      jobDescription,
      responsibilities,
      skillsRequired,
      qualifications,
      opportunities,
      otherDetails,
    } = formData;

    if (!jobDescription.trim()) {
      alert('Please enter the job description.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Sending POST request to the backend using apiClient
      const response = await apiClient.post('/jobs/generate-resume-ai', {
        jobTitle,
        companyName,
        jobDescription,
        responsibilities,
        skillsRequired,
        qualifications,
        opportunities,
        otherDetails,
      });

      const data = response.data;

      if (response.status === 200) {
        setResume(data.resume); // Set the generated resume
      } else {
        setError(data.error || 'Error generating resume');
      }
    } catch (err) {
      setError('An error occurred while generating the resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Generate Resume with AI</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            placeholder="Enter the job title..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Enter the company name..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            placeholder="Enter the job description here..."
            className="w-full p-2 border border-gray-300 rounded-md h-40"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleInputChange}
            placeholder="Enter job responsibilities..."
            className="w-full p-2 border border-gray-300 rounded-md h-20"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Skills Required</label>
          <input
            type="text"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleInputChange}
            placeholder="Enter required skills..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Qualifications</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleInputChange}
            placeholder="Enter qualifications..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Opportunities (optional)</label>
          <input
            type="text"
            name="opportunities"
            value={formData.opportunities}
            onChange={handleInputChange}
            placeholder="Enter opportunities (optional)..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Other Details (optional)</label>
          <input
            type="text"
            name="otherDetails"
            value={formData.otherDetails}
            onChange={handleInputChange}
            placeholder="Enter any other details (optional)..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleGenerateResume}
          className="w-full mt-4 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Generating Resume...' : 'Generate Resume'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {resume && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Your Generated Resume</h3>
          <div className="border p-6 rounded-md shadow-lg">
            <pre className="whitespace-pre-wrap">{resume}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateResumeAI;
