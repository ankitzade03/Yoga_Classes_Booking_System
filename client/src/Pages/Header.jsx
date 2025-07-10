
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { YogaContext } from "../Context/ContextApi";

export const Header = () => {

  const {profile}=useContext(YogaContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // for redirection on profile image click

  return (
    <header className="border-b border-[#e8eef3] px-4 sm:px-6 lg:px-10 py-3 bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 text-[#0e161b]">
          <div className="w-5 h-5">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">Yoga Studio</h2>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <NavLink to="/user/" className="text-sm font-medium text-[#0e161b]">Home</NavLink>
            <NavLink to="/user/my-entrolled-classes" className="text-sm font-medium text-[#0e161b]">My Classes</NavLink>
            <NavLink to="/user/trainers" className="text-sm font-medium text-[#0e161b]">Instructors</NavLink>
            <NavLink to="/user/yogasans" className="text-sm font-medium text-[#0e161b]">yogasans</NavLink>
            <NavLink to="/user/contact" className="text-sm font-medium text-[#0e161b]">Contact</NavLink>
            <NavLink to="/user/aboutus" className="text-sm font-medium text-[#0e161b]">AboutUs</NavLink>
          </nav>

          {/* Profile Image (Desktop) */}
          <button onClick={() => navigate("/user/userProfile")}>
            <div
              className="w-10 h-10 bg-center bg-no-repeat bg-cover rounded-full border border-[#e7eef4] hover:scale-105 transition-transform duration-200"
              style={{
                backgroundImage: `url("${profile}")`,
              }}
            ></div>
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Profile Image (Right side) */}
          <button onClick={() => navigate("/user/userProfile")}>
            <div
              className="w-9 h-9 bg-center bg-no-repeat bg-cover rounded-full border border-[#e7eef4]"
              style={{
                backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/818c17b7-3930-4924-954f-9c3b818318da.png")`,
              }}
            ></div>
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6 text-[#0e161b]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 px-1">
          <NavLink to="/user/" className="block text-sm font-medium text-[#0e161b]">Home</NavLink>
          <NavLink to="/user/yogasans " className="block text-sm font-medium text-[#0e161b]">yogasans</NavLink>
          <NavLink to="/user/trainers" className="block text-sm font-medium text-[#0e161b]">Instructors</NavLink>
          <NavLink to="/user/contact" className="block text-sm font-medium text-[#0e161b]">Contact</NavLink>
          <NavLink to="/user/aboutus" className="block text-sm font-medium text-[#0e161b]">AboutUs</NavLink>
        </div>
      )}
    </header>
  );
};


// components/PublicHeader.jsx
export const PublicHeader = () => (
  <header className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 shadow-md py-6 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 drop-shadow">
        🧘 Welcome to the Yoga Wellness Platform
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        Balance your body and mind – anytime, anywhere.
      </p>
    </div>
  </header>
);
