import React, { useEffect, useState } from "react";
import { client } from "../utils/client";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function Categ({ category }) {
  const router = useRouter();
  // const { category } = router.query;
  // const [categories, setCategories] = useState([]);

  return (
    <div className=" w-full ">
      <div>
        <Link  href={`/?category=${encodeURIComponent(category.title)}`}>
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
              {category.title}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Categ;
