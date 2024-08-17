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
  const [name, setName] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (name.length <= 0) {
      tempErrors["name"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }

    if (phone.length <= 0) {
      tempErrors["phone"] = true;
      isValid = false;
    }
    if (address.length <= 0) {
      tempErrors["address"] = true;
      isValid = false;
    }
    if (country.length <= 0) {
      tempErrors["Country"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      const res = await fetch("/api/register", {
        body: JSON.stringify({
          email: email,
          name: name,
          phone: phone,
          address: address,
          country: country,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
      }
    }
    router.push("/acc");
  };

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
            Register{" "}
          </p>
          <div>
            <form className="block space-y-4">
              {" "}
              <div className="flex items-center  space-x-4">
                <h2 className="text-xl font-medium w-[40%] ">Name :</h2>
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className=" border left-0 text-black  py-1 px-2 outline-none  rounded-sm"
                />
              </div>
              <div className="flex items-center  space-x-4">
                <h2 className="text-xl font-medium w-[40%] ">Email :</h2>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className=" border left-0 text-black  py-1 px-2 outline-none  rounded-sm"
                />
              </div>
              <div className="flex items-center  space-x-4">
                <h2 className="text-xl font-medium w-[40%] ">Phone :</h2>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className=" border left-0 text-black  py-1 px-2 outline-none  rounded-sm"
                />
              </div>
              <div className="flex items-center  space-x-4">
                <h2 className="text-xl font-medium w-[40%] ">Country :</h2>
                <input
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className=" border left-0 text-black  py-1 px-2 outline-none  rounded-sm"
                />
              </div>
              <div className="flex items-center  space-x-4">
                <h2 className="text-xl font-medium w-[40%] ">Address :</h2>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className=" border left-0 text-black  py-1 px-2 outline-none  rounded-sm"
                />
              </div>
              <div className="flex items-center  space-x-4">
                <h2 className="text-xl font-medium w-[40%] ">Password :</h2>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className=" border left-0 text-black  py-1 px-2 outline-none  rounded-sm"
                />
              </div>
              <Link href="/acc">
                <button
                  disabled={email && password ? false : true}
                  onClick={handleSubmit}
                  className="bg-black disabled:bg-gray-400 w-full  justify-center mt-6 text-white px-2 py-1 "
                >
                  Register
                </button>
              </Link>
            </form>
            <p>
              Already have an account{" "}
              <span className="font-bold">
                <Link href="/login">Login</Link>
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
