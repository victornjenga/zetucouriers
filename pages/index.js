import Head from "next/head";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { client } from "../utils/client";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "Ans Engineering provided exceptional services in our infrastructure project, ensuring quality and sustainability throughout.",
      name: "James Mwangi, Kenya Infrastructure Group",
    },
    {
      text: "Their expertise in structural engineering and project management was critical to our success.",
      name: "Njeri Wambui, Nairobi City Planning",
    },
    {
      text: "Ans Engineering’s approach to safety and sustainability impressed us from the start. Truly a reliable partner.",
      name: "Paul Otieno, East Africa Developers",
    },
  ];

  const services = [
    {
      name: "Civil Engineering",
      description:
        "Delivering innovative civil engineering solutions for roads, bridges, and infrastructure.",
      image: "/civil-engineering.jpg",
    },
    {
      name: "Structural Engineering",
      description:
        "Designing safe, efficient, and sustainable structures for a variety of sectors.",
      image: "/structural-engineering.jpg",
    },
    {
      name: "Construction Supervision",
      description:
        "Providing on-site supervision and ensuring projects meet industry standards and client expectations.",
      image: "/construction-supervision.jpg",
    },
  ];

  const nextSlide = () =>
    setActiveIndex((activeIndex + 1) % testimonials.length);
  const prevSlide = () =>
    setActiveIndex(
      (activeIndex - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>
          Ans Engineering Group | Infrastructure & Consulting Experts
        </title>
      </Head>

      {/* Hero Section with Parallax */}
      <section
        id="hero"
        className="relative h-[60vh] md:h-[80vh] bg-fixed bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/engineering-hero.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-4 sm:space-y-6 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold animate-fadeInDown">
            Building a Sustainable Future
          </h1>
          <p className="text-lg md:text-xl animate-fadeInUp">
            Quality, safety, and innovation in every project.
          </p>
          <a
            href="/projects"
            className="mt-6 md:mt-8 inline-block bg-yellow-500 text-gray-900 px-6 md:px-8 py-2 md:py-3 rounded-lg shadow-lg hover:bg-yellow-600 font-semibold animate-bounce transition-transform transform hover:scale-105"
          >
            Explore Our Projects
          </a>
        </div>

        {/* Arrow Down Icon */}
        <FaArrowDown className="absolute bottom-6 md:bottom-10 text-xl md:text-2xl text-yellow-500 animate-bounce" />
      </section>

      {/* Core Values Section */}
      <section
        id="values"
        className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-yellow-500">
                Quality
              </h3>
              <p className="text-gray-600">
                We believe in quality as a continuous process, ensuring every
                project is delivered to the highest standards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-yellow-500">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We are committed to minimizing environmental impact and
                promoting sustainability in all our operations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-yellow-500">
                Safety
              </h3>
              <p className="text-gray-600">
                Safety is at the core of our practices. We implement the highest
                safety standards on all projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Parallax */}
      <section
        id="services"
        className="py-20 px-4 sm:px-6 bg-fixed bg-gradient-to-b from-gray-50 to-gray-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg animate-fadeIn">
            Our Engineering Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 px-4 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
              >
                {/* Service Background Image */}
                <div
                  className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>

                {/* Text Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="relative">
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition-colors"
              >
                ‹
              </button>
              <div className="w-2/3">
                <div className="text-center p-8 bg-gray-50 shadow-lg rounded-lg">
                  <p className="text-lg text-gray-700 mb-4 italic">
                    "{testimonials[activeIndex].text}"
                  </p>
                  <p className="text-lg font-semibold">
                    - {testimonials[activeIndex].name}
                  </p>
                </div>
              </div>
              <button
                onClick={nextSlide}
                className="p-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="cta"
        className="relative py-16 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg animate-fadeIn">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeIn delay-200">
            Let’s build together. Contact us for consultancy or project
            execution.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-gray-100 text-yellow-500 font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
