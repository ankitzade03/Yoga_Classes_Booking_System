
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export const InstructorProfile = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);

  const navigate=useNavigate();

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await fetch(`http://localhost:8000/user/instructor/${id}`);
        const data = await res.json();
        setInstructor(data.instructor);
      } catch (error) {
        console.error('Error loading instructor:', error);
      }
    };

    fetchInstructor();
  }, [id]);

  if (!instructor) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center bg-white shadow-md p-6 rounded-xl">
        <img
          src={instructor.profileImage || 'https://via.placeholder.com/150?text=No+Image'}
          alt={instructor.name}
          className="w-40 h-40 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">{instructor.name}</h1>
          <p className="text-sm text-gray-600">{instructor.email}</p>
          <p className="text-sm">
            <strong>Location:</strong> {instructor.location || 'Not provided'}
          </p>
          <p className="text-sm">
            <strong>WhatsApp:</strong> +91 {instructor.whatsappNumber || 'N/A'}
          </p>
          <p className="text-sm">
            <strong>Status:</strong>{' '}
            {instructor.isOnline ? (
              <span className="text-green-600">Online</span>
            ) : (
              <span className="text-red-500">Offline</span>
            )}
          </p>
          <p className="text-sm">
            <strong>Expertise:</strong>{' '}
            {instructor.expertiseAreas.length > 0
              ? instructor.expertiseAreas.join(', ')
              : 'Not listed'}
          </p>
          <p className="text-sm">
            <strong>Languages:</strong>{' '}
            {instructor.languagesSpoken.length > 0
              ? instructor.languagesSpoken.join(', ')
              : 'Not listed'}
          </p>
          <p className="text-sm">
            <strong>Joined:</strong>{' '}
            {new Date(instructor.joinedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Availability */}
      {instructor.availability.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">Availability</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {instructor.availability.map((slot) => (
              <li key={slot._id}>
                {slot.day} - {slot.time}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Demo Video */}
      {instructor.demoVideoURL && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">Demo Video</h2>
          <video
            controls
            className="rounded-lg w-full max-w-xl"
            src={instructor.demoVideoURL}
          />
        </div>
      )}

      {/* Classes Created */}
      {instructor.classesCreated.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Classes by {instructor.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {instructor.classesCreated.map((cls) => (
              <div
                key={cls._id}
                // className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/user/class/${cls._id}`)}
              >
                <h3 className="text-lg font-semibold text-indigo-800">{cls.className}</h3>
                <p className="text-sm text-gray-600">{cls.description}</p>
                <p className="text-sm mt-1">
                  <strong>Schedule:</strong> {new Date(cls.schedule).toLocaleString()}
                </p>
                <p className="text-sm">
                  <strong>Mode:</strong> {cls.isOnline ? 'Online' : 'Offline'}
                </p>
                <p className="text-sm">
                  <strong>Price:</strong> ₹{cls.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

