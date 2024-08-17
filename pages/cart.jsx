import Link from "next/link";
import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../utils/client";
import { CurrencyContext } from "../context/CurrencyProvider";
import { useContext } from "react";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  console.log(totalPrice);

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

  return (
    <div className="pt-56 w-full justify-center items-center" ref={cartRef}>
      <div className="flex flex-col items-center  justify-center">
        <button className="flex pt-4 text-center text-xl items-center font-bold">
          <span className="">Your Cart:</span>
          <span className="">{totalQuantities} items</span>
        </button>
        {cartItems.length < 1 ? (
          <div className=" justify-center pb-10  items-center flex flex-col">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping Cart is Empty</h3>
            <Link href="/">
              <button
                type="button"
                className="bg-slate-800 text-white px-3 py-2  text-xl font-bold hover:scale-105 duration-300 mt-10"
              >
                Continue Shoppping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex space-y-1   flex-col items-center justify-center">
            {cartItems.map((item) => (
              <div
                className="block px-3 bg-gray-100 dark:bg-gray-800 py-2 mt-4 space-x-2 md:w-[70%] items-center justify-center"
                key={item._id}
              >
                <div className="grid   grid-cols-3 space-x-2  pt-4 items-center justify-center">
                  <div>
                    <img
                      src={urlFor(item?.image[0])}
                      className="rounded-sm ] w-[100px] h-[100px] scale-105 duration-300"
                    />
                  </div>
                  <div className="pt-4 ">
                    <h5 className="font-medium  text-xs md:text-sm">
                      {item?.name}
                    </h5>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg md:text-xl">
                      Ksh {item?.price}
                    </h4>
                  </div>
                </div>
                <div className="grid   grid-cols-3 pt-2 space-x-2 items-center justify-center">
                  <p className="text-lg md:text-xl">Quantity</p>
                  <p className="flex space-x-3 justify-center   ">
                    {/* <span
                        onClick={() => toggleCartItemQuanitity(item._id, "dec")}
                        className="bg-black hover:bg-red-600 p-3 cursor-pointer  text-xl font-bold"
                      >
                        <AiOutlineMinus className='text-white'  />
                      </span> */}
                    <span className="text-lg md:text-xl font-semibold">
                      {item.quantity} Items
                    </span>
                    {/* <span
                        onClick={() => toggleCartItemQuanitity(item._id, "inc")}
                        className="bg-black hover:bg-red-600 p-3 cursor-pointer  text-xl font-bold"
                      >
                        <AiOutlinePlus className='text-white' />
                      </span> */}
                  </p>
                  <button
                    type="button"
                    className="text-3xl ml-10 text-red-600"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartItems.length >= 1 && (
        <div className="pt-4 pb-10 bottom-4 w-full  justify-center items-center flex- flex-col">
          <div className="flex text-2xl font-bold justify-around">
            <h3>Subtotal:</h3>
            <h3>Ksh {totalPrice}</h3>
          </div>
          <div className="flex pt-3 items-center justify-center">
            <Link href="/checkout">
              <button
                type="button"
                className="bg-slate-800 rounded-sm text-white px-2  py-2  text-xl  hover:scale-105 duration-300 "
                onClick=""
              >
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
