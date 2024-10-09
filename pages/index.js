import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { client } from "../utils/client";
import Products from "@/components/Products";
import Categories from "@/components/Category";

export default function Home({
  featuredProducts = [],
  normalProducts = [],
  flashSaleProducts = [],
  flashSaleEndTime, // Receive flashSaleEndTime from server-side props
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({}); // Initially empty
  const [hasMounted, setHasMounted] = useState(false); // Track if component has mounted

  // Countdown Timer for Flash Sale
  const calculateTimeLeft = () => {
    const flashSaleEnd = new Date(flashSaleEndTime); // Use dynamic flash sale end time
    const now = new Date();
    const difference = flashSaleEnd - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // Only calculate the time left after the component has mounted on the client-side
  useEffect(() => {
    setHasMounted(true); // Set to true after the component has mounted

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [flashSaleEndTime]);

  // If the component hasn't mounted yet, don't render the timer to avoid SSR/client mismatch
  if (!hasMounted) {
    return null; // or you can return a loader, or a placeholder countdown
  }
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

      <div className="pt-2 md:pt-4 flex overflow-x-scroll py-2 scrollbar-hide mx-4 md:ml-12">
          <Categories />
        </div>
        {/* All Products Section */}
        <div className="my-3 md:mt-4">
          <h1 className="text-lg md:text-xl py-2 pl-3 font-semibold">
            All Products
          </h1>
        </div>
        {normalProducts?.length > 0 ? (
          <div className="flex mb-4 flex-wrap mx-2 w-full">
            {normalProducts.map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="px-4">
            <p className="text-lg">No products found.</p>
          </div>
        )}
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
      <section id="special-offers" className="py-16 ">
        <div className="container mx-auto">
          <h2 className="text-4xl text-gray-800 font-bold text-center mb-12">
            Exclusive Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className=" p-6 rounded-lg shadow-lg">
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
export const getServerSideProps = async ({ query: { category } }) => {
  try {
    let products;

    // Check if a category is provided in the query
    if (category) {
      // Fetch products for the specific category from Sanity
      const query = `*[_type == "products" && "${category}" in category[]->title]{
        _id,
        name,
        image,
        featured,
        flashSale,
        discountPercentage,
        category[]->{
          _id,
          title
        },
        slug,
        description,
        price,
        brand,
        specs
      }`;

      products = await client.fetch(query);
    } else {
      // Fetch all products if no category is provided
      const query = `*[_type == "products"]{
        _id,
        name,
        image,
        featured,
        flashSale,
        discountPercentage,
        category[]->{
          _id,
          title
        },
        slug,
        description,
        price,
        brand,
        specs
      }`;

      products = await client.fetch(query);
    }

    // Query to fetch flash sale end time from the settings schema
    const flashSaleEndTimeQuery = `*[_type == "settings"][0]{ flashSaleEndTime }`;
    const settings = await client.fetch(flashSaleEndTimeQuery);
    const flashSaleEndTime = settings?.flashSaleEndTime || null;

    // Separate featured, normal, and flash sale products
    const featuredProducts = products.filter((product) => product.featured);
    const normalProducts = products.filter(
      (product) => !product.featured && !product.flashSale
    );
    const flashSaleProducts = products.filter((product) => product.flashSale);

    return {
      props: {
        featuredProducts: featuredProducts || [],
        normalProducts: normalProducts || [],
        flashSaleProducts: flashSaleProducts || [],
        flashSaleEndTime, // Pass the flash sale end time to the component
      },
    };
  } catch (error) {
    console.error("Error fetching products or settings:", error);

    return {
      props: {
        featuredProducts: [],
        normalProducts: [],
        flashSaleProducts: [],
        flashSaleEndTime: null,
        error: "Failed to fetch products or settings",
      },
    };
  }
};
