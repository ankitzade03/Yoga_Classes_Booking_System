
import React, { useState } from 'react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        alert(result.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 md:px-8 bg-[#f9fdfd]">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#0e161b] mb-2">
        Need help or have a question?
      </h1>
      <p className="text-center text-[#555] mb-8 text-sm sm:text-base">
        We're here for you. Send us a message and we’ll get back to you as soon as we can.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full rounded-md px-4 py-3 bg-[#edf7fa] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            className="w-full rounded-md px-4 py-3 bg-[#edf7fa] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">How can we help?</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Type your message here"
            required
            className="w-full rounded-md px-4 py-3 bg-[#edf7fa] outline-none"
          ></textarea>
        </div>

        <div className="flex justify-center md:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1f93e0] hover:bg-[#187bc0] text-white font-semibold px-6 py-2 rounded-md transition"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};
