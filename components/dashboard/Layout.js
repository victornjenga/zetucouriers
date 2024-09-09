import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Navbar from "./Header";
import SideBar from "./SideBar";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Import the jwt-decode library
import useAuthStore from "../../store/authStore"; // Import your Zustand store
const DashboardLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userProfile, addUser, removeUser } = useAuthStore(); // Zustand store hooks
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [name, setName] = useState(""); // Name state for registration
  const [isRegisterMode, setIsRegisterMode] = useState(false); // To toggle between login/register
  const [error, setError] = useState(null); // Error state
  const [showPassword, setShowPassword] = useState(false); // Toggle to show/hide password

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Google login success handler
  const handleLoginSuccess = (response) => {
    try {
      const decoded = jwt_decode(response.credential);
      addUser(decoded);
      saveUserToSanity(decoded);
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  };

  // Save Google user to Sanity
  const saveUserToSanity = async (userData) => {
    try {
      const response = await axios.post("/api/login", {
        ...userData,
        type: "google",
      });
      console.log("User saved to Sanity:", response.data);
    } catch (error) {
      console.error("Error saving user to Sanity:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
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
      });

      if (response.status === 200 && response.data.user) {
        addUser(response.data.user); // Add user to Zustand store
      } else {
        setError(
          response.data.error || "An error occurred during authentication"
        );
      }
    } catch (err) {
      setError("An error occurred during login/register");
    }
  };

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
          <div className="flex items-center  px-4 md:pt-16  justify-center h-screen">
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
                      placeholder=" Enter your Username"
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
                    placeholder=" Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input mt-1 block w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div className="mb-4 relative">
                  <div className="flex items-center"></div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 text-sm t"
                  >
                    {showPassword ? "Hide" : "View"}
                  </button>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder=" Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input mt-1 block w-full px-4 py-2 border rounded-md"
                  />
                  {/* Toggle button to show/hide password */}
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                  {isRegisterMode ? "Register" : "Login"}
                </button>
              </form>

              <div className="text-center mb-4">
                <span>
                  {isRegisterMode
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                </span>
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                >
                  {isRegisterMode ? "Login" : "Register"}
                </button>
              </div>

              <div className="text-center mb-4 text-lg">
                Or login with Google
              </div>

              {/* Google Login */}
              <div className="text-center justify-center items-center flex w-full">
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
