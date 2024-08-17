import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "/store/authStore";
import { createOrGetUser } from "/utils";
import NoResults from "../../components/NoResults";
import { BASE_URL } from "../../utils";
// import FollowButton from "../../components/FollowButton";
import LikeButton from "../../components/LikeButton";
import Sites from "../../components/Products";
const Profile = ({ data, postDetails }) => {
    const [site, setSite] = useState(postDetails);

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
  

  // const handleLike = async (like) => {
  //   if (userProfile) {
  //     const res = await axios.put(`${BASE_URL}/api/follow`, {
  //       userId: user._id,
  //       follow,
  //     });
  //     setPost({ ...user, follows: res.data.follows });
  //   }
  // };
  return (
    <div className="w-[90%] ">
      <div className="flex gap-6 md:gap-10 ml-6 mb-4 bg-white w-full">
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
        <div>
          <div className="text-md md:text-2xl font-bold tracking-wider flex flex-col  items-center justify-center lowercase">
            <span>{user.userName.replace(/\s+/g, "")} </span>
            <p className="text-sm font-medium"> {user.userName}</p>
          </div>
          <div className="mt-5 px-10">
            {/* {userProfile && (
              <FollowButton
                follows={post.follows}
                flex="flex"
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )} */}
          </div>
          {userProfile ? (
            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="px-2 py-1 rounded-lg font-medium text-white my-2 bg-[#F51997]"
            >
              Logout
            </button>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("Login Failed")}
            />
          )}
        </div>
      </div>
      <div className="md:ml-10">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${sites} mt-2`}
            onClick={() => setShowUserSites(true)}
          >
            Sites
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserSites(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {sitesList.length > 0 ? (
            sitesList.map((site, idx) => <Sites key={idx} site={site} />)
          ) : (
            <NoResults
              text={`No ${showUserSites ? "" : "Liked"} Sites Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { userId, id } }) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);
  const { data } = await axios.get(`${BASE_URL}/api/sites/${id}`);
  return {
    props: { data: res.data, postDetails: data },
  };
};
export default Profile;

// export const getServerSideProps = async ({ params: { id } }) => {
//   const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

//   return {
//     props: { postDetails: data },
//   };
// };
