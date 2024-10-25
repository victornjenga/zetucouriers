import React, { useState } from "react";
import {
  FaHome,
  FaUtensils,
  FaTags,
  FaPhone,
  FaBars,
  FaAngleDown,
} from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <a
            href="/"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Ans Engineering
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
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="/"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Home
          </a>
          <div className="relative group justify-start">
            <button className="flex items-center hover:text-yellow-500 transition duration-300">
              About Us <FaAngleDown className="ml-1" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <a
                href="/our-team"
                className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
              >
                Our Team
              </a>
              <a
                href="/areas-of-specialization"
                className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
              >
                Areas Of Specialization
              </a>
              <a
                href="/bim"
                className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
              >
                Working with BIM
              </a>
            </div>
          </div>

          <a
            href="/projects"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Projects
          </a>

          <a
            href="/careers"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Careers
          </a>
          <a
            href="/contact"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 text-white space-y-4 px-4 py-4 text-center ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <a
          href="/"
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300"
        >
          <FaHome />
          <span>Home</span>
        </a>
        <div>
          <button
            onClick={toggleServicesDropdown}
            className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300 w-full "
          >
            <FaUtensils />
            <span>About Us</span>
            <FaAngleDown />
          </button>
          {/* Mobile Dropdown for Services */}
          {isServicesOpen && (
            <div className="space-y-2 mt-2">
              <a
                href="/our-team"
                className="block hover:text-yellow-500 transition duration-300"
              >
                Civil Engineering
              </a>
              <a
                href="/areas-of-specialiazation"
                className="block hover:text-yellow-500 transition duration-300"
              >
                Areas Of Specialization
              </a>
              <a
                href="/bim"
                className="block hover:text-yellow-500 transition duration-300"
              >
                Working with BIM
              </a>
            </div>
          )}
        </div>

        <a
          href="/projects"
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300"
        >
          <FaTags />
          <span>Projects</span>
        </a>
        <a
          href="/careers"
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300"
        >
          <FaTags />
          <span>Careers</span>
        </a>
        <a
          href="/contact"
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300"
        >
          <FaPhone />
          <span>Contact</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
