import Head from "next/head";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper"; // Import Swiper modules
import "swiper/css"; // Swiper core styles
import "swiper/css/pagination"; // Pagination styles
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
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      text: "Zetu Couriers has revolutionized our e-commerce delivery process with their lightning-fast service and reliable tracking.",
      name: "Mary Kamau, E-commerce Store Owner",
      image: "/mary-kamau.jpg", // Placeholder image
    },
    {
      text: "Their cash-on-delivery service has made transactions seamless for our customers across East Africa.",
      name: "John Mwangi, Retail Manager",
      image: "/john-mwangi.jpg", // Placeholder image
    },
    {
      text: "Zetu's warehousing and fulfillment solutions have saved us time and boosted customer satisfaction.",
      name: "Fatima Ali, Logistics Coordinator",
      image: "/fatima-ali.jpg", // Placeholder image
    },
    {
      text: "The express courier service is a game-changer—same-day delivery has never been this easy!",
      name: "Peter Okoth, Small Business Owner",
      image: "/peter-okoth.jpg", // Placeholder image
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

  const nextTestimonial = () =>
    setTestimonialIndex((testimonialIndex + 1) % testimonials.length);
  const prevTestimonial = () =>
    setTestimonialIndex(
      (testimonialIndex - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="bg-gray-50 w-full z-0">
      <Head>
        <title>Zetu Couriers | East Africa's Premier Courier Service</title>
      </Head>

      {/* Hero Section Slider with Swiper */}
      <section id="home" className="relative  overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="relative bg-fixed bg-center bg-cover flex flex-col items-center justify-center text-center "
              style={{ backgroundImage: `url('/courier-hero.jpg')` }}
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
                  Fast, reliable, and affordable courier and fulfillment
                  solutions
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 transform animate-bounce">
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
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="relative bg-fixed bg-center bg-cover flex flex-col items-center justify-center text-center "
              style={{ backgroundImage: `url('/express-courier.jpg')` }}
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
                    Lightning-Fast Delivery
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold animate-fadeInDown text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-white leading-tight">
                  Express Courier <br />
                  <span className="text-green-500">Across East Africa</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-fadeInUp font-light">
                  Same-day and overnight options for your urgent needs
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 transform animate-bounce">
                  <a
                    href="/services"
                    className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                  >
                    Explore Services
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-4 bg-green-500 text-gray-900 rounded-lg font-bold text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="relative bg-fixed bg-center bg-cover flex flex-col items-center justify-center text-center "
              style={{ backgroundImage: `url('/order-fulfillment.jpg')` }}
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
                    Seamless Fulfillment
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold animate-fadeInDown text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-white leading-tight">
                  Order Fulfillment <br />
                  <span className="text-green-500">Made Simple</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-fadeInUp font-light">
                  From warehousing to delivery, we've got you covered
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 transform animate-bounce">
                  <a
                    href="/services"
                    className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                  >
                    Learn More
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-4 bg-green-500 text-gray-900 rounded-lg font-bold text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>
          </SwiperSlide>
        </Swiper>
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

      {/* Mission, Vision, and Values Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission & Vision */}
            <div className="space-y-12">
              {/* Mission */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  At Zetu Courier, our mission is to redefine logistics and fulfillment in Kenya by offering fast, reliable, and cost-effective courier services designed to meet the evolving needs of businesses and individuals. We are dedicated to harnessing innovative technology, delivering exceptional customer experiences, and adopting sustainable practices to provide end-to-end solutions that drive efficiency and growth for our clients.
                </p>
              </div>
              
              {/* Vision */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the most trusted and innovative courier and fulfillment partner in Kenya, setting the standard for speed, reliability, and customer satisfaction. We envision a future where Zetu Courier empowers businesses and individuals to connect, grow, and succeed by providing seamless logistics solutions that bridge distances and create opportunities.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Customer-Centricity</h4>
                    <p className="text-gray-600">We prioritize our customers' needs above all else, delivering tailored solutions and exceptional service to build lasting relationships and trust.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Reliability</h4>
                    <p className="text-gray-600">We are committed to consistency and dependability in every delivery, ensuring that our clients can count on us to meet their logistics needs with precision and care.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h4>
                    <p className="text-gray-600">We embrace technology and creative thinking to continuously improve our services, streamline operations, and stay ahead in a competitive industry.</p>
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
              Stay updated on your shipment's journey
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

      {/* Testimonials Section with Profile Pics */}
      <section id="reviews" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="relative">
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors"
              >
                ‹
              </button>
              <div className="w-2/3">
                <div className="text-center p-8 bg-gray-50 shadow-lg rounded-lg">
                  <img
                    src={testimonials[testimonialIndex].image}
                    alt={testimonials[testimonialIndex].name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <p className="text-lg text-gray-700 mb-4 italic">
                    "{testimonials[testimonialIndex].text}"
                  </p>
                  <p className="text-lg font-semibold">
                    - {testimonials[testimonialIndex].name}
                  </p>
                </div>
              </div>
              <button
                onClick={nextTestimonial}
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
