
import React, { useEffect, useState, useContext } from 'react';
import { YogaContext } from '../../Context/ContextApi';


export const InstructorClasses = () => {
  const { token } = useContext(YogaContext);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstructorClasses = async () => {
      try {
        const res = await fetch('http://localhost:8000/instructor/instructor/classes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setClasses(data.classes);
        } else {
          setError(data.message || 'Failed to fetch classes');
        }
      } catch (err) {
        setError('Something went wrong');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorClasses();
  }, [token]);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading classes...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#0e7490] mb-8 text-center">🧘‍♂️ My Yoga Classes</h1>

      {classes.length === 0 ? (
        <p className="text-center text-gray-500">No classes created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls) => (
            <div key={cls._id} className="border rounded-xl p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-[#14532d]">{cls.className}</h2>
              <p className="text-gray-700 mt-2">{cls.description}</p>

              <div className="mt-4 space-y-1 text-sm text-gray-800">
                <p><strong>📅 Schedule:</strong> {new Date(cls.schedule).toLocaleString()}</p>
                <p><strong>💻 Mode:</strong> {cls.isOnline ? 'Online' : 'Offline'}</p>
                {cls.isOnline ? (
                  <p><strong>🔗 Meeting Link:</strong> <a href={cls.meetingLink} className="text-blue-600 underline">{cls.meetingLink}</a></p>
                ) : (
                  <p><strong>📍 Location:</strong> {cls.location}</p>
                )}
                <p><strong>💰 Price:</strong> ₹{cls.price}</p>
                <p><strong>👥 Max Students:</strong> {cls.maxStudents}</p>
                <p><strong>✅ Enrolled:</strong> {cls.enrolledStudents.length}</p>
              </div>

              {cls.enrolledStudents.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-[#0c4a6e]">Enrolled Students:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                    {cls.enrolledStudents.map((student) => (
                      <li key={student._id}>
                        {student.username} ({student.email})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
