import Head from "next/head";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>Ans Engineering Group | Contact Us</title>
      </Head>

      {/* Hero Section with Parallax */}
      <section
        id="hero"
        className="relative h-[50vh] md:h-[60vh] bg-fixed bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/contact-hero.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-4 sm:space-y-6 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold animate-fadeInDown">
            Get in Touch with Us
          </h1>
          <p className="text-lg md:text-xl animate-fadeInUp">
            We are here to assist you with your project needs.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section
        id="contact-info"
        className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Office Address */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
              <FaMapMarkerAlt className="text-yellow-500 text-4xl mr-6" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Our Office</h3>
                <p className="text-gray-600">
                  LungaLunga Square, 2nd Floor, Room No.225
                  <br />
                  Linga Lunga Road
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
              <FaPhoneAlt className="text-yellow-500 text-4xl mr-6" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Contact Numbers</h3>
                <p className="text-gray-600">
                  +254 720 612 649
                  <br />
                  +254 732 246 065
                  <br />
                  +254 731 454 809
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
              <FaEnvelope className="text-yellow-500 text-4xl mr-6" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Email Address</h3>
                <p className="text-gray-600">info@ans-engineers.co.ke</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact-form"
        className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg animate-fadeIn">
            Send Us a Message
          </h2>
          <form
            action="/send-message"
            method="POST"
            className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">
                Message
              </label>
              <textarea
                name="message"
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
