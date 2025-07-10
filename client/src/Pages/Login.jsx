
import React, { useContext, useState } from 'react';
import { YogaContext } from '../Context/ContextApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const navigate = useNavigate();
  const { setToken, setRole } = useContext(YogaContext);

  const [authMode, setAuthMode] = useState('Signup');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === 'Login' ? 'Signup' : 'Login'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      authMode === 'Signup'
        ? 'http://localhost:8000/auth/register'
        : 'http://localhost:8000/auth/login';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Response:', data);

      if (data.token && data.role) {
        toast.success('Login Successful!');

        // Set cookies for 7 days
        Cookies.set('token', data.token, { expires: 7 });
        Cookies.set('role', data.role, { expires: 7 });

        // Update context
        setToken(data.token);
        setRole(data.role);

        // Redirect based on role
        if (data.role === 'user') {
          navigate('/');
        } else if (data.role === 'instructor') {
          navigate('/instructor/dashboard');
        }
      } else {
        toast.error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      toast.error('Network error!');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-5 flex justify-center items-center min-h-screen bg-[#f8fbfb]">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h3 className="text-[#0e1b19] tracking-light text-2xl font-bold text-center pb-4">
          {authMode}
        </h3>

        <form onSubmit={handleSubmit}>
          {authMode === 'Signup' && (
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[#0e1b19] text-base font-medium">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-input w-full rounded-xl border border-[#d0e6e4] bg-[#f8fbfb] p-[15px] h-14 text-[#0e1b19] placeholder:text-[#4f968f] text-base"
              />
            </div>
          )}

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-[#0e1b19] text-base font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input w-full rounded-xl border border-[#d0e6e4] bg-[#f8fbfb] p-[15px] h-14 text-[#0e1b19] placeholder:text-[#4f968f] text-base"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-[#0e1b19] text-base font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input w-full rounded-xl border border-[#d0e6e4] bg-[#f8fbfb] p-[15px] h-14 text-[#0e1b19] placeholder:text-[#4f968f] text-base"
            />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-[#d0e6e4] border-2 bg-transparent text-[#34e5d3] focus:ring-0"
            />
            <p className="text-[#0e1b19] text-base">Remember Me</p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-[#4f968f] text-sm underline cursor-pointer">Forgot Password?</p>
            <p
              className="text-[#4f968f] text-sm underline cursor-pointer"
              onClick={toggleAuthMode}
            >
              {authMode === 'Login' ? 'Create an Account' : 'Already have an account? Log in'}
            </p>
          </div>

          <button
            type="submit"
            className="w-full h-10 mb-3 rounded-full bg-[#34e5d3] text-[#0e1b19] text-sm font-bold"
          >
            {authMode === 'Login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {authMode === 'Login' && (
          <>
            <p className="text-[#4f968f] text-sm text-center mb-2">New to Yoga Studio?</p>
            <button
              onClick={toggleAuthMode}
              className="w-full h-10 rounded-full bg-[#e8f3f2] text-[#0e1b19] text-sm font-bold"
            >
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
};
