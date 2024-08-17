import Image from 'next/image'
import React from 'react'
import blog1 from '/public/blog1.jpg'
import blog2 from '/public/blog2.jpg'
import blog3 from '/public/blog3.jpg'
import blog4 from '/public/blog4.png'
import blog5 from '/public/blog5.png'

function Return() {
  return (
    <div className="w-full pt-56 pb-6  justify-center items-center">
      <div className="px-8 justify-center items-center">
        <div className="bg-gray-100 ">
          <h2 className="text-xl px-3 py-2 font-semibold">
            RETURN POLICY FOR CONSUMER
          </h2>
        </div>

        <p className="py-3">
          Lehenga Choli is a widely accepted ethnic wear for any indian
          functions like Wedding functions, Cocktail party, Birthday party,
          Sangeet function, Haldi Ceremony or lots more. What is the basic
          construct of a Lehenga choli ? Normally Lehenga Choli have one blouse
          piece, skirt or lehenga and a dupatta. But now a days there are
          multiple variations Indian Females are using for lehenga choli like
          Lehenga Saree, Jacket Lehenga, Shirt and Lehenga, Draping Lehenga and
          much more. Indian Wedding functions are surronded through all such
          Lehenga Fashions and they are much eye catching. Choice of a
          particular style depends on individual. In few Villages of Gujarat and
          Rajasthan Still Lehenga Choli was used as a daily wear as it is most
          comfortable in extreme heat conditins and in Summer. While Urban
          ladies wear Lehenga Cholis for Special occassions. In South India
          Lehenga Choli is widely accepted as a wedding wear . South Indian
          Fashion of Lehenga Choli is little Bright Colors. In Uttarpradesh
          cities like Noida, Delhi, fusion Lehenga Choli concept is in Latest
          Trend. In Gujarat and Maharashtra Ghaghara Style Lehenga Choli is
          widely worn. We are sharing few Lehenga inspirations which you can go
          through opt for a wedding function.
        </p>
        <h2 className="py-2 text-xl font-semibold">
          Pure Ethnic Lehenga Choli in Vintage Style
        </h2>
        <Image width={30} height={30} className=" " src={blog1} alt="/" />
      </div>
    </div>
  )
}

export default Return
