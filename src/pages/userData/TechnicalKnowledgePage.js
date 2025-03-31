import React, { useContext, useState } from 'react';
import { TechnicalKnowledgeContext } from '../contexts/TechnicalKnowledgeContext';

const TechnicalKnowledgePage = () => {
  const { technicalKnowledge, loading, error, addTechnicalKnowledge, updateTechnicalKnowledge, deleteTechnicalKnowledge } = useContext(TechnicalKnowledgeContext);
  const [newKnowledge, setNewKnowledge] = useState({
    programmingLanguages: '',
    toolsAndFrameworks: '',
    certifications: '',
    otherDetails: '',
  });

  const handleChange = (e) => {
    setNewKnowledge({ ...newKnowledge, [e.target.name]: e.target.value });
  };

  const handleAddKnowledge = (e) => {
    e.preventDefault();
    const knowledgeData = {
      programmingLanguages: newKnowledge.programmingLanguages.split(','),
      toolsAndFrameworks: newKnowledge.toolsAndFrameworks.split(','),
      certifications: newKnowledge.certifications.split(','),
      otherDetails: newKnowledge.otherDetails,
    };
    addTechnicalKnowledge(knowledgeData);
    setNewKnowledge({
      programmingLanguages: '',
      toolsAndFrameworks: '',
      certifications: '',
      otherDetails: '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Technical Knowledge</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <form onSubmit={handleAddKnowledge}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Technical Knowledge</h3>
          <input
            type="text"
            name="programmingLanguages"
            value={newKnowledge.programmingLanguages}
            onChange={handleChange}
            placeholder="Enter programming languages (comma separated)"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="text"
            name="toolsAndFrameworks"
            value={newKnowledge.toolsAndFrameworks}
            onChange={handleChange}
            placeholder="Enter tools and frameworks (comma separated)"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="text"
            name="certifications"
            value={newKnowledge.certifications}
            onChange={handleChange}
            placeholder="Enter certifications (comma separated)"
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            name="otherDetails"
            value={newKnowledge.otherDetails}
            onChange={handleChange}
            placeholder="Other technical details"
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            Add Knowledge
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Programming Languages</h3>
        <ul className="space-y-4">
          {technicalKnowledge.programmingLanguages?.map((tech, index) => (
            <li key={index} className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span>{tech}</span>
                <button
                  onClick={() => deleteTechnicalKnowledge(tech._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Tools & Frameworks</h3>
        <ul className="space-y-4">
          {technicalKnowledge.toolsAndFrameworks?.map((tech, index) => (
            <li key={index} className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span>{tech}</span>
                <button
                  onClick={() => deleteTechnicalKnowledge(tech._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Certifications</h3>
        <ul className="space-y-4">
          {technicalKnowledge.certifications?.map((tech, index) => (
            <li key={index} className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span>{tech}</span>
                <button
                  onClick={() => deleteTechnicalKnowledge(tech._id)}
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

export default TechnicalKnowledgePage;
