import React, { useState } from 'react';

export const CreateAsanaForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: '',
    steps: '',
    precautions: '',
    category: '',
    videoUrl: ''
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImages(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // or pass it as prop

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));

    // Append each image
    Object.entries(images).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    try {
      const res = await fetch("http://localhost:8000/admin/yogasan/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ Yoga Asana created successfully");
        setFormData({
          name: '', description: '', benefits: '', steps: '', precautions: '', category: '', videoUrl: ''
        });
        setImages({ image1: null, image2: null, image3: null, image4: null });
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (err) {
      alert("⚠️ Failed to submit. Check console for error.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Create New Yoga Asana</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Asana Name" value={formData.name} onChange={handleChange}
            className="p-3 border rounded-md w-full" required />

          <input type="text" name="category" placeholder="Category (e.g., Beginner, Advanced)"
            value={formData.category} onChange={handleChange} className="p-3 border rounded-md w-full" required />
        </div>

        <textarea name="description" rows={3} placeholder="Asana Description"
          value={formData.description} onChange={handleChange}
          className="w-full p-3 border rounded-md" required />

        <div className="grid md:grid-cols-2 gap-4">
          <textarea name="benefits" rows={3} placeholder="Benefits (comma separated)"
            value={formData.benefits} onChange={handleChange}
            className="w-full p-3 border rounded-md" required />

          <textarea name="steps" rows={3} placeholder="Steps (comma separated)"
            value={formData.steps} onChange={handleChange}
            className="w-full p-3 border rounded-md" required />
        </div>

        <textarea name="precautions" rows={3} placeholder="Precautions (comma separated)"
          value={formData.precautions} onChange={handleChange}
          className="w-full p-3 border rounded-md" required />

        <input type="text" name="videoUrl" placeholder="Video URL (optional)"
          value={formData.videoUrl} onChange={handleChange}
          className="w-full p-3 border rounded-md" />

        {/* Image Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700">Image {i}</label>
              <input type="file" name={`image${i}`} accept="image/*" onChange={handleFileChange}
                className="block w-full border mt-1 p-2 rounded-md" />
            </div>
          ))}
        </div>

        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition">
          Upload Asana
        </button>
      </form>
    </div>
  );
};
