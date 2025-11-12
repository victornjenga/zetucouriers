import React, { useState } from "react";
import {
  FaHome,
  FaUtensils,
  FaTags,
  FaPhone,
  FaBars,
  FaBriefcase,
  FaNewspaper,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { Link as LinkScroll } from "react-scroll";
import { BsPeopleFill } from "react-icons/bs";
import {
  FiAlignRight,
  FiXCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { IoFastFood } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { HiPlus } from "react-icons/hi"; // Plus icon for the button
import { client } from "../utils/client"; // Adjust the path as needed
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [scrollActive, setScrollActive] = useState(false);
  const router = useRouter();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg z-10 ">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-around items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <img className="h-[40px]" src="/logo.png" alt="/" />
          </Link>
          {/* <Link href="/">
            <h2 className="text-2xl font-bold">Zetu Couriers</h2>
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <FaBars className="w-8 h-8 text-gray-400 hover:text-green-500 transition" />
          </button>
        </div>

        {/* Nav Links (Hidden on Mobile) */}
        <div className="hidden items-center md:flex space-x-8">
          <a
            href="/"
            className="hover:text-green-500 transition duration-300 text-lg font-medium"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-green-500 transition duration-300 text-lg font-medium"
          >
            About
          </a>
          <a
            href="/services"
            className="hover:text-green-500 transition duration-300 text-lg font-medium"
          >
            Services
          </a>
          <a
            href="/contact"
            className="hover:text-green-500 transition duration-300 text-lg font-medium"
          >
            Contact
          </a>
          <div className="flex items-center space-x-4">
            <Link
              href="tel:+2547012345678"
              className="px-4 py-2 text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
            >
              Call Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 text-white space-y-4 px-4 py-4 text-center ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          href="/"
          className="flex items-center space-x-2 hover:text-green-500 text-xl transition duration-300"
        >
          <FaHome />
          <span>Home</span>
        </Link>

        <Link
          href="/services"
          className="flex items-center space-x-2 hover:text-green-500 text-xl transition duration-300"
        >
          <FaBriefcase />
          <span>Services</span>
        </Link>
        <Link
          href="/about"
          className="flex items-center space-x-2 hover:text-green-500 text-xl transition duration-300"
        >
          <FaNewspaper />
          <span>About</span>
        </Link>
        <Link
          href="/contact"
          className="flex items-center space-x-2 hover:text-green-500 text-xl transition duration-300"
        >
          <FaPhone />
          <span>Contact</span>
        </Link>
      </div>
      {router.pathname === "/" && (
        <nav className="fixed lg:hidden bottom-0  left-0 right-0 z-20  shadow-t ">
          <div className="bg-white sm:px-3">
            <ul className="flex w-full justify-between items-center text-gray-800">
              <LinkScroll
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("home");
                }}
                className={
                  "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                  (activeLink === "home"
                    ? "  border-green-500 text-green-500"
                    : " border-transparent")
                }
              >
                <FaHome className="w-6 h-6" />
                Home
              </LinkScroll>

              <LinkScroll
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("about");
                }}
                className={
                  "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                  (activeLink === "about"
                    ? "  border-green-500 text-green-500"
                    : " border-transparent ")
                }
              >
                <AiFillMessage className="w-6 h-6" />
                About
              </LinkScroll>
              <LinkScroll
                activeClass="active"
                to="services"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("services");
                }}
                className={
                  "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                  (activeLink === "services"
                    ? "  border-green-500 text-green-500"
                    : " border-transparent ")
                }
              >
                <FaBriefcase className="w-6 h-6" />
                Services
              </LinkScroll>
              <LinkScroll
                activeClass="active"
                to="reviews"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("reviews");
                }}
                className={
                  "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                  (activeLink === "reviews"
                    ? "  border-green-500 text-green-500"
                    : " border-transparent ")
                }
              >
                <BsPeopleFill className="w-6 h-6" />
                Testimonial
              </LinkScroll>
            </ul>
          </div>
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
