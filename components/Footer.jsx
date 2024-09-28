import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-50 mb-0 dark:bg-gray-950 flex flex-col justify-center w-full items-center  py-6">
      <div className=" flex flex-col w-[80%] justify-center md:grid grid-cols-4">
        <div className=" px-3 my-3">
          <Link href="/">
            <img className="h-[80px]" src="/logo.png" alt="/" />
          </Link>
          <p>All in one place for all your household needs</p>
        </div>
        <div className="flex flex-col  my-3">
          <p className="text-xl font-bold">Customer Services</p>
          <p>
            <Link href="/account">Account</Link>{" "}
          </p>
          <p className="">Privacy Policy</p>
          <p>
            <Link href="/contact">Contact</Link>{" "}
          </p>
          <p>About Us</p>
        </div>
        <div className="flex flex-col  my-3">
          <p className="text-xl font-bold">Top Restaurants</p>
          <p className="">Serena </p>
          <p>Kilimajaro</p>
          <p>Himalaya</p>
          <p>Udupi</p>
          <p>Chettinad</p>
          <p>Malpe</p>
          
        </div>
        <div className="flex flex-col  my-3">
          <p className="text-xl font-bold">Call Us Here</p>
          <p className="">
            <span className="text-lg font-bold">Sales:</span> 0712345678
          </p>
          <p className="">
            <span className="text-lg font-bold">Email:</span> menuyetu@gmail.com
          </p>
          <p className="">
            <span className="text-lg font-bold">Location: </span>Nairobi,
            Kenya
          </p>
        </div>
      </div>

      <p className="py-4 px-3 text-center mx-10  flex justify-center">
        Copyright © {new Date().getFullYear()} MenuYetu, All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
