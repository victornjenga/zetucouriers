import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserFriends,
  FaProjectDiagram,
  FaPhone,
  FaBars,
  FaAngleDown,
  FaBriefcase,
  FaNewspaper,
} from "react-icons/fa";
import { client } from "../utils/client"; // Adjust the path as needed

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from Sanity
    const fetchCategories = async () => {
      try {
        const categoriesQuery = `*[_type == "category"]{ _id, title, slug { current } }`;
        const fetchedCategories = await client.fetch(categoriesQuery);
        setCategories(fetchedCategories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="bg-gray-900 z-50 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between md:justify-around items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold flex items-center">
          <Link href="/">
            <img className="h-[40px]" src="/logo.png" alt="/" />
          </Link>
          {/* <span className="text-white-500 hidden md:flex text-2xl bold">
            Ans Engineering
          </span> */}
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
          <Link
            href="/"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Home
          </Link>

          {/* About Us Dropdown */}
          <div className="relative group z-50">
            <button className="flex items-center text-xl hover:text-yellow-500 transition duration-300">
              About Us <FaAngleDown className="ml-1" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <Link
                href="/our-history"
                className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
              >
                Our History
              </Link>
              <Link
                href="/our-team"
                className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
              >
                Our Team
              </Link>
              <Link
                href="/areas-of-specialization"
                className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
              >
                Areas Of Specialization
              </Link>
              <Link
                href="/bim"
                className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
              >
                Working with BIM
              </Link>
            </div>
          </div>

          {/* Projects Dropdown with Categories */}
          <div className="relative group z-50">
            <button className="flex items-center text-xl hover:text-yellow-500 transition duration-300">
              Projects <FaAngleDown className="ml-1" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={
                    category.slug?.current
                      ? `/projects/${category.slug.current}`
                      : "#"
                  }
                  className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/careers"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Careers
          </Link>
          <Link
            href="/media"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Media
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-500 text-xl transition duration-300"
          >
            Contact
          </Link>
          <div className="relative group z-50">
            <button className="flex items-center text-xl hover:text-yellow-500 transition duration-300">
              More <FaAngleDown className="ml-1" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <Link
                href="/companyprofile.pdf"
                className="block px-4 py-2 text-left hover:bg-gray-700 hover:text-yellow-500"
              >
                Company Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 text-white space-y-4 px-4 py-4 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          href="/"
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300"
        >
          <FaHome />
          <span>Home</span>
        </Link>

        {/* Mobile About Us Dropdown */}
        <button
          onClick={toggleServicesDropdown}
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300 w-full"
        >
          <FaUserFriends />
          <span>About Us</span>
          <FaAngleDown />
        </button>
        {isServicesOpen && (
          <div className="space-y-2 mt-2 px-4 text-left">
            <Link
              href="/our-history"
              className="block hover:text-yellow-500 transition duration-300"
            >
              Our History
            </Link>
            <Link
              href="/our-team"
              className="block hover:text-yellow-500 transition duration-300"
            >
              Our Team
            </Link>
            <Link
              href="/areas-of-specialization"
              className="block hover:text-yellow-500 transition duration-300"
            >
              Areas Of Specialization
            </Link>
            <Link
              href="/bim"
              className="block hover:text-yellow-500 transition duration-300"
            >
              Working with BIM
            </Link>
          </div>
        )}

        {/* Projects with Categories */}
        <div>
          <button
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300 w-full"
          >
            <FaProjectDiagram />
            <span>Projects</span>
            <FaAngleDown />
          </button>
          {isServicesOpen &&
            categories.map((category) => (
              <Link
                key={category._id}
                href={
                  category.slug?.current
                    ? `/projects/${category.slug.current}`
                    : "#"
                }
                className="block hover:text-yellow-500 px-4 transition duration-300 text-left"
              >
                {category.title}
              </Link>
            ))}
        </div>

        <Link
          href="/careers"
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300"
        >
          <FaBriefcase />
          <span>Careers</span>
        </Link>
        <Link
          href="/media"
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300"
        >
          <FaNewspaper />
          <span>Media</span>
        </Link>
        <Link
          href="/contact"
          className="flex items-center space-x-2 hover:text-yellow-500 text-xl transition duration-300"
        >
          <FaPhone />
          <span>Contact</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
