import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "The steak from Skyline Hotel was absolutely divine! Perfectly cooked and bursting with flavor.",
      name: "John Doe",
    },
    {
      text: "I had the best seafood platter at Ocean Breeze. Fresh, flavorful, and beautifully presented!",
      name: "Jane Smith",
    },
    {
      text: "The desserts at Hotel Paradise were out of this world! A must-try for anyone with a sweet tooth.",
      name: "Michael Brown",
    },
  ];

  const dishes = [
    {
      name: "Grilled Ribeye Steak",
      description:
        "A succulent grilled ribeye with herb butter and seasonal vegetables.",
      image: "/dish1.jpg",
      hotel: "Skyline Hotel",
    },
    {
      name: "Seafood Platter",
      description:
        "A delightful mix of lobster, shrimp, and oysters, served with lemon butter sauce.",
      image: "/dish2.jpg",
      hotel: "Ocean Breeze",
    },
    {
      name: "Tiramisu",
      description:
        "A classic Italian dessert made with layers of mascarpone and espresso-soaked ladyfingers.",
      image: "/dish3.jpg",
      hotel: "Hotel Paradise",
    },
  ];

  const nextSlide = () =>
    setActiveIndex((activeIndex + 1) % testimonials.length);
  const prevSlide = () =>
    setActiveIndex(
      (activeIndex - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="bg-gray-50 w-full ">
      <Head>
        <title>Luxury Hotels Menu | Culinary Delights</title>
      </Head>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/hero-food.jpg')`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 space-y-4 sm:space-y-6 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold animate-fadeInDown">
            Savor Exquisite Flavors
          </h1>
          <p className="text-lg md:text-xl animate-fadeInUp">
            Indulge in the finest dishes from world-class hotels.
          </p>
          <a
            href="/hotels"
            className="mt-6 md:mt-8 inline-block bg-yellow-500 text-gray-900 px-6 md:px-8 py-2 md:py-3 rounded-lg shadow-lg hover:bg-yellow-600 font-semibold animate-bounce"
          >
            View Menu
          </a>
        </div>

        {/* Arrow Down Icon */}
        <FaArrowDown className="absolute bottom-6 md:bottom-10 text-xl md:text-2xl text-yellow-500 animate-bounce" />
      </section>

      {/* Featured Menu Categories Section */}
      <section
        id="menu-categories"
        className="py-16  px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Explore Our Menu Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Appetizers Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl hover:scale-105 text-center">
              <h3 className="text-3xl font-bold mb-4 text-yellow-500">
                Appetizers
              </h3>
              <p className="text-gray-600">
                Start your meal with delightful appetizers.
              </p>
            </div>
            {/* Main Course Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl hover:scale-105 text-center">
              <h3 className="text-3xl font-bold mb-4 text-yellow-500">
                Main Course
              </h3>
              <p className="text-gray-600">
                Experience the finest main dishes from top hotels.
              </p>
            </div>
            {/* Desserts Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl hover:scale-105 text-center">
              <h3 className="text-3xl font-bold mb-4 text-yellow-500">
                Desserts
              </h3>
              <p className="text-gray-600">
                End your meal with sweet indulgence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section
        id="dishes"
        className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg animate-fadeIn">
            Top Dishes from Our Partner Hotels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {dishes.map((dish, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
              >
                {/* Background Image */}
                <div
                  className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${dish.image})` }}
                ></div>

                {/* Text Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {dish.description}
                  </p>
                  <p className="text-lg text-yellow-500 font-semibold">
                    from {dish.hotel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef's Recommendations Section */}
      <section id="chefs-recommendations" className="py-16  px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Chef's Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-yellow-500 p-6 rounded-lg shadow-lg text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Lobster Thermidor</h3>
              <p>
                Succulent lobster in a creamy sauce, served with rice pilaf.
              </p>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg shadow-lg text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Wagyu Beef Burger</h3>
              <p>
                Premium wagyu beef patty with truffle aioli and smoked gouda.
              </p>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg shadow-lg text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Creme Brulee</h3>
              <p>A classic dessert with a perfectly caramelized sugar crust.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section id="special-offers" className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Exclusive Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Happy Hour Special</h3>
              <p className="text-gray-600">
                Enjoy 20% off on select beverages and appetizers during happy
                hour at Hotel Paradise.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Sunday Brunch Buffet</h3>
              <p className="text-gray-600">
                Indulge in a lavish buffet with a wide range of dishes at Ocean
                Breeze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-16 ">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Diners Say
          </h2>
          <div className="relative">
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 bg-yellow-500 rounded-full text-white"
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
                className="p-2 bg-yellow-500 rounded-full text-white"
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
            Ready to Indulge in Gourmet Delights?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeIn delay-200">
            Book a table or order from your favorite hotels now!
          </p>
          <a
            href="#menu-categories"
            className="inline-block px-10 py-4 bg-gray-100 text-yellow-500 font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Explore the Menu
          </a>
        </div>
      </section>
    </div>
  );
}
