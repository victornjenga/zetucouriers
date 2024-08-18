import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "../utils/client";

function Categories() {
  const router = useRouter();
  const { category } = router.query;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"] {
        _id,
        title
      } | order(title desc)`;

      try {
        const data = await client.fetch(query);
        // console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="md:justify-center w-full">
      <div className="justify-start flex space-x-5">
        {categories?.map((item) => (
          <Link
            href={`/?category=${encodeURIComponent(item.title)}`}
            key={item._id}
          >
            <div>
              <span
                className={`font-medium border flex px-3 py-2 ${
                  category === item.title ? "bg-gray-300" : ""
                }`}
              >
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
