import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const GenerateResumeAI = () => {
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
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenerateResume = async () => {
    if (!formData.jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/jobs/generate-resume-ai", formData);
      if (response.status === 200) {
        setResume(response.data.resume);
      } else {
        setError(response.data.error || "Error generating resume");
      }
    } catch (err) {
      setError("An error occurred while generating the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Generate Resume with AI
      </h2>

      <div className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-lg font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              placeholder={`Enter ${key}...`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}

        <button
          onClick={handleGenerateResume}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Generating Resume..." : "Generate Resume"}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      {resume && (
        <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Your Generated Resume
          </h3>
          <pre className="whitespace-pre-wrap text-gray-700">{resume}</pre>
        </div>
      )}
    </div>
  );
};

export default GenerateResumeAI;