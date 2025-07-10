

import React, { useState, useContext } from 'react';
import { SoftContext } from '../Context/SoftContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const {setToken,setRole } = useContext(SoftContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/auth/adminLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.token && data.role) {
        // Save token and role in cookies
        Cookies.set('token', data.token, { expires: 7 });
        Cookies.set('role', data.role, { expires: 7 });

        // Update context
        setToken(data.token);
        setRole(data.role);

        // Redirect to admin dashboard
        // navigate('/admin/dashboard');
      } else {
        toast.error(data.message || 'Invalid credentials!');
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Network error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-5 flex justify-center items-center min-h-screen bg-[#f8fbfb]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-[#0e1b19] text-2xl font-bold text-center pb-4">Admin Login</h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-[#0e1b19] text-base font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input w-full rounded-xl border border-[#d0e6e4] bg-[#f8fbfb] p-[15px] h-14 text-[#0e1b19] placeholder:text-[#4f968f] text-base"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-[#0e1b19] text-base font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input w-full rounded-xl border border-[#d0e6e4] bg-[#f8fbfb] p-[15px] h-14 text-[#0e1b19] placeholder:text-[#4f968f] text-base"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-full ${
              loading ? 'bg-gray-400' : 'bg-[#34e5d3]'
            } text-[#0e1b19] text-sm font-bold transition-all`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};
