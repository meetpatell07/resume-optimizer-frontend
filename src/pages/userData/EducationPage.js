import React, { useContext, useState } from 'react';
import { EducationContext } from '../../context/EducationContext';

const EducationPage = () => {
  const { educationData, loading, error, addEducation, updateEducation, deleteEducation } =
    useContext(EducationContext);

  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    addEducation(newEducation);
    setNewEducation({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      additionalInfo: '',
    });
  };

  const handleUpdateEducation = (educationId) => {
    const updatedData = { ...newEducation, endDate: '2025-12-31' }; // Example update
    updateEducation(educationId, updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Your Education</h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Form to Add Education */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <form onSubmit={handleAddEducation} className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Education</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="institution"
              value={newEducation.institution}
              onChange={handleChange}
              placeholder="Institution"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              name="degree"
              value={newEducation.degree}
              onChange={handleChange}
              placeholder="Degree"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="date"
              name="startDate"
              value={newEducation.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="date"
              name="endDate"
              value={newEducation.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <textarea
            name="additionalInfo"
            value={newEducation.additionalInfo}
            onChange={handleChange}
            placeholder="Additional Information"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Education
          </button>
        </form>
      </div>

      {/* Education Data List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Current Education</h3>
        {educationData.length === 0 ? (
          <p className="text-center text-gray-600">No education data found.</p>
        ) : (
          <ul className="space-y-6">
            {educationData.map((edu) => (
              <li key={edu._id} className="bg-white p-6 border rounded-lg shadow-md">
                <h4 className="font-semibold text-lg">{edu.institution}</h4>
                <p className="text-gray-600">{edu.degree}</p>
                <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                {edu.additionalInfo && <p className="text-gray-500 mt-2">{edu.additionalInfo}</p>}
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleUpdateEducation(edu._id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteEducation(edu._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationPage;
