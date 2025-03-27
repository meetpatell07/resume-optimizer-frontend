import React, { useState } from 'react';
import { uploadResume, generateResume, fetchOptimizedResume } from '../api/resumeService';

const ResumeOptimizationPage = () => {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // 🔹 Handle Resume File Upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🔹 Upload Resume
  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume file.");

    const formData = new FormData();
    formData.append("resume", file);
    
    try {
      setLoading(true);
      const response = await uploadResume(formData);
      console.log("Resume uploaded:", response);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Resume upload failed:", error);
      alert("Error uploading resume.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Generate Optimized Resume
  const handleGenerateResume = async () => {
    if (!jobId) return alert("Enter Job ID to optimize resume.");
    
    try {
      setLoading(true);
      const response = await generateResume(jobId);
      console.log("Optimized Resume:", response);
      setResumeData(response);
    } catch (error) {
      console.error("Failed to generate optimized resume:", error);
      alert("Error generating optimized resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Resume Optimization</h2>

      {/* 🔹 Resume Upload */}
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="border p-2 mb-2 w-full" />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 w-full">
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {/* 🔹 Resume Optimization */}
      <input type="text" placeholder="Enter Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={handleGenerateResume} className="bg-green-500 text-white p-2 w-full">
        {loading ? "Optimizing..." : "Generate Optimized Resume"}
      </button>

      {/* 🔹 Display Optimized Resume */}
      {resumeData && (
        <div className="mt-5 p-4 border">
          <h3 className="font-bold">Optimized Resume:</h3>
          <p>{resumeData.optimizedText}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeOptimizationPage;
