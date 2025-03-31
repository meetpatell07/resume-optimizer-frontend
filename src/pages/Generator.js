import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import axios from "axios";

const Generator = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook to navigate between pages
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    responsibilities: "",
    skillsRequired: "",
    qualifications: "",
    opportunities: "",
    otherDetails: "",
  });

  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/jobs/generate", formData);
      setGeneratedContent(response.data);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Enter Job Details
      </h2>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}  // Navigate back to the previous page
        className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
      >
        Back
      </button>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume & Cover Letter"}
        </button>
      </form>

      {generatedContent && (
        <div className="mt-8 p-6 bg-gray-100 rounded-md">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Generated Resume:</h3>
          <p className="whitespace-pre-wrap">{generatedContent.resume}</p>
          <h3 className="text-xl font-bold text-gray-800 mt-4">Generated Cover Letter:</h3>
          <p className="whitespace-pre-wrap">{generatedContent.coverLetter}</p>
        </div>
      )}
    </div>
  );
};

export default Generator;
