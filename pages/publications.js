import React from "react";
import { client } from "../utils/client"; // Update the path as necessary
import { urlFor } from "../utils/client"; // To get the image URLs
import Link from "next/link";

const BlogsPage = ({ blogs }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="h-56">
              {blog.image.length > 0 && (
                <img
                  src={urlFor(blog.image[0]).url()}
                  alt={blog.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{blog.name}</h2>
              <p className="text-gray-600">{blog.description}</p>
              <p className="text-gray-500 italic">{blog.location}</p>
              <Link href={`/blogs/${blog.slug.current}`}>
                <p className="text-blue-500 hover:underline">Read More</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const query = '*[_type == "blogs"]';
  const blogs = await client.fetch(query);

  return {
    props: {
      blogs,
    },
  };
}

export default BlogsPage;
