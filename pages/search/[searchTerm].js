import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import axios from "axios";

import NoResults from "../../components/NoResults";
import Products from "../../components/Products";
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";

const Search = ({ products }) => {
  const router = useRouter();
  const { searchTerm } = router.query;

  return (
    <div className="w-full  ">
      <div className="flex pt-56   flex-wrap  w-full">
        {products.length ? (
          products.map((product, idx) => (
            <Products product={product} key={idx} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center px-[20%]">
            <NoResults text={`No Results for ${searchTerm}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { searchTerm } }) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { products: res.data },
  };
};

export default Search;
