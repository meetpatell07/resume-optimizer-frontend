import React, { useContext, useState } from 'react';
import { EducationContext } from '../contexts/EducationContext';

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
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Education</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <form onSubmit={handleAddEducation}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Education</h3>
          <input
            type="text"
            name="institution"
            value={newEducation.institution}
            onChange={handleChange}
            placeholder="Institution"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="text"
            name="degree"
            value={newEducation.degree}
            onChange={handleChange}
            placeholder="Degree"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="date"
            name="startDate"
            value={newEducation.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="date"
            name="endDate"
            value={newEducation.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            name="additionalInfo"
            value={newEducation.additionalInfo}
            onChange={handleChange}
            placeholder="Additional Information"
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            Add Education
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Current Education</h3>
        {educationData.length === 0 ? (
          <p>No education data found.</p>
        ) : (
          <ul className="space-y-4">
            {educationData.map((edu) => (
              <li key={edu._id} className="p-4 border-b">
                <h4 className="font-semibold">{edu.institution}</h4>
                <p>{edu.degree}</p>
                <p>{edu.startDate} - {edu.endDate}</p>
                <p>{edu.additionalInfo}</p>
                <div className="mt-2">
                  <button
                    onClick={() => handleUpdateEducation(edu._id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteEducation(edu._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
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
