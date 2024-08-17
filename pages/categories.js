import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import { categories } from '@/utils/categories'

function Mobilesearch() {
  return (
    <div className="w-full pt-56 pb-6  justify-center items-center ">
      <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 px-2 gap-3 justify-center items-center ">
        {categories.length ? (
          categories?.map((category) => (
            <Categories key={category._id} category={category} />
          ))
        ) : (
          <NoResults/>
        )}
      </div>
    </div>
  )
}

export default Mobilesearch
