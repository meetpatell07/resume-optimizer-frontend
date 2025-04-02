import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';  // For navigation
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';  // Icons for social links

const ProfilePage = () => {
  const { user, loading, error } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  useEffect(() => {
    console.log('User data loaded:', user);
  }, [user]);

  // If the profile is being fetched or there's an error, show appropriate messages
  if (loading) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-2xl mt-10 text-red-500">{error}</div>;
  }

  const handleEditClick = () => {
    navigate('/profile/edit');  // Navigate to the profile edit page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 flex justify-center items-center py-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 space-y-6 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-gray-800">User Profile</h2>
        {user && (
          <div className="space-y-4">
            {/* Profile Picture (Optional) */}
            {user.profilePicture && (
              <div className="flex justify-center mb-4">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-blue-400"
                />
              </div>
            )}

            {/* Display Full Name */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-600">Full Name</label>
              <p className="text-xl text-gray-800">{user.fullName}</p>
            </div>

            {/* Display Contact Information */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-600">Phone</label>
              <p className="text-xl text-gray-800 flex items-center">
                <FaPhoneAlt className="mr-2 text-blue-500" />
                {user.contactInfo?.phone}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-600">Email</label>
              <p className="text-xl text-gray-800 flex items-center">
                <FaEnvelope className="mr-2 text-blue-500" />
                {user.contactInfo?.email}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-600">Address</label>
              <p className="text-xl text-gray-800">{user.contactInfo?.address}</p>
            </div>

            {/* Social Links (LinkedIn, GitHub, Portfolio) */}
            <div className="space-y-2">
              {user.linkedIn && (
                <div className="flex items-center">
                  <FaLinkedin className="mr-2 text-blue-600 text-xl" />
                  <a href={user.linkedIn} target="_blank" rel="noopener noreferrer" className="text-xl text-blue-700 hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}

              {user.github && (
                <div className="flex items-center">
                  <FaGithub className="mr-2 text-gray-700 text-xl" />
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-xl text-gray-800 hover:underline">
                    GitHub
                  </a>
                </div>
              )}

              {user.portfolio && (
                <div className="flex items-center">
                  <FaLinkedin className="mr-2 text-gray-600 text-xl" />
                  <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="text-xl text-gray-800 hover:underline">
                    Portfolio
                  </a>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-600">Location</label>
              <p className="text-xl text-gray-800 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-green-500" />
                {user.location || 'Not specified'}
              </p>
            </div>

            {/* Edit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleEditClick}
                className="w-1/2 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg hover:scale-105"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
