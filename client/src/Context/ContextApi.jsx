

import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const YogaContext = createContext();

export const YogaContextProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  // Profile states
  const [profiledata, setProfileData] = useState({});
  const [profile, setProfile] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const instructors = [
    { name: 'Katie', location: 'San Francisco', rating: '4.9 (123)', image: 'https://cdn.usegalileo.ai/sdxl10/e5c51caa-c903-4aff-b973-412a89b38370.png' },
    { name: 'Alex', location: 'Los Angeles', rating: '4.9 (111)', image: 'https://cdn.usegalileo.ai/sdxl10/63db5cd3-ccd1-4bf9-a25e-b83846007b4f.png' },
    { name: 'Olivia', location: 'New York', rating: '4.8 (101)', image: 'https://cdn.usegalileo.ai/sdxl10/7e2e68b8-2761-40dd-b1a8-f91d3f482d60.png' },
    { name: 'Caitlyn', location: 'Austin', rating: '4.9 (99)', image: 'https://cdn.usegalileo.ai/sdxl10/73fa0c85-3c4b-47bc-ae68-a53756d0ece1.png' },
    { name: 'Chris', location: 'Chicago', rating: '4.8 (97)', image: 'https://cdn.usegalileo.ai/sdxl10/38dc00a0-dae0-441e-9dfc-033fcd3c4a65.png' },
    { name: 'Evan', location: 'Seattle', rating: '4.9 (95)', image: 'https://cdn.usegalileo.ai/sdxl10/ac29cf68-3812-41fe-968a-f400628c4aac.png' },
    { name: 'Jenna', location: 'Portland', rating: '4.8 (93)', image: 'https://cdn.usegalileo.ai/sdxl10/6d76b7f0-8b7f-432d-a3df-8c3b97f93cfa.png' },
    { name: 'Lily', location: 'Denver', rating: '4.9 (91)', image: 'https://cdn.usegalileo.ai/sdxl10/a5def1bc-4d71-42f6-8389-a367a64a85d7.png' },
    { name: 'Natalie', location: 'Miami', rating: '4.8 (89)', image: 'https://cdn.usegalileo.ai/sdxl10/04bf3cc7-e099-4a26-a617-49932f90f695.png' },
  ];

  const filteredInstructors = instructors
    .map((instructor) => ({
      ...instructor,
      matchScore: instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0,
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  // Load token & role from cookies on mount
  useEffect(() => {
    const t = Cookies.get('token');
    const r = Cookies.get('role');

    if (t) setToken(t);
    if (r) setRole(r);

    setLoading(false); // done loading
  }, []);

  // Fetch user profile
  useEffect(() => {
    if (!token || role !== 'user') return;

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
          whatsNumber: user.whatsappNumber || '',
          gender: user.gender || '',
          location: user.location || '',
          profileImage: user.profileImage || '',
        });

        setProfile(user.profileImage || '');
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchProfile();
  }, [token, role]);

  // Fetch instructor profile
  useEffect(() => {
    if (!token || role !== 'instructor') return;

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
          availability: user.availability?.map((slot) => `${slot.day}: ${slot.time}`).join(', ') || '',
          profileImage: user.profileImage || '',
          demoVideo: user.demoVideoURL || '',
        });

        setImagePreview(user.profileImage || '');
      } catch (error) {
        console.error('Failed to fetch instructor data:', error);
      }
    };

    fetchInstructor();
  }, [token, role]);

  const valueprice = {
    token, setToken,
    role, setRole,
    profiledata, setProfileData,
    imagePreview, setImagePreview,
    profile,
    instructors,
    searchTerm, setSearchTerm,
    filteredInstructors,
    loading,
  };

  return (
    <YogaContext.Provider value={valueprice}>
      {children}
    </YogaContext.Provider>
  );
};
