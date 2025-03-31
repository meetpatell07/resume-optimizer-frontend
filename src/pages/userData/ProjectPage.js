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
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Projects</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <form onSubmit={handleAddProject}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Project</h3>
          <input
            type="text"
            name="projectName"
            value={newProject.projectName}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="text"
            name="technologiesUsed"
            value={newProject.technologiesUsed}
            onChange={handleChange}
            placeholder="Technologies Used"
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            name="outcomes"
            value={newProject.outcomes}
            onChange={handleChange}
            placeholder="Outcomes"
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            Add Project
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Current Projects</h3>
        {projectData.length === 0 ? (
          <p>No project data found.</p>
        ) : (
          <ul className="space-y-4">
            {projectData.map((proj) => (
              <li key={proj._id} className="p-4 border-b">
                <h4 className="font-semibold">{proj.projectName}</h4>
                <p>{proj.description}</p>
                <p>{proj.technologiesUsed}</p>
                <p>{proj.outcomes}</p>
                <div className="mt-2">
                  <button
                    onClick={() => handleUpdateProject(proj._id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteProject(proj._id)}
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

export default ProjectPage;
