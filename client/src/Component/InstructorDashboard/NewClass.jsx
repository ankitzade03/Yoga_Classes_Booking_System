
import React, { useContext, useState } from 'react';
import { YogaContext } from '../../Context/ContextApi';

export const NewClass = () => {
  const { token } = useContext(YogaContext);

  const [formData, setFormData] = useState({
    className: '',
    description: '',
    schedule: '',
    isOnline: false,
    meetingLink: '',
    location: '',
    maxStudents: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/instructor/create_class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        setFormData({
          className: '',
          description: '',
          schedule: '',
          isOnline: false,
          meetingLink: '',
          location: '',
          maxStudents: '',
          price: '',
        });
      }
    } catch (error) {
      console.error('Class creation error:', error);
      alert('Error creating class.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#e6f4ea] to-[#f0fdf4] flex items-center justify-center px-4 py-10 font-[Lexend]">
      <div className="bg-white shadow-xl border border-[#e2e8f0] rounded-3xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-[#065f46] mb-6 text-center tracking-tight">
          🌼 Create a New Yoga Class
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Class Name</label>
            <input
              name="className"
              placeholder="e.g., Sunrise Flow"
              value={formData.className}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              placeholder="Describe what this class offers..."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Schedule</label>
            <input
              name="schedule"
              type="datetime-local"
              value={formData.schedule}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isOnline"
              checked={formData.isOnline}
              onChange={handleChange}
              className="accent-green-600"
            />
            <label className="text-sm text-gray-700">This is an online class</label>
          </div>

          {formData.isOnline ? (
            <div>
              <label className="block mb-1 font-medium text-gray-700">Meeting Link</label>
              <input
                name="meetingLink"
                placeholder="e.g., https://zoom.us/..."
                value={formData.meetingLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          ) : (
            <div>
              <label className="block mb-1 font-medium text-gray-700">Location</label>
              <input
                name="location"
                placeholder="Studio or outdoor location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Max Students</label>
              <input
                name="maxStudents"
                type="number"
                placeholder="20"
                value={formData.maxStudents}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Price (₹)</label>
              <input
                name="price"
                type="number"
                placeholder="e.g., 199"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-200"
          >
            ➕ Create Class
          </button>
        </form>
      </div>
    </div>
  );
};


