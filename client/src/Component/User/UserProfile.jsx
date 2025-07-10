
//final

import React, { useState, useRef, useContext, useEffect } from 'react';
import { YogaContext } from '../../Context/ContextApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
export const UserProfile = () => {
  const navigate = useNavigate();
  const { token, setToken,setRole } = useContext(YogaContext); // assuming setToken available for logout

  const [profileData, setProfileData] = useState({
    fullName: '',
    age: '',
    bio: '',
    whatsNumber: '',
    gender: '',
    location: '',
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/user/userprofile/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const user = data.user;

        setProfileData({
          fullName: user.name || '',
          age: user.age || '',
          bio: user.bio || '',
          whatsNumber: user.whatsNumber || '',
          gender: user.gender || '',
          location: user.location || '',
          profileImage: null,
        });
        setImagePreview(user.profileImage || '');
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profileImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("name", profileData.fullName);
    formData.append("age", profileData.age);
    formData.append("bio", profileData.bio);
    formData.append("whatsapp", profileData.whatsNumber);
    formData.append("location", profileData.location);
    formData.append("gender", profileData.gender);
    if (profileData.profileImage) {
      formData.append("image1", profileData.profileImage);
    }

    try {
      const res = await fetch("http://localhost:8000/user/userprofile/update-profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("✅ Profile updated successfully");
      navigate('/');
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Failed to update profile");
    }
  };

  const handleLogout = () => {
    setToken(null); // Clear context token
    setRole(null);
    Cookies.remove('token');
    Cookies.remove('role');
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f4f8fb] py-8 px-4 sm:px-6 lg:px-20 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md transition"
      >
        Logout
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-[#0e171b] mb-8">Your Profile</h1>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div
            className="w-32 h-32 rounded-full bg-gray-200 bg-center bg-cover border-4 border-white shadow-md cursor-pointer hover:opacity-90 transition"
            style={{ backgroundImage: `url(${imagePreview})` }}
            onClick={() => fileInputRef.current.click()}
            title="Click to change profile picture"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="text-center sm:text-left">
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              className="text-2xl font-bold text-[#0e171b] border-b-2 border-transparent focus:border-blue-400 focus:outline-none bg-transparent"
            />
            <p className="text-sm text-[#4f8296] mt-1">Joined Jan 3, 2022</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-[#0e171b] mb-4">Personal Info</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            ['Mobile Number', 'whatsNumber'],
            ['Gender', 'gender'],
            ['Age', 'age'],
            ['Location', 'location'],
            ['Bio', 'bio'],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm text-gray-600 mb-1">{label}</label>
              <input
                type="text"
                value={profileData[key]}
                onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center sm:justify-end mt-10">
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
