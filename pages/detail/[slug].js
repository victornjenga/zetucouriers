// Import necessary hooks and context
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { urlFor, client } from "../../utils/client";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { useStateContext } from "../../context/StateContext";
import { TbMessageCircle2Filled, TbTruckDelivery } from "react-icons/tb";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Link from "next/link";
import Products from "@/components/Products";
import useAuthStore from "@/store/authStore";
import LikeButton from "@/components/LikeButton";
import { CurrencyContext } from "../../context/CurrencyProvider";
import Head from "next/head"; // Import Head for meta tags
import { IoCheckmarkCircleOutline } from "react-icons/io5";

function ProductDetails({ productDetails, products }) {
  const [product, setProduct] = useState(productDetails);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { decQty, incQty, qty, onAdd, setSize } = useStateContext();
  const { userProfile } = useAuthStore();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    setSize(option); // Set the size in StateContext
  };

  const { exchangeRate, selectedCurrency, setSelectedCurrency } =
    useContext(CurrencyContext);

  const handleAddToCart = () => {
    if (product.variations?.length > 0 && !selectedOption) {
      alert("Please select a size variation first.");
      return;
    }
    onAdd(product, qty);
  };

  const handleBuyNow = () => {
    if (product.variations?.length > 0 && !selectedOption) {
      alert("Please select a size variation first.");
      return;
    }
    onAdd(product, qty);
    router.push("/checkout");
  };

  // Image URL for sharing (Open Graph and Twitter)
  const imageUrl = urlFor(product.image && product.image[index]).url();

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={imageUrl} />
        <meta
          property="og:url"
          content={`https://yourdomain.com/products/${product.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <div className="w-full md:w-[90%] pt-32 mb-8">
        <style>
          {`#p-wrap {
            white-space: pre-line;
          }`}
        </style>
        <div className="w-full p-2 md:p-8 h-full justify-center pt-16 rounded">
          <h3 className="font-medium md:hidden text-xl">{product.name}</h3>
          <div className="flex flex-col md:px-8 w-full justify-center items-center pb-8 xl:flex-row">
            <div className="block space-x-3 md:flex w-full ">
              <div className="block md:w-1/2">
                <img className="w-full" src={imageUrl} alt={product.name} />
              </div>

              <div className="flex flex-col md:w-1/2">
                <h3 className="hidden md:flex py-3 text-center text-4xl">
                  {product.name}
                </h3>

                <div className=" justify-start  flex flex-col w-full  md:p-4">
                  <div className="bg-gray-100 px-3 py-1 my-2">
                    <p className="py-2 text-red-600 text-3xl font-medium">
                      Ksh {product.price}
                    </p>
                  </div>
                  <div className="flex my-3 items-center gap-8">
                    <p>Services:</p>
                    <div className="flex items-center gap-2">
                      <IoCheckmarkCircleOutline className="text-red-600 text-xl" />
                      <p> Fulfilled By Civrot</p>
                    </div>
                  </div>
                  <div className="flex my-3 items-center gap-4">
                    <p>Delivery Info:</p>
                    <div className="flex items-center gap-2">
                      <TbTruckDelivery className="text-green-600 text-xl" />
                      <p>Arrives within 1-3 workdays.</p>
                    </div>
                  </div>
                  {product.variations && product.variations.length > 0 && (
                    <div className="flex items-center gap-2 my-4 mt-2">
                      <h2>Variations:</h2>
                      {product.variations.map((item) => (
                        <button
                          className={`${
                            selectedOption === item
                              ? "bg-red-600"
                              : "bg-slate-800"
                          } px-2 py-1 cursor-pointer text-xl font-bold text-white hover:bg-red-600`}
                          key={item._id}
                          onClick={() => handleButtonClick(item)}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className=" my-3 gap-8 flex">
                    <h3>Quantity:</h3>
                    <p className="flex space-x-3 items-center">
                      <span
                        onClick={decQty}
                        className="bg-slate-800 px-2 py-1 cursor-pointer text-xl font-bold"
                      >
                        <AiOutlineMinus className="text-white" />
                      </span>
                      <span className="text-2xl font-semibold">{qty}</span>
                      <span
                        onClick={incQty}
                        className="bg-slate-800 px-2 py-1 cursor-pointer text-xl font-bold"
                      >
                        <AiOutlinePlus className="text-white" />
                      </span>
                    </p>
                  </div>

                  <div className="hidden md:flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="px-3 py-2 bg-red-500 border cursor-pointer text-white font-semibold hover:scale-105 duration-300"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      type="button"
                      className="px-5 py-2 bg-slate-700 border cursor-pointer text-white font-semibold hover:scale-105 duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 pl-2 md:pl-8 py-3">
            <div>
              <div className="">
                <h2 className="text-xl py-2 pl-3 font-semibold">Description</h2>
              </div>
              <p className="sm:text-lg" id="p-wrap">
                {product.description}
              </p>
            </div>
            <div className="flex flex-col md:items-center">
              <div className="">
                <h2 className="text-xl py-2 pl-3 font-semibold">Features</h2>
              </div>
              <p className="sm:text-lg font-medium" id="p-wrap">
                {product.specs}
              </p>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="">
            <h2 className="text-xl py-2 pl-3 font-semibold">
              Related Products
            </h2>
          </div>
          <div className="marquee">
            <div className="flex flex-wrap w-full">
              {products.map((product) => (
                <Products key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex fixed bottom-0 w-full md:hidden">
          <button
            type="button"
            onClick={handleAddToCart}
            className="px-3 py-2 bg-slate-700 cursor-pointer text-white font-semibold w-[50%]"
          >
            ADD TO CART
          </button>
          <button
            onClick={handleBuyNow}
            type="button"
            className="px-3 py-2 bg-yellow-700 cursor-pointer text-white font-semibold w-[50%]"
          >
            <Link href="/checkout"> BUY NOW </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

export const getServerSideProps = async ({ params: { slug } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/products/${slug}`);
  let response = await axios.get(`${BASE_URL}/api/products`);
  return {
    props: { productDetails: data, products: response.data },
  };
};
