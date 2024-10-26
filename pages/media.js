import React from "react";
import { client } from "../utils/client"; // Update the path as necessary
import { urlFor } from "../utils/client"; // To get the image URLs
import Link from "next/link";

const MediaPage = ({ media }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Media Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="h-56">
              {item.image.length > 0 && (
                <img
                  src={urlFor(item.image[0]).url()}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-500">{item.location}</p>
              <Link href={`/media/${item.slug.current}`}>
                <a className="text-blue-500 hover:underline">View Details</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const query = '*[_type == "media"]';
  const media = await client.fetch(query);

  return {
    props: {
      media,
    },
  };
}

export default MediaPage;
