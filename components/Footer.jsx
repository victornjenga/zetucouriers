import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">About Us</h3>
          <p className="text-gray-400 leading-relaxed">
            Ans Engineering Group Ltd. is a leading engineering consultancy
            firm, delivering innovative and sustainable civil and structural
            solutions across East Africa.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#about"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Our Services
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#cta"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-6 justify-center lg:justify-start">
            <a
              href="#"
              className="text-2xl text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter for the latest news on our engineering
            services and projects.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        <p>&copy; 2024 Ans Engineering Group Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
