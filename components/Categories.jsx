import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { categories } from "../utils/categories";
import Image from "next/image";

function Categories({ category }) {
  // const router = useRouter()
  // const { category } = router.query

  return (
    <div className=" w-full ">
      <div>
        <Link href={`/category/?category=${category.tag}`}>
          <div className="justify-center flex bg-gray-200 hover:bg-red-600 py-2  flex-col items-center">
            {/* <Image
                width={300}
                height={200}
                className="py-2 px-2 "
                src={category.image}
                alt="/"
              /> */}

            <span
              className={`font-semibold left-0 px-2 text-xs text-black hover:text-white `}
            >
              {category.name}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Categories;
