"use client";

import {
  FcAbout,
  FcHome,
  FcBusinessContact,
  FcBiotech,
  FcQuestions,
} from "react-icons/fc";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "../ThemeSwitch";
import { SiGoogledomains, SiJirasoftware } from "react-icons/si";
import { IoMdLogOut, IoMdPerson } from "react-icons/io";
import { IoDocument } from "react-icons/io5";
import useAuthStore from "../../store/authStore"; // Import your Zustand store
import { useRouter } from "next/navigation";
import { FcPositiveDynamic,FcMultipleInputs } from "react-icons/fc";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState();
  const [isMenu, setisMenu] = useState(false);
  const [open, setOpen] = useState();
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore(); // Zustand store hooks
  // Handle logout
  const handleLogout = () => {
    removeUser(); // Remove user from Zustand store
    console.log("User logged out");
  };
  const toggleClass = () => {
    setisMenu(isMenu === false ? true : false);
    setResponsiveclose(isResponsiveclose === false ? true : false);
  };
  let boxClass = ["main-menu menu-right menuq1"];
  if (isMenu) {
    boxClass.push("menuq2");
  } else {
    boxClass.push("");
  }
  const [isMenuSubMenu, setMenuSubMenu] = useState(false);
  const toggleSubmenu = () => {
    setMenuSubMenu(isMenuSubMenu === false ? true : false);
  };
  let boxClassSubMenu = ["sub__menus"];
  if (isMenuSubMenu) {
    boxClassSubMenu.push("sub__menus__Active");
  } else {
    boxClassSubMenu.push("");
  }
  return (
    <header
      id="top-header"
      className="fixed top-0 left-0 right-0 w-full h-20 z-20 sm:z-50 bg-inherit dark:bg-gray-950  dark:border-b-gray-900  dark:border-b-[1px]"
    >
      <nav className="flex flex-row bg-white dark:bg-inherit dark:text-white shadow-sm shadow-neutral-300 dark:shadow-gray-600  border border-gray-100 dark:border-none border-t-0 border-x-0 text-black  w-full py-0 h-[100%]">
        <div className="flex items-center justify-between w-full px-3">
          {/* toggler start */}
          <div className=" flex flex-row items-center space-x-4">
            <div className="logo">
              <a href="/">
                <Image width={70} height={70} src="/logo.png" alt="/" />
              </a>
            </div>
          </div>
          {/* toggler end */}

          <div className="justify-center space-x-3 items-center flex">
            <div className="md:px-3 items-center flex">
              {/* <Link href="/dashboard">
                <p className="text-xl hover:text-red-600 cursor-pointer font-medium">
                  Account
                </p>
              </Link> */}
              <ThemeSwitch />
            </div>
            <div className="md:hidden flex items-center justify-center ">
              <AiOutlineMenu
                className="cursor-pointer text-2xl md:hidden text-gray-950 dark:text-gray-50"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
      </nav>
      {open && (
        <div className="light: bg-gray-200 dark:bg-gray-800 z-20  md:hidden top-0 h-full px-5 w-[80%] b-0 fixed  duration-300 ">
          <div className="flex py-3 items-center justify-between">
            <div onClick={() => setOpen(false)} className="">
              <a href="/">
                <Image width={60} height={60} src="/logo.png" alt="/" />
              </a>
            </div>
            <AiOutlineClose
              onClick={() => setOpen(false)}
              className="text-3xl cursor-pointer   p-1  font-bold "
            />
          </div>
          <div className="overflow-auto sites h-[90vh]">
            <div className="mx-1 text-lg border-b border-gray-600 border-solid ">
              <p className="py-2">Admin Dashboard</p>
            </div>
            <div className="justify-center items-center block">
              <ul className="block space-y-4 pt-5">
                <li
                  onClick={() => setOpen(false)}
                  className="font-sm hover:text-orange-600 flex text-lg space-x-2 items-center "
                >
                  <FcHome />
                  <Link href="/dashboard">Home</Link>
                </li>

                {/* <li
                  onClick={() => setOpen(false)}
                  className=" font-sm cursor-pointer hover:text-orange-600 flex text-lg space-x-2 items-center"
                >
                  <IoMdPerson />
                  <Link href="/dashboard/users">Users</Link>
                </li> */}

                <li
                  onClick={() => setOpen(false)}
                  className="font-sm  hover:text-orange-600 flex text-lg space-x-2 items-center"
                >
                  <FcPositiveDynamic />
                  <Link href="/dashboard/products">Products</Link>
                </li>
                <li
                  onClick={() => setOpen(false)}
                  className="font-sm  hover:text-orange-600 flex text-lg space-x-2 items-center"
                >
                  <FcMultipleInputs />
                  <Link href="/dashboard/categories">Categories</Link>
                </li>
                <li
                  onClick={() => setOpen(false)}
                  className="font-sm  hover:text-orange-600 flex text-lg space-x-2 items-center"
                >
                  <FcMultipleInputs />
                  <Link href="/dashboard/orders">Orders</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className=" font-sm cursor-pointer hover:text-orange-600 flex text-lg space-x-2 items-center"
                >
                  <IoMdLogOut />

                  <Link href="/dashboard">Logout</Link>
                </li>
                {/* <li
                  onClick={() => setOpen(false)}
                  className=" font-sm cursor-pointer hover:text-orange-600 flex text-lg space-x-2 items-center"
                >
                  <FcQuestions />
                  <Link href="/">Setting</Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
