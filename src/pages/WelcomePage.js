import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"; // Import AuthContext

const WelcomePage = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Welcome to AI Resume Generator</h1>
      <p className="text-lg text-gray-700 mb-8">
        {user ? `Hello, ${user.name}!` : "Hello, Guest! We're glad to have you here."}
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-6">
        {/* Option 1: Navigate to Generator Page */}
        <Link to="/generate">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-blue-800 transform transition-all duration-300 hover:scale-105">
            Go to Generator
          </button>
        </Link>

        {/* Option 2: Other Features */}
        <Link to="/generate-ai">
          <button className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg shadow-xl hover:from-gray-700 hover:to-gray-800 transform transition-all duration-300 hover:scale-105">
            Generate AI Resume
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
