import React from 'react'
import { FaCreativeCommonsZero } from 'react-icons/fa'

function NoResults() {
  return (
    <div className="flex flex-col  justify-center items-center h-full w-full">
      <p className="text-8xl">
        <FaCreativeCommonsZero />
      </p>
      <p className="text-2xl text-center">No Such Results</p>
    </div>
  )
}

export default NoResults
