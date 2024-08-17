import Link from "next/link";
import React from "react";

function Brands() {
  return (
    <div className="my-3 w-full flex justify-center items-center">
      <div className="flex flex-wrap justify-center items-center ">
        <div className="flex items-center justify-center px-2">
          <Link href="/brand/?brand=${Apple}">
            <img
              src="/brands/apple.jpg"
              className="w-[90px] md:w-[150px]"
              alt=""
            />
          </Link>
        </div>

        <div className="flex items-center justify-center px-2">
          <Link href="/brand/?brand=${Huawei}">
            <img
              src="/brands/huawei.jpg"
              className="w-[90px] md:w-[150px]"
              alt=""
            />
          </Link>
        </div>

        <div className="flex items-center justify-center px-2">
          <Link href="/brand/?brand=${microsoft}">
            <img
              src="/brands/microsoft.jpg"
              className="w-[90px] md:w-[150px]"
              alt=""
            />
          </Link>
        </div>

        <div className="flex items-center justify-center px-2">
          <Link href="/brand/?brand=${lenovo}">
            <img
              src="/brands/lenovo.jpg"
              className="w-[90px] md:w-[150px]"
              alt=""
            />
          </Link>
        </div>

        <div className="flex items-center justify-center px-2">
          <Link href="/brand/?brand=${HP}">
            <img
              src="/brands/HP.jpg"
              className="w-[90px] md:w-[150px]"
              alt=""
            />
          </Link>
        </div>

        <div className="flex items-center justify-center px-2">
          <Link href="/brand/?brand=${dell}">
            <img
              src="/brands/dell.jpg"
              className="w-[90px] md:w-[150px]"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Brands;
