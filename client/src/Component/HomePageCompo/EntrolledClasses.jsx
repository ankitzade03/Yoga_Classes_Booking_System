
import React, { useEffect, useContext, useState } from 'react';
import { YogaContext } from '../../Context/ContextApi';

export const EnrolledClasses = () => {
  const { token } = useContext(YogaContext);
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const res = await fetch('http://localhost:8000/user/joined-classes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setEnrolledClasses(data.enrolledClasses);
        } else {
          console.error('Failed to fetch classes:', data.error);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchEnrolledClasses();
  }, [token]);

  if (enrolledClasses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-center">
        <p className="text-lg sm:text-xl text-gray-500 font-medium">
          😕 You haven't enrolled in any classes yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1890bf] text-center mb-10">
        📘 Your Enrolled Classes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((cls) => (
          <div
            key={cls._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-[#0e171b] mb-2">{cls.className}</h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{cls.description}</p>

              <div className="space-y-2 text-sm text-[#4f8296]">
                <p>
                  <strong>📅 Schedule:</strong>{' '}
                  <span className="text-[#1a3b5d] font-medium">
                    {new Date(cls.schedule).toLocaleString()}
                  </span>
                </p>

                <p>
                  <strong>💰 Price:</strong>{' '}
                  <span className="text-[#388e3c] font-semibold">₹{cls.price}</span>
                </p>

                <p>
                  <strong>📡 Mode:</strong>{' '}
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full font-semibold text-white ${
                      cls.isOnline ? 'bg-[#2196f3]' : 'bg-gray-500'
                    }`}
                  >
                    {cls.isOnline ? 'Online' : 'Offline'}
                  </span>
                </p>

                {cls.isOnline && cls.meetingLink && (
                  <p>
                    <strong>🔗 Meeting:</strong>{' '}
                    <a
                      href={cls.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1f93e0] hover:underline"
                    >
                      Join Now
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Instructor Info */}
            <div className="flex items-center gap-4 pt-4 mt-4 border-t">
              <img
                src={cls.instructor?.profileImage || '/default-profile.png'}
                alt="Instructor"
                className="w-12 h-12 object-cover rounded-full border"
              />
              <div>
                <p className="text-sm font-semibold text-[#0e171b]">{cls.instructor?.name}</p>
                <p className="text-xs text-[#4f8296]">{cls.instructor?.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
