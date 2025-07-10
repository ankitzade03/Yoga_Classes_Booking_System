
import React, { useEffect, useState, useContext } from 'react';
import { YogaContext } from '../../Context/ContextApi';

export const EnrolledStudents = () => {
  const { token } = useContext(YogaContext);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editStudentId, setEditStudentId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', profileImage: '' });

  useEffect(() => {
    fetchEnrolledStudents();
  }, [token]);

  const fetchEnrolledStudents = async () => {
    try {
      const res = await fetch(`http://localhost:8000/instructor/enrolled-students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setClasses(data.classes);
      } else {
        setError(data.message || 'Failed to fetch enrolled students');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (classId, studentId) => {
    if (!window.confirm('Are you sure you want to remove this student?')) return;

    try {
      const res = await fetch(
        `http://localhost:8000/instructor/enrolled-students/${classId}/${studentId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok) fetchEnrolledStudents();
      else alert(data.message || 'Failed to delete');
    } catch (err) {
      alert('Error deleting student',err);
    }
  };

  const handleEdit = (student) => {
    setEditStudentId(student._id);
    setEditForm({
      name: student.name || '',
      email: student.email || '',
      profileImage: student.profileImage || '',
    });
  };

  const handleEditSave = async (studentId) => {
    try {
      const res = await fetch(`http://localhost:8000/instructor/enrolled-students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (res.ok) {
        setEditStudentId(null);
        fetchEnrolledStudents();
      } else {
        alert(data.message || 'Failed to update');
      }
    } catch (err) {
      alert('Error updating student',err);
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">🌿 Loading students...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-[#f0fdf4] rounded-lg shadow-sm">
      <h1 className="text-4xl font-semibold text-center text-[#14532d] mb-10 tracking-tight">
        🌱 Enrolled Yoga Students
      </h1>

      {classes.length === 0 ? (
        <p className="text-center text-gray-600">No enrolled students yet.</p>
      ) : (
        <div className="space-y-12">
          {classes.map((cls) => (
            <div key={cls._id} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#065f46] mb-6">
                🧘‍♂️ Class: {cls.className}
              </h2>

              {cls.enrolledStudents.length === 0 ? (
                <p className="text-gray-500 italic">No students enrolled.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {cls.enrolledStudents.map((student) => (
                    <div
                      key={student._id}
                      className="bg-[#fefce8] border border-[#e5e7eb] rounded-xl p-5 text-center hover:shadow-lg transition-all"
                    >
                      {editStudentId === student._id ? (
                        <>
                          <input
                            type="text"
                            placeholder="Name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="mb-2 w-full px-3 py-2 border rounded-lg text-sm"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="mb-2 w-full px-3 py-2 border rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={editForm.profileImage}
                            onChange={(e) => setEditForm({ ...editForm, profileImage: e.target.value })}
                            className="mb-4 w-full px-3 py-2 border rounded-lg text-sm"
                          />
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleEditSave(student._id)}
                              className="bg-green-600 text-white px-4 py-1 rounded-full text-sm hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditStudentId(null)}
                              className="text-sm text-gray-600 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={
                              student.profileImage
                                ? student.profileImage
                                : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                            }
                            alt={student.name || 'Student'}
                            className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-green-200 mb-3"
                          />
                          <h3 className="text-lg font-semibold text-[#1f2937] mb-1">
                            {student.name || 'Anonymous'}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">{student.email}</p>
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(student)}
                              className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded-full text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(cls._id, student._id)}
                              className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
