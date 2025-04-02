import React, { useState } from 'react';
import { useSkills } from '../../context/SkillContext'; // Importing the custom hook

const SkillPage = () => {
  const { skills, loading, error, addSkill, updateSkill, deleteSkill } = useSkills(); // Accessing context
  const [newSkill, setNewSkill] = useState({
    technicalSkills: '',
    softSkills: '',
  });
  const [editingSkillId, setEditingSkillId] = useState(null); // To track which skill is being edited

  // Handle input changes for the new skill form or edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new skill
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.technicalSkills && !newSkill.softSkills) {
      alert('Please enter at least one skill.');
      return;
    }
    addSkill(newSkill);
    alert('Skill added successfully!');
    setNewSkill({ technicalSkills: '', softSkills: '' }); // Reset the input
  };

  // Handle updating an existing skill
  const handleUpdateSkill = (e) => {
    e.preventDefault();
    if (!newSkill.technicalSkills && !newSkill.softSkills) {
      alert('Please enter at least one skill.');
      return;
    }
    updateSkill(editingSkillId, newSkill);
    alert('Skill updated successfully!');
    setEditingSkillId(null); // Reset editing state
    setNewSkill({ technicalSkills: '', softSkills: '' }); // Reset the form
  };

  // Handle editing a skill (set it as the current form data)
  const handleEditSkill = (skillId, skillData) => {
    setEditingSkillId(skillId);
    setNewSkill({
      technicalSkills: skillData.technicalSkills.join(', '),
      softSkills: skillData.softSkills.join(', '),
    });
  };

  // Handle deleting a skill
  const handleDeleteSkill = (skillId) => {
    deleteSkill(skillId);
    alert('Skill deleted successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Skills</h1>

      {/* Add or Edit Skill Form */}
      <div className="mb-4">
        <form onSubmit={editingSkillId ? handleUpdateSkill : handleAddSkill}>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              name="technicalSkills"
              value={newSkill.technicalSkills}
              onChange={handleInputChange}
              placeholder="Enter technical skills"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="softSkills"
              value={newSkill.softSkills}
              onChange={handleInputChange}
              placeholder="Enter soft skills"
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingSkillId ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </form>
      </div>

      {/* Display Skills */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {skills.length === 0 ? (
            <p>No skills found. Add some skills to get started!</p>
          ) : (
            <ul className="space-y-4">
              {skills.map((skill) => (
                <li key={skill._id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>Technical Skills:</strong> {skill.technicalSkills.join(', ')}</p>
                      <p><strong>Soft Skills:</strong> {skill.softSkills.join(', ')}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditSkill(skill._id, skill)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill._id)}
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillPage;
