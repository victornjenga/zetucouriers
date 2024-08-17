import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "/store/authStore";
import { createOrGetUser } from "/utils";
import NoResults from "../../components/NoResults";
import { BASE_URL } from "../../utils";
import Sites from "../../components/Products";
const Profile = ({ data }) => {
  const [showUserSites, setShowUserSites] = useState(true);
  const [sitesList, setSitesList] = useState([]);

  const { user, userSites, userLikedSites } = data;
  const sites = showUserSites ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserSites ? "border-b-2 border-black" : "text-gray-400";
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    const fetchSites = async () => {
      if (showUserSites) {
        setSitesList(userSites);
      } else {
        setSitesList(userLikedSites);
      }
    };

    fetchSites();
  }, [showUserSites, userLikedSites, userSites]);

  return (
    <div className="w-[90%] pt-56">
      {userProfile ? (
        <div className="flex  gap-6 md:gap-10 ml-6 mb-4 bg-white w-full">
          <div className="w-20 h-20 md:w-32 md:h-32">
            <Image
              width={130}
              height={130}
              layout="responsive"
              className="rounded-full"
              src={user.image}
              alt="user-profile"
            />
          </div>
          <div className="block">
            <div className="text-md md:text-2xl font-bold tracking-wider flex flex-col  items-center justify-center lowercase">
              <span>{user.userName.replace(/\s+/g, "")} </span>
              {/* <p className="text-sm font-medium"> {user.userName}</p> */}
            </div>
            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="px-2 py-1 hover:bg-red-600  font-medium text-white my-2 bg-black"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full  flex flex-col justify-center items-center  mb-8">
          <p className="py-3 text-lg font-semibold hover:text-red-500">
            Login/Register{" "}
          </p>
          <div>
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("Login Failed")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params: { userId } }) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};
export default Profile;
