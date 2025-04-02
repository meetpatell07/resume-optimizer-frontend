import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../context/ProjectContext';

const ProjectPage = () => {
  
    const { projectData, loading, error, addProject, updateProject, deleteProject } =
    useContext(ProjectContext);

    const [newProject, setNewProject] = useState({
      projectName: '',
      description: '',
      technologiesUsed: '',
      outcomes: '',
    });

    const handleChange = (e) => {
      setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

  const handleAddProject = (e) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({
      projectName: '',
      description: '',
      technologiesUsed: '',
      outcomes: '',
    });
  };

  const handleUpdateProject = (projectId) => {
    const updatedData = { ...newProject, description: 'Updated Description' }; // Example update
    updateProject(projectId, updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Your Projects</h2>

      {loading && <div className="text-center text-blue-600">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      {/* Form for adding a new project */}
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Add a New Project</h3>
        <form onSubmit={handleAddProject}>
          <div className="space-y-4">
            <input
              type="text"
              name="projectName"
              value={newProject.projectName}
              onChange={handleChange}
              placeholder="Project Name"
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleChange}
              placeholder="Project Description"
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              name="technologiesUsed"
              value={newProject.technologiesUsed}
              onChange={handleChange}
              placeholder="Technologies Used"
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              name="outcomes"
              value={newProject.outcomes}
              onChange={handleChange}
              placeholder="Outcomes"
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>

      {/* Display existing projects */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your Current Projects</h3>
        {projectData.length === 0 ? (
          <p>No project data found.</p>
        ) : (
          <ul className="space-y-6">
            {projectData.map((proj) => (
              <li key={proj._id} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">{proj.projectName}</h4>
                <p className="text-gray-700 mb-2">{proj.description}</p>
                <p className="text-gray-600"><strong>Technologies Used:</strong> {proj.technologiesUsed}</p>
                <p className="text-gray-600"><strong>Outcomes:</strong> {proj.outcomes}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleUpdateProject(proj._id)}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteProject(proj._id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
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

export default ProjectPage;
