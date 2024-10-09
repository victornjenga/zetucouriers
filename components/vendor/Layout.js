import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Navbar from "./Header";
import SideBar from "./SideBar";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Import the jwt-decode library
import useAuthStore from "../../store/authStore"; // Import your Zustand store
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useRouter } from "next/router"; // Import Next.js router for navigation

const DashboardLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userProfile, addUser, removeUser } = useAuthStore(); // Zustand store hooks
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [name, setName] = useState(""); // Name state for registration
  const [role, setRole] = useState("vendor"); // Role state is default to vendor
  const [isRegisterMode, setIsRegisterMode] = useState(false); // To toggle between login/register
  const [error, setError] = useState(null); // Error state
  const [showPassword, setShowPassword] = useState(false); // Toggle to show/hide password
  const router = useRouter(); // Use Next.js router for redirection

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Google login success handler
  const handleLoginSuccess = (response) => {
    try {
      const decoded = jwt_decode(response.credential);
      addUser(decoded);
      saveUserToSanity(decoded); // The backend will handle the role
      toast.success("Logged in successfully with Google!");
    } catch (error) {
      console.error("Error decoding JWT:", error);
      toast.error("Failed to decode Google login response.");
    }
  };

  // Save Google user to Sanity
  const saveUserToSanity = async (userData) => {
    try {
      const response = await axios.post("/api/login", {
        ...userData,
        type: "google",
        role, // Send the selected role (admin, vendor, or customer)
      });
      console.log("User saved to Sanity:", response.data);
      toast.success("Google account linked successfully!");
    } catch (error) {
      console.error("Error saving user to Sanity:", error);
      toast.error("Failed to save user to database.");
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  // Email/password login/register handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const type = isRegisterMode ? "register" : "email";
      const response = await axios.post("/api/login", {
        email,
        password,
        name: isRegisterMode ? name : undefined, // Only send name if registering
        type,
        role, // Send the selected role (vendor by default)
      });

      if (response.status === 200 && response.data.user) {
        if (response.data.user.role === "vendor") {
          addUser(response.data.user); // Add user to Zustand store
          toast.success(
            isRegisterMode
              ? "Registered successfully!"
              : "Logged in successfully!"
          );
        } else {
          toast.error("You do not have permission to access this page.");
        }
      } else {
        setError(
          response.data.error || "An error occurred during authentication"
        );
        toast.error(
          response.data.error || "An error occurred. Please try again."
        );
      }
    } catch (err) {
      setError("An error occurred during login/register");
      toast.error("Login or registration failed. Please try again.");
    }
  };

  useEffect(() => {
    // Redirect if user is not a vendor
    if (userProfile && userProfile.role !== "vendor") {
      toast.error("You do not have permission to access this page.");
      router.push("/"); // Redirect to homepage or another page
    }
  }, [userProfile]);

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      {userProfile ? (
        <>
          <Navbar />
          <div className="flex flex-row justify-between w-full">
            <SideBar />
            <div className="content-body top-20 pb-20 overflow-scroll overflow-x-hidden lg:pl-3 bg-neutral-100 text-black dark:bg-gray-900 dark:text-white">
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="flex items-center px-4 md:pt-16 justify-center h-screen">
            <div className="w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-4">
                {isRegisterMode ? "Register" : "Login"}
              </h2>

              {/* Email/Password Login/Register Form */}
              <form onSubmit={handleFormSubmit} className="mb-4">
                {isRegisterMode && (
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      placeholder="Enter your Username"
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="input mt-1 block w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input mt-1 block w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 text-sm"
                  >
                    {showPassword ? "Hide" : "View"}
                  </button>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input mt-1 block w-full px-4 py-2 border rounded-md"
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                  {isRegisterMode ? "Register" : "Login"}
                </button>
              </form>

              {/* Toggle between Login/Register */}
              <p className="text-center">
                {isRegisterMode ? (
                  <>
                    Already have an account?{" "}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setIsRegisterMode(false)}
                    >
                      Login here
                    </span>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setIsRegisterMode(true)}
                    >
                      Register here
                    </span>
                  </>
                )}
              </p>

              {/* Google Login */}
              <div className="text-center justify-center items-center flex w-full mt-4">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </GoogleOAuthProvider>
  );
};

export default DashboardLayout;
