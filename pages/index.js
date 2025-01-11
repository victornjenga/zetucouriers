import Head from "next/head";
import { useState } from "react";
import {
  FaArrowDown,
  FaChartLine,
  FaGlobe,
  FaMobile,
  FaLock,
  FaDesktop,
} from "react-icons/fa";
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
      name: "Agricultural Futures",
      description:
        "Agricultural futures contracts are standardized according to the amount of commodity being bought or sold, the expected time and place of delivery, and quality of the product.",
      image: "/agricultural-futures.jpg",
      href: "/products/agricultural-futures",
    },
    {
      name: "Currency Futures",
      description:
        "CMX offers active traders, portfolio managers, proprietary trading groups and corporations with access to exchange traded currency futures markets an alternative venue or liquidity source.",
      image: "/currency-futures.jpg",
      href: "/products/currency-futures",
    },
    {
      name: "Energy Futures",
      description:
        "Energy Futures assists clients in all segments of the energy spectrum including access to one of the most diverse and sophisticated energy market solutions.",
      image: "/energy-futures.jpg",
      href: "/products/energy-futures",
    },
    {
      name: "Interest Rate Derivatives",
      description:
        "Interest rate derivatives are instruments used to hedge against adverse changes of interest rates.",
      image: "/interest-rate-derivatives.jpg",
      href: "/products/interest-rate-derivatives",
    },
    {
      name: "Equity Index Futures",
      description:
        "Equity index futures are derivatives that enable investors to speculate on or hedge against the future value of a stock market index.",
      image: "/equity-index-futures.jpg",
      href: "/products/equity-index-futures",
    },
    {
      name: "Metal Futures",
      description:
        "Metal futures provide producers, manufacturers, traders, and speculators with cost-efficient trading and risk management opportunities.",
      image: "/metal-futures.jpg",
      href: "/products/metal-futures",
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
        <title>
          Ans Engineering Group | Infrastructure & Consulting Experts
        </title>
      </Head>
      {/* Hero Section with Parallax */}
      <section
        id="hero"
        className="relative  bg-fixed bg-center bg-cover flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url('/commodity-trading-hero.jpg')`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        {/* Animated Particles/Shapes (optional) */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-yellow-500/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-yellow-500/20 rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-yellow-500/20 rounded-full animate-pulse"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 space-y-8">
          {/* Small Pre-heading */}
          <div className="animate-fadeInDown">
            <span className="inline-block px-4 py-1 bg-yellow-500 text-gray-900 text-sm font-bold rounded-full mb-4 transform hover:scale-105 transition-transform">
              Welcome to CMX
            </span>
          </div>

          {/* Main Heading with Gradient */}
          <h1 className="text-5xl md:text-7xl font-extrabold animate-fadeInDown text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-white leading-tight">
            Africa's Premier <br />
            <span className="text-yellow-500">Commodity Brokerage</span>
          </h1>

          {/* Subheading with enhanced typography */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-fadeInUp font-light">
            Your trusted partner in commodity trading and futures markets
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 animate-fadeInUp">
            <a
              href="/about"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Stats Section - Redesigned */}
          <div className="w-full max-w-6xl mx-auto px-4 mt-12 md:mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                { number: "50+", label: "Global Markets" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-lg p-4 md:p-6 
                    transform hover:scale-105 transition-all duration-300
                    border border-white/10 hover:border-yellow-500/50"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator - Adjusted position */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FaArrowDown className="text-xl md:text-2xl text-yellow-500" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side - Image */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="/trading-floor.jpg"
                  alt="Trading floor"
                  className="rounded-lg shadow-2xl object-cover h-[500px] w-full"
                />
                <div className="absolute inset-0 bg-yellow-500 opacity-20 rounded-lg"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-yellow-500 opacity-10 rounded-full -z-10"></div>
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-gray-800 opacity-10 rounded-full -z-10"></div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:w-1/2">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-gray-800">
                    Why Choose Us
                  </h2>
                  <p className="text-xl text-yellow-600 font-semibold">
                    Providing Full Range of Industrial Solution
                  </p>
                </div>

                {/* Cards */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 border-l-4 border-yellow-500">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-yellow-500">
                        01
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          Expertise and Experience
                        </h3>
                        <p className="text-gray-600">
                          Our team consists of seasoned professionals with years
                          of experience in the commodity trading industry.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 border-l-4 border-yellow-500">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-yellow-500">
                        02
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          Transparency and Trust
                        </h3>
                        <p className="text-gray-600">
                          We believe in building long-lasting relationships
                          based on trust and integrity.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 border-l-4 border-yellow-500">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-yellow-500">
                        03
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          Global Reach
                        </h3>
                        <p className="text-gray-600">
                          With a widespread network and international presence,
                          we offer access to a diverse range of markets and
                          commodities.
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

      {/* Services Section with Parallax */}
      <section className="py-20 px-4 sm:px-6 bg-fixed bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg animate-fadeIn">
            Our Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 px-4 gap-12">
            {services.map((service, index) => (
              <a
                key={index}
                href={service.href}
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
                  <button className="mt-4 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-gray-700">
                    Read More
                  </button>
                </div>
              </a>
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

      {/* Trading Platforms Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Advanced Trading Platforms
            </h2>
            <p className="text-gray-400 text-lg">
              Trade anywhere, anytime with our cutting-edge platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <FaDesktop className="text-yellow-500 text-3xl mr-4" />
                  <h3 className="text-xl font-bold">CMX Trading Desktop</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li>• Advanced charting capabilities</li>
                  <li>• Real-time market data</li>
                  <li>• Multiple order types</li>
                  <li>• Custom indicators and alerts</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <FaMobile className="text-yellow-500 text-3xl mr-4" />
                  <h3 className="text-xl font-bold">Mobile Trading App</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li>• Trade on-the-go</li>
                  <li>• Real-time notifications</li>
                  <li>• Biometric security</li>
                  <li>• Portfolio monitoring</li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <img
                src="/trading-platform.png"
                alt="CMX Trading Platform"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-yellow-500 opacity-10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of traders who choose CMX for their commodity trading
            needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/register"
              className="px-8 py-4 bg-yellow-500 text-gray-900 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
            >
              Open Account
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
