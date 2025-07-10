

import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#f1f9f8] text-[#0e1b19] px-6 sm:px-10 lg:px-20 py-10 font-['Noto_Sans']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#3e7e76] mb-3">Yoga Studio</h2>
          <p className="text-sm leading-relaxed text-[#4e5d5a]">
            Breathe. Stretch. Relax. Join our global community to unlock peace of mind and wellness through guided yoga practice.
          </p>
        </div>

        {/* Classes */}
        <div>
          <h3 className="text-lg font-semibold text-[#3e7e76] mb-4">Classes</h3>
          <ul className="space-y-2 text-sm text-[#4e5d5a]">
            {['Beginner Yoga', 'Hatha Yoga', 'Vinyasa Flow', 'Kids Yoga'].map((item, idx) => (
              <li key={idx}>
                <Link to="#" className="hover:text-[#2a5e58] transition-all duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#3e7e76] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[#4e5d5a]">
            <li><Link to="/aboutus" className="hover:text-[#2a5e58]">About Us</Link></li>
            <li><Link to="/trainer" className="hover:text-[#2a5e58]">Instructors</Link></li>
            <li><Link to="/freeAsans" className="hover:text-[#2a5e58]">Schedule</Link></li>
            <li><Link to="/contact" className="hover:text-[#2a5e58]">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#3e7e76] mb-4">Contact Us</h3>
          <p className="text-sm text-[#4e5d5a]">📍 123 Zen Street, Wellness City</p>
          <p className="text-sm text-[#4e5d5a]">📞 (123) 456-7890</p>
          <p className="text-sm text-[#4e5d5a]">📧 contact@yogastudio.com</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t mt-10 border-[#cde3df]"></div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#4f968f]">
        <p className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} Yoga Studio. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#2d6f69] transition-all">Privacy</a>
          <a href="#" className="hover:text-[#2d6f69] transition-all">Terms</a>
          <a href="#" className="hover:text-[#2d6f69] transition-all">Help</a>
        </div>
      </div>
    </footer>
  );
};
