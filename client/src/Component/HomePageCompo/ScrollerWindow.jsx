
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { YogaContext } from '../../Context/ContextApi';

export const ScrollerWindow = () => {
  const { token } = useContext(YogaContext);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
            url("https://cdn.usegalileo.ai/sdxl10/41859a36-8ff6-47bb-8ced-715ad7779470.png")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-16 gap-6 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
            🧘‍♂️ Find Your Flow
          </h1>

          <p className="text-base sm:text-lg max-w-2xl font-light drop-shadow-md leading-relaxed">
            Join thousands of members worldwide. Access yoga classes, workshops, and guided training. Stream anytime, anywhere — even offline.
          </p>

          {/* ✅ Show Get Started only if token is not present */}
          {!token && (
            <NavLink to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 text-sm sm:text-base">
                🚀 Get Started
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
