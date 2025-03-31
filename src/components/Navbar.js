import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider'; // Import AuthContext

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Destructure user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Logout the user by calling logout function from AuthContext
    navigate('/login'); // Redirect user to login page
  };

  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-semibold text-gray-800">
        <Link to="/">AI Resume Generator</Link>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          {/* User Avatar/Icon */}
          <div className="relative flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {/* You can replace this with an image or dynamic username */}
              <span className="font-semibold">{user.token.charAt(0).toUpperCase()}</span> 
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          {/* Display login link if not logged in */}
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
