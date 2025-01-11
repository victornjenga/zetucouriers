import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">About Us</h3>
          <p className="text-gray-400 leading-relaxed">
            CNC Commodities is a premier commodity trading platform,
            specializing in agricultural products, derivatives, and
            comprehensive trading solutions across East Africa. We connect
            producers and buyers while ensuring market efficiency and
            transparency.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/trading-platform"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Trading Platform
              </a>
            </li>
            <li>
              <a
                href="/market-insights"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Market Insights
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Our Products
              </a>
            </li>
            <li>
              <a
                href="/resources"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Resources
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
          <div className="flex space-x-6 justify-center lg:justify-start">
            <a
              href="#"
              className="text-2xl text-gray-400 hover:text-yellow-500 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-400 hover:text-yellow-500 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-400 hover:text-yellow-500 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-400 hover:text-yellow-500 transition duration-300"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-4">
            Get in touch for trading inquiries and support:
          </p>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center">
              <FaPhone className="mr-2 text-yellow-500" />
              <span>+254 722 000 000</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-yellow-500" />
              <span>info@cnccommodities.com</span>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-yellow-500" />
              <span>Westlands Business Center, Nairobi, Kenya</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} CNC Commodities. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
