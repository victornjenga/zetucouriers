import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [visible, setVisible] = useState(true); // Set to true for immediate visibility

  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>Contact Us | Elevating Culinary Experiences</title>
        <meta
          name="description"
          content="Get in touch with us to elevate your culinary experiences. We're here to help!"
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url('/contact-hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold">Get in Touch</h1>
          <p className="text-xl md:text-2xl mt-4">
            We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12 tracking-wide">
            Contact Information
          </h2>
          <div
            className={`grid md:grid-cols-3 gap-12 transition-opacity duration-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 space-y-4">
              <FaEnvelope size={40} className="mx-auto text-yellow-500" />
              <h3 className="text-2xl font-semibold text-gray-900">Email</h3>
              <p className="text-lg text-gray-700">
                support@menuyetu.com
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 space-y-4">
              <FaPhoneAlt size={40} className="mx-auto text-yellow-500" />
              <h3 className="text-2xl font-semibold text-gray-900">Phone</h3>
              <p className="text-lg text-gray-700">+1 (234) 567-8900</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 space-y-4">
              <FaMapMarkerAlt size={40} className="mx-auto text-yellow-500" />
              <h3 className="text-2xl font-semibold text-gray-900">Address</h3>
              <p className="text-lg text-gray-700">
                123 Culinary Ave, Food City, Nairobi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Find Us Here
          </h2>
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434507313!2d144.95373531531684!3d-37.81627997975177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0b07f7%3A0x5045675218cedc0!2s123%20Culinary%20Ave%2C%20Food%20City%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1627075639275!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Send Us a Message
          </h2>
          <form className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-lg font-semibold text-gray-700">
                Message
              </label>
              <textarea
                rows="6"
                placeholder="Your Message"
                className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-lg transition duration-300 hover:bg-yellow-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
