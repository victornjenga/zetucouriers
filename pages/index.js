import Products from "@/components/Products";
import axios from "axios";
import { BASE_URL } from "../utils";
import Hero from "@/sections/Hero";
import Categories from "../components/Category";
import {client} from "../utils/client"
const Home = ({ products }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="pt-48 md:pt-32 w-full md:w-[90%] justify-center flex-col items-center">
        <div className="pt-2 md:pt-4 flex overflow-x-scroll py-2 scrollbar-hide mx-4">
          <Categories />
        </div>
        <div className="w-full my-2 px-4 justify-center items-center flex flex-col">
          <Hero />
        </div>
        <div className="my-3 md:mt-4">
          <h2 className="text-lg md:text-xl py-2 pl-3 font-semibold">
            FEATURED PRODUCTS
          </h2>
        </div>
        {products.length > 0 ? (
          <div className="flex mb-4 flex-wrap mx-2 w-full">
            {products.slice(0, 4).map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div>No products found in this category.</div>
        )}
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ query: { category } }) => {
  try {
    let products;

    if (category) {
      // Query Sanity for products under the selected category
      const query = `*[_type == "sites" && "${category}" in category[]->title]{
        _id,
        name,
        image,
        category[]->{
          _id,
          title
        },
        description,
        price,
        brand,
        specs
      }`;

      products = await client.fetch(query);
      // console.log("Fetched products for category:", category, products); // Debugging log
    } else {
      // Fetch all products from the API
      const response = await axios.get(`${BASE_URL}/api/products`);
      products = response.data; // Get the data from the response
      console.log("Fetched all products:", products); // Debugging log
    }

    return {
      props: { products: products || [] }, // Ensure products is always an array
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      props: { products: [], error: "Failed to fetch products" }, // Add error prop
    };
  }
};
