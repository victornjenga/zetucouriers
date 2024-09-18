import React from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { IoMdPerson, IoMdLogOut } from "react-icons/io";
import { IoDocument } from "react-icons/io5";
import useAuthStore from "../../store/authStore"; // Import your Zustand store
import {
  FcPositiveDynamic,
  FcMultipleInputs,
  FcHome,
  FcNews,
  FcMindMap,
  FcEngineering,
  FcImport,
  FcMediumPriority,
} from "react-icons/fc";

function SideBar() {
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore(); // Zustand store hooks
  // Handle logout
  const handleLogout = () => {
    removeUser(); // Remove user from Zustand store
    console.log("User logged out");
  };

  return (
    <aside
      id="default-sidebar"
      className="bg-white  dark:bg-gray-950 text-black dark:text-white  fixed top-0 sm:top-20 left-0 z-40 w-64   h-screen pb-20 overflow-y-scroll no-scrollbar transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidenav"
    >
      <div className="overflow-y-auto py-5 pb-10  h-full bg-inherit border-r  border-white dark:border-gray-700">
        <ul>
          <li
            onClick={() => router.push("/dashboard")}
            className="sidebar-link"
          >
            <FcHome className="text-xl" />

            <p className="font-semibold text-xl">Home</p>
          </li>

          {/* <li
            onClick={() => router.push("/dashboard/users")}
            className="sidebar-link"
          >
            <IoMdPerson className="text-xl" />

            <p className="font-semibold text-xl">users</p>
          </li> */}
          <li
            onClick={() => router.push("/dashboard/products")}
            className="sidebar-link"
          >
            <FcMultipleInputs className="text-xl" />

            <p className="font-semibold text-xl">Products</p>
          </li>
          <li
            onClick={() => router.push("/dashboard/categories")}
            className="sidebar-link"
          >
            <FcMindMap className="text-xl" />

            <p className="font-semibold text-xl">Categories</p>
          </li>
          <li
            onClick={() => router.push("/dashboard/orders")}
            className="sidebar-link"
          >
            <FcNews className="text-xl" />

            <p className="font-semibold text-xl">Orders</p>
          </li>
          <li
            onClick={() => router.push("/dashboard/featured")}
            className="sidebar-link"
          >
            <FcMediumPriority className="text-xl" />

            <p className="font-semibold text-xl">Featured</p>
          </li>
          <li
            onClick={() => router.push("/dashboard/sizes")}
            className="sidebar-link"
          >
            <FcImport className="text-xl" />

            <p className="font-semibold text-xl">Variations</p>
          </li>
          <li
            onClick={() => router.push("/dashboard/settings")}
            className="sidebar-link"
          >
            <FcEngineering className="text-xl" />

            <p className="font-semibold text-xl">Settings</p>
          </li>
          <li onClick={handleLogout} className="sidebar-link">
            <IoMdLogOut className="text-xl" />

            <p className="font-semibold text-xl">Logout</p>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
