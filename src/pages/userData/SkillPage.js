import React, { useContext, useState } from 'react';
import { SkillContext } from '../contexts/SkillContext';

const SkillPage = () => {
  const { skillsData, loading, error, addSkill, updateSkill, deleteSkill } = useContext(SkillContext);
  const [newSkill, setNewSkill] = useState({ technicalSkills: '', softSkills: '' });

  const handleChange = (e) => {
    setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const skillData = {
      technicalSkills: newSkill.technicalSkills.split(','),
      softSkills: newSkill.softSkills.split(','),
    };
    addSkill(skillData);
    setNewSkill({ technicalSkills: '', softSkills: '' });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Skills</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <form onSubmit={handleAddSkill}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Skills</h3>
          <input
            type="text"
            name="technicalSkills"
            value={newSkill.technicalSkills}
            onChange={handleChange}
            placeholder="Enter technical skills (comma separated)"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="text"
            name="softSkills"
            value={newSkill.softSkills}
            onChange={handleChange}
            placeholder="Enter soft skills (comma separated)"
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            Add Skills
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Technical Skills</h3>
        <ul className="space-y-4">
          {skillsData.technicalSkills?.map((skill, index) => (
            <li key={index} className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span>{skill}</span>
                <button
                  onClick={() => deleteSkill(skill._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Your Soft Skills</h3>
        <ul className="space-y-4">
          {skillsData.softSkills?.map((skill, index) => (
            <li key={index} className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span>{skill}</span>
                <button
                  onClick={() => deleteSkill(skill._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillPage;
