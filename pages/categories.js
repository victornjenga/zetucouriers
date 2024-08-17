import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import { client } from "@/utils/client";
import { useRouter } from "next/router";
import NoResults from "@/components/NoResults";

function Categorie() {
  const router = useRouter();
  const { category } = router.query;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"] {
        _id,
        title
      } | order(title asc)`;

      try {
        const data = await client.fetch(query);
        console.log("Fetched categories:", data); // Log the fetched categories
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="w-full pt-56 pb-6  justify-center items-center ">
      <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 px-2 gap-3 justify-center items-center ">
        {categories.length ? (
          categories?.map((category) => (
            <Categories key={category._id} category={category} />
          ))
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
}

export default Categorie;
