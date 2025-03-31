import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"; // Import AuthContext

const WelcomePage = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to AI Resume Generator</h1>
      <p className="text-lg text-gray-600 mb-6">
        Hello, {user ? `User` : "Guest"}! We're glad to have you here.
      </p>

      {/* Option 1: Navigate to Generator Page */}
      <Link to="/generate">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 mb-4">
          Go to Generator
        </button>
      </Link>

      {/* Option 2: Other Features */}
      <Link to="/other-features">
        <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
          Other Features
        </button>
      </Link>
    </div>
  );
};

export default WelcomePage;
