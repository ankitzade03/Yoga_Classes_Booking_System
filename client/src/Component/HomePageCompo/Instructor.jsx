
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Instructor = () => {
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch instructors on component mount
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch('http://localhost:8000/user/instructors');
        const data = await res.json();
        setFilteredInstructors(data.instructors || []);
      } catch (error) {
        console.error('Failed to fetch instructors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading Instructors...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-screen-xl mx-auto font-[Lexend]">
      <h2 className="text-[#0e161b] text-3xl font-bold mb-6 text-center">👩‍🏫 Meet Our Instructors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredInstructors.map((instructor, index) => (
          <NavLink to={`/user/instructor/${instructor._id}`} key={index}>
            <div className="bg-white shadow-lg hover:shadow-xl transition rounded-xl overflow-hidden">
              <div
                className="aspect-square bg-gray-200 bg-center bg-cover"
                style={{
                  backgroundImage: `url("${instructor.profileImage || '/default-profile.png'}")`,
                }}
              />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {instructor.name}
                </h3>
                <p className="text-sm text-gray-500">
                  📍 {instructor.location || 'Location not set'}
                </p>
                <p className="text-yellow-500 text-sm">
                  ⭐ {instructor.averageRating || '0.0'}
                </p>
                {instructor.expertiseAreas?.length > 0 && (
                  <p className="text-xs text-[#0e161b] italic">
                    🧘 {instructor.expertiseAreas.join(', ')}
                  </p>
                )}
                {instructor.availability?.length > 0 ? (
                  <p className="text-xs text-gray-600">
                    🕒 Available: {instructor.availability[0].day} ({instructor.availability[0].time})
                  </p>
                ) : (
                  <p className="text-xs text-red-400">No availability info</p>
                )}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
