import React, { useEffect, useRef, useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { useRouter } from "next/router";

import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import Image from "next/image";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import Link from "next/link";

function Upload() {
  const userProfile = useAuthStore((state) => state.userProfile);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addUser, removeUser } = useAuthStore();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [imagesAssets, setImagesAssets] = useState(null);
  const [wrongTypeofImage, setWrongTypeofImage] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  //   useEffect(() => {
  //     if (!userProfile) router.push('/')
  //   }, [userProfile, router])

  return (
    <div className="flex justify-center pb-10 pt-56 items-center w-full">
      <div className="py  flex flex-col justify-center items-center">
        <p className=" text-lg">You Don't have any Products in The Wish List</p>
        {/* <Link href={`/profile/${userProfile?._id}`}>
            {' '}
            <p className="px-2 py-1 hover:bg-red-600  font-medium text-white my-2 bg-black">
              View Profile
            </p>
          </Link> */}
        <Link href="/">
          <button
            type="button"
            className="bg-black text-white px-3 py-2  text-xl font-bold hover:scale-105 duration-300 mt-10"
          >
            Continue Shoppping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Upload;
