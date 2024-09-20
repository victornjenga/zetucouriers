import React, { useEffect, useState } from "react";
import Products from "@/components/Products";
import Hero from "@/sections/Hero";
import Categories from "../components/Category";
import { client } from "../utils/client";

const Home = ({
  featuredProducts = [],
  normalProducts = [],
  flashSaleProducts = [],
  flashSaleEndTime, // Receive flashSaleEndTime from server-side props
}) => {
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

  return (
    <>
      <div className="pt-40 md:pt-32 w-full md:w-[90%] justify-center flex-col items-center">
        {/* Categories */}
        <div className="pt-2 md:pt-4 flex overflow-x-scroll py-2 scrollbar-hide mx-4 md:ml-12">
          <Categories />
        </div>

        {/* Hero Section */}
        <div className="w-full my-2 px-4 justify-center items-center flex flex-col">
          <Hero />
        </div>

        {/* Flash Sale Section */}
        {flashSaleProducts?.length > 0 && (
          <div className="my-6">
            <h2 className="text-lg md:text-xl py-2 pl-3 font-semibold">
              FLASH SALE (Ends in{" "}
              <span className="text-orange-600">{`${timeLeft?.days || 0}d ${
                timeLeft?.hours || 0
              }h ${timeLeft?.minutes || 0}m ${timeLeft?.seconds || 0}s`}</span>
              )
            </h2>

            <div className="flex mb-4 flex-wrap mx-2 w-full">
              {flashSaleProducts.map((product) => (
                <Products
                  key={product._id}
                  product={product}
                  discountPercentage={product.discountPercentage}
                />
              ))}
            </div>
          </div>
        )}

        {/* Featured Products Slider */}
        {featuredProducts?.length > 0 && (
          <>
            <div className="md:mt-4">
              <h2 className="text-lg md:text-xl py-2 pl-3 font-semibold">
                Featured Products
              </h2>
            </div>
            <div className="flex mb-4 flex-wrap mx-2 w-full">
              {featuredProducts.map((product) => (
                <Products key={product._id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* All Products Section */}
        <div className="my-3 md:mt-4">
          <h2 className="text-lg md:text-xl py-2 pl-3 font-semibold">
            All Products
          </h2>
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
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    // Fetch all products from Sanity
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

    // Query to fetch flash sale end time from the settings schema
    const flashSaleEndTimeQuery = `*[_type == "settings"][0]{ flashSaleEndTime }`;

    const products = await client.fetch(query);
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
