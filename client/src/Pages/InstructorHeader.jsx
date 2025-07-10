import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { YogaContext } from "../Context/ContextApi";

export const InstructorHeader = () => {
  const { imagePreview } = useContext(YogaContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">Instructor Dashboard</h2>
        </div>

        
          {/* Profile Image */}
          <button onClick={() => navigate("/instructor/profile")}>
            <div
              className="w-10 h-10 bg-center bg-cover rounded-full border border-[#e7eef4] hover:scale-105 transition-transform duration-200"
              style={{
                backgroundImage: `url("${imagePreview}")`,
              }}
            ></div>
          </button>
        </div>

        {/* Mobile Menu Button & Profile */}
        <div className="md:hidden flex items-center gap-3">
          {/* Profile (Mobile) */}
          <button onClick={() => navigate("/instructor/profile")}>
            <div
              className="w-9 h-9 bg-center bg-cover rounded-full border border-[#e7eef4]"
              style={{
                backgroundImage: `url("${imagePreview}")`,
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
      {/* </div> */}

    </header>
  );
};
