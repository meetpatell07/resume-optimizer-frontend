import React, { useContext, useState } from 'react';
import { VolunteerWorkContext } from '../../context/VolunteerWorkContext';

const VolunteerWorkPage = () => {
  const { volunteerWork, loading, error, addVolunteerWork, updateVolunteerWork, deleteVolunteerWork } = useContext(VolunteerWorkContext);
  const [newWork, setNewWork] = useState({
    organizationName: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setNewWork({ ...newWork, [e.target.name]: e.target.value });
  };

  const handleAddWork = (e) => {
    e.preventDefault();
    const workData = {
      organizationName: newWork.organizationName,
      role: newWork.role,
      description: newWork.description,
      startDate: newWork.startDate,
      endDate: newWork.endDate,
    };
    addVolunteerWork(workData);
    setNewWork({
      organizationName: '',
      role: '',
      description: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Volunteer Work</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <form onSubmit={handleAddWork}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Volunteer Work</h3>
          <input
            type="text"
            name="organizationName"
            value={newWork.organizationName}
            onChange={handleChange}
            placeholder="Organization Name"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="text"
            name="role"
            value={newWork.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            name="description"
            value={newWork.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="date"
            name="startDate"
            value={newWork.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="date"
            name="endDate"
            value={newWork.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            Add Volunteer Work
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Volunteer Work</h3>
        <ul className="space-y-4">
          {volunteerWork?.map((work) => (
            <li key={work._id} className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>{work.organizationName}</strong> - {work.role}</p>
                  <p>{work.description}</p>
                  <p>{new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateVolunteerWork(work._id, { role: 'Updated Role' })}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteVolunteerWork(work._id)}
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

export default VolunteerWorkPage;
