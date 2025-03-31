import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';  // For navigation

const ProfilePage = () => {
  const { user, loading, error } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Log the user data when the component mounts or user state changes
  useEffect(() => {
    console.log('User data loaded:', user);
  }, [user]);

  // If the profile is being fetched or there's an error, show appropriate messages
  if (loading) {
    console.log('Loading...');
    return <p>Loading...</p>;
  }

  if (error) {
    console.log('Error encountered:', error);
    return <p>{error}</p>;
  }

  const handleEditClick = () => {
    navigate('/profile/edit');  // Navigate to the profile edit page
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">User Profile</h2>
      {user && (
        <div className="space-y-4">
          {/* Profile Picture (Optional) */}
          {user.profilePicture && (
            <div className="flex justify-center">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}

          {/* Display Full Name */}
          <div>
            <label className="block text-lg font-medium mb-2">Full Name</label>
            <p className="text-xl">{user.fullName}</p>
          </div>

          {/* Display Contact Information */}
          <div>
            <label className="block text-lg font-medium mb-2">Phone</label>
            <p className="text-xl">{user.contactInfo?.phone}</p>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <p className="text-xl">{user.contactInfo?.email}</p>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Address</label>
            <p className="text-xl">{user.contactInfo?.address}</p>
          </div>

          {/* Display LinkedIn, GitHub, and Portfolio */}
          {user.linkedIn && (
            <div>
              <label className="block text-lg font-medium mb-2">LinkedIn</label>
              <p className="text-xl">
                <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">
                  {user.linkedIn}
                </a>
              </p>
            </div>
          )}

          {user.github && (
            <div>
              <label className="block text-lg font-medium mb-2">GitHub</label>
              <p className="text-xl">
                <a href={user.github} target="_blank" rel="noopener noreferrer">
                  {user.github}
                </a>
              </p>
            </div>
          )}

          {user.portfolio && (
            <div>
              <label className="block text-lg font-medium mb-2">Portfolio</label>
              <p className="text-xl">
                <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
                  {user.portfolio}
                </a>
              </p>
            </div>
          )}

          {/* Display Location */}
          <div>
            <label className="block text-lg font-medium mb-2">Location</label>
            <p className="text-xl">{user.location || 'Not specified'}</p>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Button to navigate to the edit profile page */}
          <button
            onClick={handleEditClick}
            className="w-full mt-4 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
