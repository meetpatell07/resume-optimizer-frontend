import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfileEditPage = () => {
  const { user, updateUserProfile, loading, error } = useUser();
  const [editedUser, setEditedUser] = useState({ ...user });
  const navigate = useNavigate();

  // If there's no user data, redirect to the profile page
  useEffect(() => {
    if (!user) {
      navigate('/profile');  // Redirect to the profile page if no user is available
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (user) {
      await updateUserProfile(editedUser);  // Update the profile with the edited data
      navigate('/profile');  // Redirect back to the profile page after update
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Edit Profile</h2>
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-lg font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-lg font-medium mb-2">Phone</label>
          <input
            type="text"
            name="contactInfo.phone"
            value={editedUser.contactInfo?.phone || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-lg font-medium mb-2">Address</label>
          <input
            type="text"
            name="contactInfo.address"
            value={editedUser.contactInfo?.address || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-lg font-medium mb-2">LinkedIn</label>
          <input
            type="text"
            name="linkedIn"
            value={editedUser.linkedIn || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-lg font-medium mb-2">GitHub</label>
          <input
            type="text"
            name="github"
            value={editedUser.github || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="block text-lg font-medium mb-2">Portfolio</label>
          <input
            type="text"
            name="portfolio"
            value={editedUser.portfolio || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={editedUser.location || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>


        {/* Save Changes Button */}
        <button
          onClick={handleUpdate}
          className="w-full mt-4 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileEditPage;
