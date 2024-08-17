import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { categories } from '../utils/constants'

function Discover() {
  const router = useRouter()
  const { category } = router.query

  return (
    <div className="justify-center w-full flex flex-col items-center">
      <p className="text-gray-500 mb-4 font-semibold  mt-4 ">
        Popular Categories
      </p>
      
      <div className="grid grid-cols-2 gap-2  ">
        {categories?.map((item) => (
          <Link href={`/?category=${item.name}`} key={item.name}>
            <div>
              <span
                className={`font-medium left-0  text-xs  `}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover
