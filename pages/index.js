import Head from "next/head";
import { useState } from "react";
import {
  FaArrowDown,
  FaTruck,
  FaBox,
  FaLock,
  FaClock,
  FaWarehouse,
  FaDesktop,
} from "react-icons/fa";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "Zetu Couriers has revolutionized our e-commerce delivery process with their lightning-fast service and reliable tracking.",
      name: "Mary Kamau, E-commerce Store Owner",
    },
    {
      text: "Their cash-on-delivery service has made transactions seamless for our customers across East Africa.",
      name: "John Mwangi, Retail Manager",
    },
    {
      text: "Zetu’s warehousing and fulfillment solutions have saved us time and boosted customer satisfaction.",
      name: "Fatima Ali, Logistics Coordinator",
    },
    {
      text: "The express courier service is a game-changer—same-day delivery has never been this easy!",
      name: "Peter Okoth, Small Business Owner",
    },
  ];

  const services = [
    {
      name: "Express Courier",
      description:
        "Same-day, scheduled, and overnight delivery services to meet your urgent needs with speed and reliability.",
      image: "/express-courier.jpg",
      href: "/services",
    },
    {
      name: "Cash on Delivery",
      description:
        "Secure and convenient payment collection upon delivery, widely used across East Africa.",
      image: "/cash-on-delivery.jpg",
      href: "/services",
    },
    {
      name: "Order Fulfillment",
      description:
        "From picking and packing to shipping, we ensure your orders reach customers accurately and on time.",
      image: "/order-fulfillment.jpg",
      href: "/services",
    },
    {
      name: "Warehousing",
      description:
        "Flexible short-term and long-term storage solutions with advanced warehouse management.",
      image: "/warehousing.jpg",
      href: "/services",
    },
    {
      name: "Medical Courier",
      description:
        "Specialized transport for pharmaceuticals and medical items, adhering to strict regulations.",
      image: "/medical-courier.jpg",
      href: "/services",
    },
    {
      name: "Packaging Services",
      description:
        "Comprehensive packaging solutions to ensure your items are secure and ready for transit.",
      image: "/packaging.jpg",
      href: "/services",
    },
  ];

  const nextSlide = () =>
    setActiveIndex((activeIndex + 1) % testimonials.length);
  const prevSlide = () =>
    setActiveIndex(
      (activeIndex - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="bg-gray-50 w-full z-0">
      <Head>
        <title>Zetu Couriers | East Africa's Premier Courier Service</title>
      </Head>

      {/* Hero Section with Parallax */}
      <section
        id="home"
        className="relative bg-fixed bg-center bg-cover flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url('/courier-hero.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-green-500/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-green-500/20 rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-green-500/20 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 space-y-8">
          <div className="animate-fadeInDown">
            <span className="inline-block px-4 py-1 bg-green-500 text-gray-900 text-sm font-bold rounded-full mb-4 transform hover:scale-105 transition-transform">
              Welcome to Zetu Couriers
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold animate-fadeInDown text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-white leading-tight">
            East Africa's Premier <br />
            <span className="text-green-500">Courier Service</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-fadeInUp font-light">
            Fast, reliable, and affordable courier and fulfillment solutions
          </p>

          <div className="flex flex-col sm:flex-row justify-center  gap-4 transform -translate-x-1/2 animate-bounce bottom-10">
            <a
              href="/about"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </a>
            <a
              href="/track"
              className="px-8 py-4 bg-green-500 text-gray-900 rounded-lg font-bold text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="/courier-team.jpg"
                  alt="Courier team"
                  className="rounded-lg shadow-2xl object-cover h-[500px] w-full"
                />
                <div className="absolute inset-0 bg-green-500 opacity-20 rounded-lg"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-green-500 opacity-10 rounded-full -z-10"></div>
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-gray-800 opacity-10 rounded-full -z-10"></div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-gray-800">
                    Why Choose Zetu Couriers
                  </h2>
                  <p className="text-xl text-green-600 font-semibold">
                    Your Trusted Partner in East Africa
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 border-l-4 border-green-500">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-green-500">
                        01
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          Lightning-Fast Delivery
                        </h3>
                        <p className="text-gray-600">
                          Same-day and overnight options ensure your packages
                          arrive on time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 border-l-4 border-green-500">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-green-500">
                        02
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          Reliable Fulfillment
                        </h3>
                        <p className="text-gray-600">
                          Comprehensive order processing with near-zero error
                          rates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 border-l-4 border-green-500">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-green-500">
                        03
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          Regional Expertise
                        </h3>
                        <p className="text-gray-600">
                          Serving Kenya, Uganda, and Tanzania with plans to
                          expand across Africa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 px-4 sm:px-6 bg-fixed bg-gradient-to-b from-gray-50 to-gray-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg animate-fadeIn">
            Our Courier Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 px-4 gap-12">
            {services.map((service, index) => (
              <a
                key={index}
                href={service.href}
                className="relative group overflow-hidden rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
              >
                <div
                  className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {service.description}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-gray-700">
                    Read More
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="track" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Real-Time Package Tracking
            </h2>
            <p className="text-gray-400 text-lg">
              Stay updated on your shipment’s journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <FaDesktop className="text-green-500 text-3xl mr-4" />
                  <h3 className="text-xl font-bold">Track & Trace</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li>• Real-time updates</li>
                  <li>• Secure and fast tracking system</li>
                  <li>• Accessible from any device</li>
                  <li>• Instant notifications</li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <img
                src="/tracking-dashboard.jpg"
                alt="Tracking Dashboard"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-green-500 opacity-10 rounded-full -z-10"></div>
            </div>
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
                className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors"
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
                className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Ship with Zetu?
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto">
            Partner with us for fast, reliable, and affordable courier services
            across East Africa
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-gray-900 text-gray-100 rounded-lg font-bold text-lg hover:bg-green-400 transition-colors"
            >
              Request a Quote
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
