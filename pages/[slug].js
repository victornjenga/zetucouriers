// Import necessary hooks and context
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { urlFor, client } from "../utils/client";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useStateContext } from "../context/StateContext";
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
import { CurrencyContext } from "../context/CurrencyProvider";
import Head from "next/head"; // Import Head for meta tags
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate unique keys
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode"; // Import the jwt-decode library
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/pagination";

function ProductDetails({ productDetails, products }) {
  const [product, setProduct] = useState(productDetails);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL
  const { decQty, incQty, qty, onAdd, setSize } = useStateContext();
  const { userProfile, addUser } = useAuthStore(); // Zustand store hooks
  const [selectedOption, setSelectedOption] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState(""); // Capture review input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the review submission

  // console.log(productDetails);

  // Fetch product details when the route (slug) changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (slug) {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/products/${slug}`);
          setProduct(data);
        } catch (error) {
          console.error("Failed to fetch product:", error);
          toast.error("Failed to load product details.");
        }
      }
    };

    fetchProductDetails();
  }, [slug, product.reviews]); // Add reviews as a dependency to trigger re-fetching

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

  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const submitReview = async () => {
    if (!userProfile) {
      setIsModalOpen(true);
      return;
    }

    setLoading(true);

    const review = {
      _key: uuidv4(),
      rating,
      comment: reviewText,
      user: { _type: "reference", _ref: userProfile._id },
    };

    try {
      const updatedProduct = await client
        .patch(product._id)
        .setIfMissing({ reviews: [] })
        .insert("after", "reviews[-1]", [review])
        .commit();

      console.log("Updated product with reviews:", updatedProduct); // Debug log
      setProduct(updatedProduct);
      setRating(0);
      setReviewText("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  // Google login success handler

  const handleLoginSuccess = (response) => {
    try {
      const decoded = jwt_decode(response.credential);
      addUser(decoded);
      saveUserToSanity(decoded);
      toast.success("Logged in successfully with Google!");
    } catch (error) {
      console.error("Error decoding JWT:", error);
      toast.error("Failed to decode Google login response.");
    }
  };

  // Save Google user to Sanity
  const saveUserToSanity = async (userData) => {
    try {
      const response = await axios.post("/api/login", {
        ...userData,
        type: "google",
      });
      console.log("User saved to Sanity:", response.data);
      toast.success("Google account linked successfully!");
    } catch (error) {
      console.error("Error saving user to Sanity:", error);
      toast.error("Failed to save user to database.");
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  // Image URL for sharing (Open Graph and Twitter)
  const imageUrl = urlFor(product.image && product.image[index]).url();

  // Calculate discounted price outside the JSX
  const discountedPrice = product.discountPercentage
    ? Math.round(
        product.price - (product.price * product.discountPercentage) / 100
      )
    : null;

  const handleClick = () => {
    const phoneNumber = "+254705079016";
    const message = `Hello Civrot. Tell me more about this Product .`;
    const currentUrl = window.location.href;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message + currentUrl
    )}`;
    window.open(url, "_blank");
  };

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
          content={`https://store.civrot.com/detail/${product.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        <div className="w-full md:w-[90%] pt-28 mb-8">
          {/* Google Login Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 mx-3 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Sign in with Google to submit your review
                </h2>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                  />
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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
                  {product.image && product.image.length > 0 ? (
                    <Swiper
                      autoplay={{ delay: 2000 }}
                      loop={true} // Add this
                      modules={[Autoplay, Pagination, A11y]}
                      spaceBetween={0}
                      slidesPerView={1}
                      pagination={{ clickable: true }} // Enables clickable dots
                      scrollbar={{ draggable: true }}
                    >
                      {product.image.map((img, i) => (
                        <SwiperSlide key={i}>
                          <img
                            className="w-full"
                            src={urlFor(img).url()}
                            alt={`Product Image ${i + 1}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <img
                      className="w-full"
                      src={urlFor(product.image && product.image[index]).url()}
                      alt={product.name}
                    />
                  )}
                </div>

                <div className="flex flex-col mt-3 mx-1 w-full shadow-sm shadow-gray-300 dark:shadow-gray-900 px-3 py-3 md:w-1/2">
                  <h3 className="hidden md:flex py-3  text-4xl">
                    {product.name}
                  </h3>

                  <div className=" justify-start flex flex-col w-full md:p-4">
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 ">
                      {product.discountPercentage ? (
                        <div className="flex gap-3 items-center">
                          <p className="py-2 text-red-600 text-lg md:text-xl font-medium line-through">
                            Ksh {product.price}
                          </p>
                          <p className="py-2 text-green-600 text-lg md:text-xl font-medium">
                            Ksh {discountedPrice}
                          </p>
                          <p className="text-green-600 text-lg md:text-xl font-medium">
                            {product.discountPercentage}% off
                          </p>
                        </div>
                      ) : (
                        <p className="py-2 text-red-600 text-3xl font-medium">
                          Ksh {product.price}
                        </p>
                      )}
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
                            } px-1 py-1 cursor-pointer text-xl font-bold text-white hover:bg-red-600`}
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
                    <div className="w-full gap-3 pt-4 space-y-2">
                      <button
                        onClick={handleClick}
                        className=" bg-green-500  flex items-center gap-3 px-4 py-3 text-lg rounded-md text-white"
                      >
                        <FaWhatsapp className="text-2xl" />
                        Buy Via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 pl-2 md:pl-8 py-3">
              <div className="flex my-2 px-4 space-y-3  justify-start flex-col py-3 dark:bg-gray-900  shadow-sm shadow-gray-300 dark:shadow-gray-900  mb-4">
                <div className="">
                  <h2 className="text-xl py-2 pl-3 font-semibold">
                    Description
                  </h2>
                </div>
                <p className="sm:text-lg" id="p-wrap">
                  {product.description}
                </p>
              </div>
              <div className="flex my-2 px-4 space-y-3  justify-start flex-col py-3 dark:bg-gray-900  shadow-sm shadow-gray-300 dark:shadow-gray-900  mb-4">
                <div className="w-full justify-center  py-4">
                  <p className="font-bold text-lg">Share this product:</p>
                  <div className="flex space-x-4 mt-2">
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        `https://store.civrot.com/detail/${product.slug.current}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shadow-lg cursor-pointer w-10 h-10 justify-center items-center flex shadow-gray-400 rounded-full "
                    >
                      <FaFacebookF className="text-2xl" />
                    </a>

                    {/* Twitter */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        `https://store.civrot.com/detail/${product.slug.current}`
                      )}&text=Check%20out%20this%20awesome%20product!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shadow-lg cursor-pointer w-10 h-10 justify-center items-center flex shadow-gray-400 rounded-full "
                    >
                      <FaTwitter className="text-2xl" />
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=Check%20out%20this%20awesome%20product!%20${encodeURIComponent(
                        `https://store.civrot.com/detail/${product.slug.current}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shadow-lg cursor-pointer w-10 h-10 justify-center items-center flex shadow-gray-400 rounded-full "
                    >
                      <FaWhatsapp className="text-2xl" />
                    </a>
                  </div>
                </div>{" "}
                <div className="space-y-2 flex flex-col ">
                  <p className=" text-2xl  mr-4">Your Rating:</p>
                  <div className="flex text-2xl mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer ${
                          star <= (hoverRating || rating)
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRatingClick(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p>
                    {rating > 0
                      ? `You rated this product ${rating} star(s)`
                      : "Please rate this product"}
                  </p>

                  <textarea
                    name="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Leave a review..."
                    className="bg-gray-100   dark:bg-gray-800 dark:text-gray-100 border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-pink-500 font-light text-gray-500"
                  />

                  <button
                    onClick={submitReview}
                    className="px-3 py-2 rounded-xl bg-slate-700 text-white"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
                {/* Display the reviews */}
                <div className="reviews-section">
                  <h3 className="text-xl py-2 pl-3 font-semibold">
                    Customer Reviews
                  </h3>
                  {product.reviews?.length > 0 ? (
                    product.reviews.map((review, index) => (
                      <div key={index} className="space-y-3">
                        <p className="text-lg font-semibold">
                          Rating: {review.rating}{" "}
                          <span className="text-yellow-500">★</span>{" "}
                        </p>
                        <p className="text-sm text-gray-500">
                          Reviewed by: {review.userName}
                        </p>{" "}
                        {/* Display reviewer's name */}
                        <p>{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
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
      </GoogleOAuthProvider>
    </>
  );
}

export default ProductDetails;

export const getServerSideProps = async ({ params: { slug } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/products/${slug}`);
  let response = await axios.get(`${BASE_URL}/api/products`);

  return {
    props: {
      productDetails: {
        ...data,
        reviews: data.reviews || [], // Ensure reviews are included if they exist
      },
      products: response.data,
    },
  };
};
