import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { FaUser, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa'; // Added icons for better visual appeal

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Destructure user and logout from AuthContext
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Logout the user by calling logout function from AuthContext
    navigate('/login'); // Redirect user to login page
  };

  return (
    <div className="bg-gray-900 text-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-semibold text-yellow-400 hover:text-yellow-300">
        <Link to="/">AI Resume Generator</Link>
      </div>

      {user ? (
        <div className="flex items-center space-x-6">
          {/* Add Data Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200"
              aria-label="Add Data"
            >
              <FaPlusCircle className="inline mr-2" /> Add Data
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-56">
                <Link to="/add-work-experience" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Add Work Experience
                </Link>
                <Link to="/add-skills" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Add Skills
                </Link>
                <Link to="/add-education" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Add Education
                </Link>
                <Link to="/add-project" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Add Projects
                </Link>
                <Link to="/add-volunteer-work" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Add Volunteer Work
                </Link>
                <Link to="/add-technical" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Add Technical Knowledge
                </Link>
              </div>
            )}
          </div>

          {/* Profile Link */}
          <Link 
            to="/profile" 
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center"
            aria-label="Profile"
          >
            <FaUser className="mr-2" /> Profile
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center"
            aria-label="Logout"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-6">
          {/* Display login link if not logged in */}
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
