import React, { useEffect, useRef, useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { client } from "../utils/client";
import { categories } from "../utils/constants";
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

  const [imagesAssets, setImagesAssets] = useState(null);
  const [wrongTypeofImage, setWrongTypeofImage] = useState(false);
  const [user, setUser] = useState();

  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [link, setLink] = useState();
  const filepickerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const uploadImage = (e) => {
    const selectedImage = e.target.files[0];

    //to input an image to the upload field
    selectedImage.type === "image/png" ||
      selectedImage.type === "image/svg" ||
      selectedImage.type === "image/jpeg" ||
      selectedImage.type === "image/gif" ||
      selectedImage.type === "image/tiff";
    {
      setWrongTypeofImage(false);
      setLoading(true);

      client.assets
        .upload("image", selectedImage, {
          contentType: selectedImage.type,
          filename: selectedImage.name,
        })
        .then((document) => {
          setImagesAssets(document);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setWrongTypeofImage(true);
          console.log("Upload failed:", error.message);
        });
    }
  };

  useEffect(() => {
    if (!userProfile) router.push("/");
  }, [userProfile, router]);
  const handlePost = async () => {
    if ((name, description && imagesAssets?._id && category)) {
      const doc = {
        _type: "sites",
        name,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imagesAssets?._id,
          },
        },
        userId: userProfile?._id,
        price,
        link,
        description,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        category,
      };

      await axios.post(`${BASE_URL}/api/sites`, doc);
      router.push("/");
    }
  };
  const handleDiscard = () => {
    setSavingPost(false);
    setImagesAssets(undefined);
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setLink("");
  };

  return (
    <>
      {user ? (
        <div className="flex  md:flex-col w-full     justify-center">
          <style>
            {`#p-wrap {
               white-space: pre-line;
             }`}
          </style>
          {user.image && (
            <Link href={`/account/${userProfile?._id}`}>
              <div>
                <Image
                  className="rounded-full cursor-pointer"
                  src={user.image}
                  alt="user"
                  width={40}
                  height={40}
                />
              </div>
            </Link>
          )}
          <div className=" rounded-lg xl:h-[80vh] block md:flex gap-6  justify-center items-center p-14 ">
            <div>
              <div>
                <p className="text-2xl font-bold">Upload Sample</p>
                <p className="text-md text-gray-400 mt-1">
                  Upload a website image to your account
                </p>
              </div>
              <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[230px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                {loading ? (
                  <p className="text-center text-3xl text-red-600 font-semibold">
                    Uploading...
                  </p>
                ) : (
                  <div>
                    {!imagesAssets ? (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="flex flex-col justify-center items-center">
                            <p className="font-bold text-xl">
                              <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                            </p>
                            <p className="text-xl font-semibold">
                              Select picture to upload
                            </p>
                          </div>

                          <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                            Less than 2 GB
                          </p>
                          <p className="bg-gray-800 text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                            Select file
                          </p>
                        </div>
                        <input
                          type="file"
                          name="upload-video"
                          onChange={uploadImage}
                          className="w-0 h-0"
                        />
                      </label>
                    ) : (
                      <div className=" rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
                        <div
                          className="flex flex-col filter hover:brightness-110 transition 
                         duration-150 transform hover:scale-105 cursor-pointer"
                        >
                          <Image
                            className=" object-contain"
                            src={imagesAssets?.url}
                            width={400}
                            height={300}
                            alt="/"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {wrongTypeofImage && (
                <p className="text-center text-xl text-red-600 font-semibold mt-4 w-[260px]">
                  Please select an video file (mp4 or webm or ogg)
                </p>
              )}
            </div>
            <div className="flex flex-col pt-10 gap-3 pb-10">
              <label className="text-md font-medium ">name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
              />
              <label className="text-md font-medium ">Details</label>
              {/* <input
                 type="text"
                 value={details}
                 onChange={(e) => setDetails(e.target.value)}
                 className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
               /> */}
              <textarea
                placeholder=" Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
              ></textarea>
              <label className="text-md font-medium ">Website Link</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
              />
              <label className="text-md font-medium ">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
              />
              <label className="text-md font-medium ">Choose a Category</label>

              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
              >
                {categories.map((item) => (
                  <option
                    key={item.name}
                    className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-6 mt-10">
                <button
                  onClick={handleDiscard}
                  type="button"
                  className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                >
                  Discard
                </button>
                <button
                  disabled={imagesAssets?.url ? false : true}
                  onClick={handlePost}
                  type="button"
                  className="bg-gray-800 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                >
                  {savingPost ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(response) => createOrGetUser(response, addUser)}
          onError={() => console.log("Login Failed")}
        />
      )}
    </>
  );
}

export default Upload;
