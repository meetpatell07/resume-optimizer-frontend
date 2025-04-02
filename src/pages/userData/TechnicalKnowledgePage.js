import React, { useContext, useState, useEffect } from 'react';
import { TechnicalKnowledgeContext } from '../../context/TechnicalKnowledgeContext';

const TechnicalKnowledgePage = () => {
  const { technicalKnowledge = [], loading, error, addTechnicalKnowledge, updateTechnicalKnowledge, deleteTechnicalKnowledge } = useContext(TechnicalKnowledgeContext);

  // Local state to manage form inputs
  const [newTechKnowledge, setNewTechKnowledge] = useState({
    programmingLanguages: '',
    toolsAndFrameworks: '',
    certifications: '',
    otherDetails: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editTechId, setEditTechId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTechKnowledge((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding new technical knowledge
  const handleAddKnowledge = async (e) => {
    e.preventDefault();
    try {
      await addTechnicalKnowledge(newTechKnowledge);
      setSuccessMessage('Technical knowledge added successfully!');
      setErrorMessage('');
      setNewTechKnowledge({
        programmingLanguages: '',
        toolsAndFrameworks: '',
        certifications: '',
        otherDetails: '',
      });
    } catch (error) {
      setErrorMessage('Failed to add technical knowledge.');
      setSuccessMessage('');
    }
  };

  // Handle updating existing technical knowledge
  const handleUpdateKnowledge = async (e) => {
    e.preventDefault();
    if (editTechId) {
      try {
        await updateTechnicalKnowledge(editTechId, newTechKnowledge);
        setSuccessMessage('Technical knowledge updated successfully!');
        setErrorMessage('');
        setIsEditing(false);
        setEditTechId(null);
        setNewTechKnowledge({
          programmingLanguages: '',
          toolsAndFrameworks: '',
          certifications: '',
          otherDetails: '',
        });
      } catch (error) {
        setErrorMessage('Failed to update technical knowledge.');
        setSuccessMessage('');
      }
    }
  };

  // Handle editing a specific technical knowledge item
  const handleEditKnowledge = (techId) => {
    const techToEdit = technicalKnowledge.find((item) => item._id === techId);
    if (techToEdit) {
      setNewTechKnowledge({
        programmingLanguages: techToEdit.programmingLanguages.join(', '),
        toolsAndFrameworks: techToEdit.toolsAndFrameworks.join(', '),
        certifications: techToEdit.certifications.join(', '),
        otherDetails: techToEdit.otherDetails,
      });
      setIsEditing(true);
      setEditTechId(techId);
    }
  };

  // Handle deleting a specific technical knowledge
  const handleDeleteKnowledge = async (techId) => {
    try {
      await deleteTechnicalKnowledge(techId);
      setSuccessMessage('Technical knowledge deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to delete technical knowledge.');
      setSuccessMessage('');
    }
  };

  // Render the list of technical knowledge
  const renderTechKnowledge = () => {
    // Ensure technicalKnowledge is an array
    if (!Array.isArray(technicalKnowledge)) {
      return <p className="text-center mt-8 text-red-500">Invalid data format</p>;
    }

    if (technicalKnowledge.length === 0) {
      return <p className="text-center mt-8">No technical knowledge available.</p>;
    }

    return (
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Your Technical Knowledge</h2>
        <div className="mt-4">
          {technicalKnowledge.map((item) => (
            <div key={item._id} className="p-4 bg-white shadow-md rounded-lg mb-4">
              <h3 className="font-semibold text-xl">Programming Languages:</h3>
              <p>{item.programmingLanguages?.join(', ')}</p>

              <h3 className="font-semibold text-xl mt-3">Tools & Frameworks:</h3>
              <p>{item.toolsAndFrameworks?.join(', ')}</p>

              <h3 className="font-semibold text-xl mt-3">Certifications:</h3>
              <p>{item.certifications?.join(', ')}</p>

              <h3 className="font-semibold text-xl mt-3">Other Details:</h3>
              <p>{item.otherDetails}</p>

              <div className="mt-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => handleEditKnowledge(item._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 ml-4 rounded hover:bg-red-600"
                  onClick={() => handleDeleteKnowledge(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center">Technical Knowledge</h1>

      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded mt-4 text-center">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-500 text-white p-3 rounded mt-4 text-center">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={isEditing ? handleUpdateKnowledge : handleAddKnowledge}
        className="mt-6 space-y-4"
      >
        <div>
          <label className="block text-lg font-semibold">Programming Languages</label>
          <input
            type="text"
            name="programmingLanguages"
            value={newTechKnowledge.programmingLanguages}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter programming languages (comma separated)"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Tools & Frameworks</label>
          <input
            type="text"
            name="toolsAndFrameworks"
            value={newTechKnowledge.toolsAndFrameworks}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tools & frameworks (comma separated)"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Certifications</label>
          <input
            type="text"
            name="certifications"
            value={newTechKnowledge.certifications}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter certifications (comma separated)"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Other Details</label>
          <textarea
            name="otherDetails"
            value={newTechKnowledge.otherDetails}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter other details about your experience"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          {isEditing ? 'Update Knowledge' : 'Add Knowledge'}
        </button>
      </form>

      {renderTechKnowledge()}
    </div>
  );
};

export default TechnicalKnowledgePage;
