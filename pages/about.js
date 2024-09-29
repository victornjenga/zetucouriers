import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    });

    elements.forEach((el) => {
      observer.observe(el);
    });
  }, []);

  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>About Us | Elevating Culinary Experiences</title>
        <meta
          name="description"
          content="Learn more about our mission to provide world-class dining experiences from top hotels across the globe."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url('/about-hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Discover the Art of Fine Dining
          </h1>
          <p className="text-xl md:text-2xl mt-4">
            A world of taste, elegance, and unforgettable moments.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 fade-in">
            Our Story
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 fade-in">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to a culinary journey that transcends the ordinary. Our
                platform brings together the finest hotels, each offering
                handpicked menus curated by world-renowned chefs. We believe
                that dining is not just a meal—it’s an experience that engages
                all the senses.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From cosmopolitan cities to coastal escapes, our selection of
                restaurants promises unforgettable tastes, luxurious
                atmospheres, and exceptional service. Whether you're a local or
                a traveler, we ensure that every meal is a celebration.
              </p>
            </div>
            <div className="fade-in">
              <img
                src="/about-image.jpg"
                alt="Fine dining experience"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-5xl font-extrabold mb-8 text-gray-900 fade-in">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 space-y-4 fade-in">
              <FaMapMarkerAlt size={30} className="mx-auto text-yellow-500" />
              <h3 className="text-3xl font-semibold text-gray-900">
                Global Excellence
              </h3>
              <p className="text-gray-700">
                Our partners are global icons of luxury, bringing you the finest
                dining from top hotels in every corner of the world.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 space-y-4 fade-in">
              <FaMapMarkerAlt size={30} className="mx-auto text-yellow-500" />
              <h3 className="text-3xl font-semibold text-gray-900">
                Curated Menus
              </h3>
              <p className="text-gray-700">
                Every dish we feature has been handpicked to ensure quality,
                creativity, and a memorable dining experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 space-y-4 fade-in">
              <FaMapMarkerAlt size={30} className="mx-auto text-yellow-500" />
              <h3 className="text-3xl font-semibold text-gray-900">
                Unforgettable Moments
              </h3>
              <p className="text-gray-700">
                We aim to create dining experiences that leave a lasting
                impression, turning meals into extraordinary memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 sm:px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 fade-in">
            Vision & Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 fade-in">
              <h3 className="text-3xl font-semibold text-gray-900">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the world's leading platform for fine dining, connecting
                luxury hotels with discerning guests who value quality, taste,
                and experience.
              </p>
            </div>
            <div className="space-y-6 fade-in">
              <h3 className="text-3xl font-semibold text-gray-900">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To elevate the art of dining by partnering with the most
                prestigious hotels and offering curated culinary experiences
                that tantalize the palate and stir the soul.
              </p>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}
