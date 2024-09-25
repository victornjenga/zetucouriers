import React, { useEffect } from "react";
import useAuthStore from "../store/authStore"; // Import your Zustand store
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const { userProfile, removeUser } = useAuthStore(); // Zustand store hooks
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    removeUser(); // Remove user from Zustand store
    toast.success("Logged out successfully!");
    router.push("/"); // Redirect to homepage or login page after logout
  };

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    if (!userProfile) {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, [userProfile, router]);

  if (!userProfile) {
    return <div>Loading...</div>; // Show a loading spinner or message while checking authentication state
  }

  return (
    <div className="container mx-auto p-6 pt-40 md:pt-48">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">My Account</h1>

      {/* Grid wrapper that switches to 2 columns on md screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 dark:bg-black gap-6 shadow-md rounded-lg p-6">
        {/* User Details Section */}
        <div>
          <h2 className="text-2xl mb-4">User Details</h2>
          <div className="mb-4">
            <strong>Name:</strong> {userProfile.name || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {userProfile.email || "N/A"}
          </div>
        </div>
        {/* Profile Picture and Logout Section */}
        <div>
          {userProfile.picture && (
            <div className="mb-4">
              <strong>Profile Picture:</strong> <br />
              <img
                src={userProfile.picture}
                alt="Profile"
                className="rounded-full w-24 h-24"
              />
            </div>
          )}

          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
