import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"; // Import AuthContext

const Home = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Logout the user by calling logout function from AuthContext
    navigate('/login'); // Redirect user to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        AI Resume & Cover Letter Generator
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Provide job details and get an AI-generated resume and cover letter.
      </p>

      {/* Conditional rendering based on user authentication */}
      {user ? (
        <>
          <h2 className="text-xl text-gray-800 mb-4">Welcome, User!</h2> {/* Show user's name or any detail if required */}
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/generate">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 mb-4">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
              Login
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
