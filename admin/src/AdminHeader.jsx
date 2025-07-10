import { NavLink } from "react-router-dom";
import { useState } from "react";

export const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const navigate = useNavigate();

  // Dummy image for profile – replace with dynamic admin profile URL
  const profileImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <header className="border-b border-[#e8eef3] px-4 sm:px-6 lg:px-10 py-3 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3 text-[#0e161b]">
          <div className="w-6 h-6">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#1890bf]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">Admin Panel</h2>
        </div>

        

          {/* Profile Image */}
          <button>
            <div
              className="w-10 h-10 bg-center bg-cover rounded-full border border-[#e7eef4] hover:scale-105 transition-transform duration-200"
              style={{ backgroundImage: `url("${profileImage}")` }}
            ></div>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Profile */}
          <button>
            <div
              className="w-9 h-9 bg-center bg-cover rounded-full border border-[#e7eef4]"
              style={{ backgroundImage: `url("${profileImage}")` }}
            ></div>
          </button>

          {/* Hamburger Button */}
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
     


    </header>
  );
};
