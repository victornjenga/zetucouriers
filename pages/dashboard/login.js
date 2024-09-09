import React from "react";

function login() {
  return (
    <div className="mt-40 justify-center items-center flex">
      <form className="bg-gray-900 rounded-lg p-4 flex flex-col">
        <h2 className="font-bold text-xl py-2">LOGIN TO YOUR ACCOUNT</h2>
        <p>Username of Email</p>
        <input
          className="rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-gray-100 w-[300px] md:w-[500px] focus:outline-none focus:rounded-md focus:ring-1 ring-green-500    h-10 px-4 my-3 py-2 "
          placeholder="Enter your email/username"
          type="email"
          name="email"
        />
        <p>Password</p>
        <input
          className=" rounded-2xl w-[300px] md:w-[500px] bg-gray-200 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500   h-10 px-4 my-3 py-2 "
          placeholder="Password"
          type="password"
          name="password"
        />
        <button className="px-3 py-3 bg-green-600 rounded-lg font-semibold text-white">
          Login
        </button>
      </form>
    </div>
  );
}

export default login;
