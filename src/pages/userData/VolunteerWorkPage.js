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
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Your Volunteer Work</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <form onSubmit={handleAddWork} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Add Volunteer Work</h3>
          <input
            type="text"
            name="organizationName"
            value={newWork.organizationName}
            onChange={handleChange}
            placeholder="Organization Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="role"
            value={newWork.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={newWork.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={newWork.startDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="endDate"
              value={newWork.endDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Volunteer Work
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Volunteer Work History</h3>
        <ul className="space-y-6">
          {volunteerWork?.map((work) => (
            <li key={work._id} className="p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-800">{work.organizationName} - <span className="italic text-gray-500">{work.role}</span></p>
                  <p className="text-gray-600">{work.description}</p>
                  <p className="text-sm text-gray-500">{new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateVolunteerWork(work._id, { role: 'Updated Role' })}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteVolunteerWork(work._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
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
