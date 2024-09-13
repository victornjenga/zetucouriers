import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { urlFor } from "../utils/client";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import { BASE_URL } from "@/utils";
import { CurrencyContext } from "@/context/CurrencyProvider";

const TruncateParagraph = ({ text }) => {
  const truncatedText = text.split(" ").slice(0, 3).join(" ") + "...";

  return (
    <p className="text-base text-gray-800 dark:text-gray-200">
      {truncatedText}
    </p>
  );
};

function Products({ product }) {
  const {
    description,
    postedBy,
    name,
    slug,
    image,
    price,
    _id,
    likes,
    priceone,
    category,
  } = product;

  const { incQty, decQty, qty, onAdd, totalPrice } = useStateContext();

  const { exchangeRate, selectedCurrency, setSelectedCurrency } =
    useContext(CurrencyContext);

  const convertCurrency = (price) => {
    // Convert the price to the selected currency using the exchange rate from the API
    if (exchangeRate[selectedCurrency]) {
      return (price * exchangeRate[selectedCurrency]).toFixed(0);
    } else {
      return "N/A";
    }
  };

  const router = useRouter();
  return (
    <div className="w-[50%] md:w-[25%] py-1 px-2 md:px-4 ">
      <div className="flex  flex-col relative px-3 py-2  h-full justify-center  rounded-md border border-gray-300 dark:border-gray-900 cursor-pointer hover:bg-gray-100 hover:border-gray-200 bg-white dark:bg-slate-900">
        <Link href={`${BASE_URL}/detail/${slug.current}`}>
          <img
            className="object-contain  h-full w-full bg-gray-900"
            src={urlFor(image && image[0])}
            alt={name}
          />
        </Link>

        <div className="absolute top-4 text-sm md:text-lg  py-1 right-3  flex   text-white justify-center items-center rounded-sm px-3 bg-red-700">
          sale
        </div>
        <div className="mt-2 w-full justify-center items-center flex flex-col h-auto">
          {/* <p className=" text-ellipsis line-clamp-1	px-1 text-sm">{name}</p> */}

          <TruncateParagraph text={name} />
          <div className="justify-centre py-1 items-center flex">
            {/* <div className="line-through  text-sm md:text-lg text-red-600">
            {convertCurrency(priceone)} {selectedCurrency}
            </div> */}
            <div className=" font-semibold text-red-600 text-sm md:text-lg">
              Ksh {price}
            </div>
          </div>
        </div>
        {/* <buttton
          onClick={() => onAdd(site, qty)}
          className="bg-gray-900 py-2 px-3 text-sm md:text-xl text-white font-semibold text-center"
        >
          ADD TO CART
        </buttton> */}
      </div>
    </div>
  );
}

export default Products;
