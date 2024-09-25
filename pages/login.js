import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import useAuthStore from "../store/authStore";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const { addUser } = useAuthStore(); // Zustand store hooks
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
      addUser(decoded); // Add user to Zustand store (and localStorage)
      saveUserToSanity(decoded); // Save user to the database
      toast.success("Logged in successfully with Google!");
      router.push("/account"); // Redirect to the account page after successful login
    } catch (error) {
      console.error("Error decoding JWT:", error);
      toast.error("Failed to decode Google login response.");
    }
  };

  // Save Google user to Sanity
  const saveUserToSanity = async (userData) => {
    try {
      await axios.post("/api/login", {
        ...userData,
        type: "google",
        role: "customer", // Ensure the role is set to customer
      });
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
        role: "customer", // Ensure the role is set to customer
      });

      if (response.status === 200 && response.data.user) {
        addUser(response.data.user); // Add user to Zustand store (and localStorage)
        toast.success(
          isRegisterMode
            ? "Registered successfully!"
            : "Logged in successfully!"
        );
        router.push("/account"); // Redirect to the account page after successful login
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

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <div className="flex justify-center items-center min-h-screen pt-20">
        <ToastContainer />
        <div className="w-full max-w-sm  rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isRegisterMode ? "Register" : "Login"}
          </h2>

          {/* Email/Password Login/Register Form */}
          <form onSubmit={handleFormSubmit} className="mb-4">
            {isRegisterMode && (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-10 text-sm text-blue-500"
              >
                {showPassword ? "Hide" : "View"}
              </button>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              {isRegisterMode ? "Register" : "Login"}
            </button>
          </form>

          <div className="text-center mb-4">
            {isRegisterMode ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className="text-blue-500 hover:underline"
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className="text-blue-500 hover:underline"
                >
                  Register
                </button>
              </p>
            )}
          </div>

          <div className="text-center mb-4 text-lg">Or login with Google</div>

          {/* Google Login */}
          <div className="text-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
