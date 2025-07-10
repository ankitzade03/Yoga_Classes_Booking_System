
import React, { useContext, useEffect, useRef, useState } from 'react';
import { YogaContext } from '../../Context/ContextApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const UpdateInstructorProfile = () => {
  const navigate = useNavigate();
  const { token,setToken,setRole} = useContext(YogaContext);

  const [profileData, setProfileData] = useState({
    name: '',
    location: '',
    whatsappNumber: '',
    bio: '',
    experience: '',
    expertiseAreas: '',
    languagesSpoken: '',
    availability: '',
    profileImage: null,
    demoVideo: null,
  });

  const [imagePreview, setImagePreview] = useState('');
  const fileImageRef = useRef(null);
  const fileVideoRef = useRef(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await fetch('http://localhost:8000/instructor/instructor_profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const user = data.instructor;

        setProfileData({
          name: user.name || '',
          location: user.location || '',
          whatsappNumber: user.whatsappNumber || '',
          bio: user.bio || '',
          experience: user.experience || '',
          expertiseAreas: user.expertiseAreas?.join(', ') || '',
          languagesSpoken: user.languagesSpoken?.join(', ') || '',
          availability: user.availability
            ?.map((slot) => `${slot.day}:${slot.time}`)
            .join(', ') || '',
          profileImage: null,
          demoVideo: null,
        });

        setImagePreview(user.profileImage || '');
      } catch (error) {
        console.error('Failed to fetch instructor data:', error);
      }
    };

    fetchInstructor();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profileImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, demoVideo: file });
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      if (value && key !== 'profileImage' && key !== 'demoVideo') {
        formData.append(key, value);
      }
    });
    if (profileData.profileImage) formData.append('image1', profileData.profileImage);
    if (profileData.demoVideo) formData.append('video1', profileData.demoVideo);

    try {
      const res = await fetch('http://localhost:8000/instructor/profile/update', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Update failed');

      alert('✅ Profile updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update error:', err);
      alert('❌ Failed to update profile.');
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
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#d9e4f5] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 relative">

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600"
        >
          Logout
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Your Profile</h1>

        {/* Image Section */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div
            className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-md bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url(${imagePreview})` }}
            onClick={() => fileImageRef.current.click()}
            title="Click to change profile picture"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileImageRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <p className="text-sm text-gray-500">Click image to upload a new profile picture</p>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            ['Full Name', 'name'],
            ['Location', 'location'],
            ['WhatsApp Number', 'whatsappNumber'],
            ['Bio', 'bio'],
            ['Experience', 'experience'],
            ['Expertise Areas (comma-separated)', 'expertiseAreas'],
            ['Languages Spoken (comma-separated)', 'languagesSpoken'],
            ['Availability (e.g. Mon:7AM-8AM, Tue:6PM-7PM)', 'availability'],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input
                type="text"
                value={profileData[key]}
                onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Demo Video Upload */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Demo Video</label>
            <input
              type="file"
              accept="video/*"
              ref={fileVideoRef}
              onChange={handleVideoChange}
              className="w-full text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleUpdate}
            className="bg-[#1f93e0] hover:bg-[#147ab9] text-white font-bold px-6 py-3 rounded-full shadow-lg transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInstructorProfile;
