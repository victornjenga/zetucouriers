import Products from "@/components/Products";
import axios from "axios";
import { BASE_URL } from "../utils";
import Hero from "@/sections/Hero";
import Categories from "../components/Category";
import { client } from "../utils/client";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

const Home = ({ featuredProducts, normalProducts }) => {
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="pt-48 md:pt-32 w-full md:w-[90%] justify-center flex-col items-center">
        <div className="pt-2 md:pt-4 flex overflow-x-scroll py-2 scrollbar-hide mx-4 md:ml-12">
          <Categories />
        </div>
        <div className="w-full my-2 px-4 justify-center items-center flex flex-col">
          <Hero />
        </div>

        {/* Featured Products Slider */}

        {featuredProducts.length > 0 && (
          <>
            {" "}
            <div className=" md:mt-4">
              <h2 className="text-lg md:text-xl py-2 pl-3 font-semibold">
                Featured Products
              </h2>
            </div>
            <div className="flex mb-4 flex-wrap mx-2 w-full">
              {featuredProducts.map((product) => (
                <Products key={product._id} product={product} />
              ))}
            </div>
            {/* <div className="relative pt-4 flex group items-center">
              <MdChevronLeft
                onClick={slideLeft}
                size={40}
                className="bg-white absolute text-black font-bold cursor-pointer z-10  rounded-full hidden group-hover:block opacity-40 hover:opacity-100"
              />
              <div
                id="slider"
                className="flex sites overflow-x-scroll w-full h-full whitespace-nowrap scroll-smooth scrollbar-hide relative"
              >
                {featuredProducts.map((product) => (
                  <Products key={product._id} product={product} />
                ))}
              </div>
              <MdChevronRight
                onClick={slideRight}
                size={40}
                className="bg-white right-0 absolute text-black font-bold cursor-pointer z-10  rounded-full hidden group-hover:block opacity-40 hover:opacity-100"
              />
            </div> */}
          </>
        )}

        {/* All Products Section */}
        <div className="my-3 md:mt-4">
          <h2 className="text-lg md:text-xl py-2 pl-3 font-semibold">
            All Products
          </h2>
        </div>
        {normalProducts.length > 0 ? (
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

    const products = await client.fetch(query);

    // Separate featured and normal products
    const featuredProducts = products.filter((product) => product.featured);
    const normalProducts = products.filter((product) => !product.featured);

    return {
      props: {
        featuredProducts: featuredProducts || [],
        normalProducts: normalProducts || [],
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      props: {
        featuredProducts: [],
        normalProducts: [],
        error: "Failed to fetch products",
      },
    };
  }
};
