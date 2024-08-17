import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";
import { MdLiveHelp } from "react-icons/md";
import { useStateContext } from "../context/StateContext";
import { BsSearch, BsFillPersonFill, BsHeart } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import ThemeSwitch from "./ThemeSwitch";
import { TiSocialInstagram } from "react-icons/ti";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";

function Navbar() {
  const [openMenu, setOpenMenu] = useState();
  const [isMenu, setisMenu] = useState(false);
  const [open, setOpen] = useState();
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [searchValue, setSearchValue] = useState("");
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
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 100;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="fixed  w-full z-20">
      {isVisible && (
        <div className="hidden md:flex  justify-around items-center px-3  bg-gray-50 dark:bg-gray-950 ">
          <div className="flex flex-row md:mt-0 mt-6">
            <ul className="flex gap-5 flex-wrap">
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                <div className="cursor-pointer w-10 h-10 justify-center items-center flex  r ">
                  <FaFacebookF className="" />
                </div>
              </a>{" "}
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <div className="cursor-pointer w-10 h-10 justify-center items-center flex  r ">
                  <FaTwitter lassName="text-2xl" />
                </div>
              </a>{" "}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="cursor-pointer w-10 h-10 justify-center items-center flex  r ">
                  <FaInstagram lassName="text-2xl" />
                </div>
              </a>
            </ul>
          </div>
          <div className="items-center flex space-x-4">
            <p>
              <Link href="/">Home</Link>
            </p>
            <p>
              {" "}
              <Link href="/about">About</Link>
            </p>
            <p>
              <Link href="/contact">contact</Link>
            </p>
            <p>
              <Link href="/web.docx">Cataloque</Link>
            </p>
          </div>
          <div className=" flex justify-center items-center space-x-3">
            <div>
              <IoCall className="text-3xl text-customBlue" />
            </div>
            <div>
              <p>Call To +254705079016</p>
              <p>Email : civrotstore@gmail.com</p>
            </div>
          </div>
        </div>
      )}
      <div className="hidden md:flex  justify-around items-center py-2 bg-gray-50 dark:bg-gray-950">
        <div>
          <Link href="/">
            {/* <p className="text-3xl cursor-pointer font-extrabold italic">
              Sherehe Mall
            </p> */}
            <img className="h-[60px]" src="/logo.png" alt="/" />
          </Link>
        </div>
        <div className="flex">
          <form
            onSubmit={handleSearch}
            className="flex space-x-3 h-[32px] items-center border  border-gray-400 rounded-3xl px-4 py-2 justify-center"
          >
            <BsSearch
              onClick={handleSearch}
              className="text-customBlue text-2xl"
            />
            {/* <p className="">Search For Events</p> */}
            <input
              placeholder="Search For Events"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              className="outline-none bg-gray-100 dark:bg-gray-950"
            />
          </form>
        </div>
        <div className="flex space-x-3 items-center justify-center">
          {/* <div className="flex space-x-2 items-center">
            <BsFillPersonFill className="text-2xl text-blue-400 font-bold " />
            <p>Account</p>
          </div> */}

          <div className="flex space-x-2 items-center">
            <MdLiveHelp className="text-2xl text-blue-400 font-bold " />
            <Link href="/about">
              <p>About</p>
            </Link>
          </div>
          <ThemeSwitch />

          {/* <div className="flex space-x-1 bg-blue-400 justify-center rounded-lg px-2 items-center">
            <Link href="/account/add">
              <IoMdAdd className="text-2xl bg-blue-500 px-1 py-1 rounded-full text-gray-100 font-bold " />{" "}
            </Link>
            <Link href="/account/add">
              <button className=" text-gray-200 py-2   ">Post Service</button>
            </Link>
          </div> */}
          <div className="  rounded-3xl relative pl-4 pr-3 py-2 flex justify-center items-center space-x-3">
            <PiShoppingCartSimpleFill
              onClick={() => router.push("/cart")}
              className="cursor-pointer relative text-2xl"
            />
            <span className="absolute top-0 right-0 flex text-xs w-5 h-5 font-semibold text-white justify-center items-center rounded-full bg-red-700">
              {totalQuantities}
            </span>
          </div>
        </div>
      </div>
      <div className="block md:hidden  ">
        {isVisible && (
          <div id="hide">
            <div className="py-1 bg-gray-50 dark:bg-gray-950 px-3 flex justify-between items-center">
              <Link href="/">
                <img className="h-[50px]" src="/logo1.png" alt="/" />
              </Link>
              <div className="flex space-x-3 py-3">
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className=" cursor-pointer  justify-center items-center flex   ">
                    <FaFacebookF className=" text-lg " />
                  </div>
                </a>{" "}
                <a
                  href="https://twitter.com/civrotweb"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className=" cursor-pointer  justify-center items-center flex   ">
                    <FaTwitter className=" text-lg " />
                  </div>
                </a>{" "}
                <a
                  href="https://www.instagram.com/civrot_web_services/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className=" cursor-pointer  justify-center items-center flex   ">
                    <FaInstagram className=" text-lg " />
                  </div>
                </a>
              </div>
            </div>
            <div className="flex bg-gray-50 dark:bg-gray-950 justify-center items-center w-full  py-2 ">
              <form
                onSubmit={handleSearch}
                className="flex   h-[40px] items-center rounded-md  "
              >
                <input
                  placeholder="Search For Products"
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  className=" py-2 bg-slate-100 dark:bg-gray-900 px-2 w-[90%] outline-none "
                />
                <div
                  onClick={handleSearch}
                  className="bg-red-600 cursor-pointer px-3 space-x-3 h-full flex items-center justify-center text-white"
                >
                  <BsSearch
                    onClick={handleSearch}
                    className=" cursor-pointer"
                  />
                  <p className=" text-lg">Search</p>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex bg-gray-50 dark:bg-gray-950 justify-between px-3  lg:px-5 items-center ">
          <div>
            {/* <GiHamburgerMenu className=" text-2xl" /> */}
            {open ? (
              <AiOutlineClose
                onClick={() => setOpen(false)}
                className="cursor-pointer text-2xl md:hidden"
              />
            ) : (
              <div className="space-x-2 flex items-center">
                <AiOutlineMenu
                  className="cursor-pointer text-2xl md:hidden"
                  onClick={() => setOpen(true)}
                />
                <p className="font-bold">MENU</p>
              </div>
            )}
          </div>
          {/*
          <div className="  rounded-3xl relative pl-8 pr-3 py-2 flex justify-center items-center space-x-3">
            <Link href="/cart">
              <PiShoppingCartSimpleFill className="cursor-pointer relative text-2xl" />
            </Link>
            <span className="absolute top-0 right-0 flex text-xs w-5 h-5 font-semibold rounded-full text-gray-50  justify-center items-center r bg-blue-400">
              0
            </span>
          </div>
            */}
          <div className="flex  space-x-1  justify-center  px-2 items-center">
            <ThemeSwitch />
            <div className="  rounded-3xl relative pl-4 pr-3 py-2 flex justify-center items-center space-x-3">
              <PiShoppingCartSimpleFill
                onClick={() => router.push("/cart")}
                className="cursor-pointer relative text-2xl"
              />
              <span className="absolute top-0 right-0 flex text-xs w-5 h-5 font-semibold text-white justify-center items-center rounded-full bg-red-700">
                {totalQuantities}
              </span>
            </div>
          </div>
        </div>
        {open && (
          <div className="bg-gray-50 dark:bg-gray-950 space-y-2 z-20 text-left flex flex-col justify-center  py-2 ">
            <ul
              className={`  shadow-md   rounded-xl left-0 w-full  transition-all duration-500 ease-in `}
            >
              <li
                className=" flex border-b  pl-4 py-2 w-full border-gray-200  font-semibold space-x-3 items-center  "
                onClick={() => setOpen(false)}
              >
                <Link href="/">Home</Link>
              </li>
              <li
                className=" flex border-b  pl-4 py-2 w-full border-gray-200  space-x-3 font-semibold items-center  "
                onClick={() => setOpen(false)}
              >
                <Link href="/contact">Contact</Link>
              </li>
              {/* <li
                className=" flex border-b  pl-4 py-2 w-full border-gray-200  space-x-3 font-semibold items-center  "
                onClick={() => setOpen(false)}
              >
                <Link href="/about">About</Link>
              </li> */}
              <li
                className=" flex   pl-4 py-2  space-x-3 font-semibold items-center  "
                onClick={() => setOpen(false)}
              >
                <Link href="/web.docx">Catalogue</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
