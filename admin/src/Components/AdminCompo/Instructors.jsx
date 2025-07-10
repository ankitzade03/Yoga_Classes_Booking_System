
import React, { useEffect, useState} from 'react';

export const Instructors = () => {
//   const { token } = useContext(YogaContext);

  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua2l0emFkZTkxNEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE0NjQ0OTMsImV4cCI6MTc1MjE1NTY5M30.pmq-iOw_C3mAEeldySj439AlbxaxezFk_QulqqNTYIM"

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch('http://localhost:8000/admin/instructors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setInstructors(data.instructors);
        } else {
          console.error('Failed to fetch instructors:', data.message);
        }
      } catch (err) {
        console.error('Error fetching instructors:', err);
      }
    };

    fetchInstructors();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#1890bf] text-center mb-10">
        👨‍🏫 All Instructors
      </h1>

      {instructors.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No instructors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {instructors.map((inst) => (
            <div
              key={inst._id}
              className="bg-white shadow-sm border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex flex-col items-center gap-3">
                <img
                  src={
                    inst.profileImage
                      ? inst.profileImage
                      : 'https://cdn-icons-png.flaticon.com/512/194/194938.png'
                  }
                  alt="Instructor"
                  className="w-24 h-24 object-cover rounded-full border"
                />
                <h2 className="text-lg font-bold text-[#0e1b19]">{inst.name}</h2>
                <p className="text-sm text-[#4f8296]">{inst.email}</p>
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                {inst.location && (
                  <p><strong>📍 Location:</strong> {inst.location}</p>
                )}

                <p>
                  <strong>⭐ Rating:</strong>{' '}
                  <span className="text-[#f59e0b]">{inst.averageRating || 0}/5</span>
                </p>

                <p>
                  <strong>🟢 Status:</strong>{' '}
                  <span className={`font-semibold ${inst.isOnline ? 'text-green-600' : 'text-red-500'}`}>
                    {inst.isOnline ? 'Online' : 'Offline'}
                  </span>
                </p>

                {inst.whatsappNumber && (
                  <p><strong>📱 WhatsApp:</strong> {inst.whatsappNumber}</p>
                )}

                {inst.expertiseAreas.length > 0 && (
                  <p>
                    <strong>🧘 Expertise:</strong>{' '}
                    {inst.expertiseAreas.join(', ')}
                  </p>
                )}

                {inst.languagesSpoken.length > 0 && (
                  <p>
                    <strong>🗣️ Languages:</strong>{' '}
                    {inst.languagesSpoken.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
