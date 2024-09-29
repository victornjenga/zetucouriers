import React, { useState } from 'react';
import { FaHome, FaUtensils, FaTags, FaPhone, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <a href="#" className="hover:text-yellow-500 transition duration-300">
            MenuYetu
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <FaBars className="w-8 h-8 text-gray-400 hover:text-yellow-500 transition" />
          </button>
        </div>

        {/* Nav Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-8">
          <a href="/about" className="hover:text-yellow-500 transition duration-300">
            About
          </a>
          <a href="/hotels" className="hover:text-yellow-500 transition duration-300">
            Hotels
          </a>
          <a href="/account" className="hover:text-yellow-500 transition duration-300">
            Account
          </a>
          <a href="/contact" className="hover:text-yellow-500 transition duration-300">
            Contact
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 text-white space-y-4 px-4 py-4 text-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <a href="/about" className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300">
          <FaUtensils />
          <span>About</span>
        </a>
        <a href="/hotels" className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300">
          <FaUtensils />
          <span>Hotels</span>
        </a>
        <a href="/account" className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300">
          <FaTags />
          <span>Account</span>
        </a>
        <a href="/contact" className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300">
          <FaPhone />
          <span>Contact</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
