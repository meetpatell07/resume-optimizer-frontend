import React, { useContext, useState } from 'react';
import { WorkExperienceContext } from '../contexts/WorkExperienceContext';

const WorkExperiencePage = () => {
  const { workExperience, loading, error, addWorkExperience, updateWorkExperience, deleteWorkExperience } = useContext(WorkExperienceContext);
  const [newExperience, setNewExperience] = useState({
    companyName: '',
    jobTitle: '',
    responsibilities: '',
    achievements: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    const experienceData = {
      companyName: newExperience.companyName,
      jobTitle: newExperience.jobTitle,
      responsibilities: newExperience.responsibilities,
      achievements: newExperience.achievements,
      startDate: newExperience.startDate,
      endDate: newExperience.endDate,
    };
    addWorkExperience(experienceData);
    setNewExperience({
      companyName: '',
      jobTitle: '',
      responsibilities: '',
      achievements: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Work Experience</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <form onSubmit={handleAddExperience}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Work Experience</h3>
          <input
            type="text"
            name="companyName"
            value={newExperience.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="text"
            name="jobTitle"
            value={newExperience.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            name="responsibilities"
            value={newExperience.responsibilities}
            onChange={handleChange}
            placeholder="Responsibilities"
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            name="achievements"
            value={newExperience.achievements}
            onChange={handleChange}
            placeholder="Achievements"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="date"
            name="startDate"
            value={newExperience.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="date"
            name="endDate"
            value={newExperience.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            Add Work Experience
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Work Experience</h3>
        <ul className="space-y-4">
          {workExperience?.map((work) => (
            <li key={work._id} className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>{work.companyName}</strong> - {work.jobTitle}</p>
                  <p>{work.responsibilities}</p>
                  <p>{work.achievements}</p>
                  <p>{new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateWorkExperience(work._id, { jobTitle: 'Updated Job Title' })}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteWorkExperience(work._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkExperiencePage;
