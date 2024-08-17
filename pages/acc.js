import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Profile = () => {
  return (
    <div className="w-[90%] pt-56 flex flex-col items-center pb-4 justify-center">
      <p className="font-medium text-lg"> You are Logged In</p>
      <Link href="/">
        <button
          type="button"
          className="bg-black text-white px-3 py-2  text-xl font-bold hover:scale-105 duration-300 mt-2"
        >
          Continue Shoppping
        </button>
      </Link>
    </div>
  )
}

export default Profile
