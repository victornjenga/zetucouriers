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

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  //   useEffect(() => {
  //     if (!userProfile) router.push('/')
  //   }, [userProfile, router])

  return (
    <div className="flex justify-center pb-10 pt-56 items-center w-full">
      {user ? (
        <div className="py block justify-center items-center">
          <p className="font-medium text-lg">Logged In</p>
          <Link href={`/profile/${userProfile?._id}`}>
            {" "}
            <p className="px-2 py-1 hover:bg-red-600  font-medium text-white my-2 bg-black">
              View Profile
            </p>
          </Link>
        </div>
      ) : (
        <div className="w-full  flex flex-col justify-center items-center  mb-8">
          <p className="py-3 text-lg font-semibold hover:text-red-500">
            Login{" "}
          </p>
          <div>
            <form className="flex flex-col p-6  space-y-5">
              {" "}
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className=" bg-slate-200 left-0 text-black  py-1 px-2 outline-none  rounded-sm"
              />{" "}
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className=" bg-slate-200 left-0 text-black  py-1 px-2 outline-none  rounded-sm"
              />{" "}
              <Link href="/acc">
                <button
                  disabled={email && password ? false : true}
                  // onClick={router.push("/acc")}
                  className="bg-black disabled:bg-gray-400 w-full flex justify-center text-white px-2 py-1 "
                >
                  Login
                </button>
              </Link>
            </form>
            <p>
              Don't have an account{" "}
              <span className="font-bold">
                <Link href="/register">Register</Link>
              </span>
            </p>
          </div>
          {/* <div>
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log('Login Failed')}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Upload;
