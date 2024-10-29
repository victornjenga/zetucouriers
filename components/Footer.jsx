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
                href="/our-team"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Our Team
              </a>
            </li>
            <li>
              <a
                href="/our-clients"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Our Clients
              </a>
            </li>
            <li>
              <a
                href="/contacts"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Contacts
              </a>
            </li>
            <li>
              <a
                href="/media"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Media
              </a>
            </li>
            <li>
              <a
                href="/career"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Career
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

        {/* Contact Information Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-4">
            Reach out for any inquiries or support:
          </p>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center">
              <FaPhone className="mr-2 text-yellow-500" />
              <span>+254 720 612 649 </span>
              {/* <span>+254 732 246 065</span>
              <span>+254 731 454 809</span> */}
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-yellow-500" />
              <span>info@aegl.co.ke</span>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-yellow-500" />
              <span>123 Engineering Way, Nairobi, Kenya</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        <p>&copy; 2024 Ans Engineering Group Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
