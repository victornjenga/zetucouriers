import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../../components/dashboard/Layout";
import { useRouter } from "next/router";
import { client } from "../../../../utils/client";
import Link from "next/link";
import { urlFor } from "../../../../utils/client"; // To display image preview

function EditProduct({ product }) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
    category: product.category?.[0]?._ref || "",
  });

  const [existingImages, setExistingImages] = useState(product.image || []);
  const [imageFiles, setImageFiles] = useState([]);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if new images are uploaded, else use existing ones
      let updatedImages = existingImages;
      if (imageFiles.length > 0) {
        for (let file of imageFiles) {
          const uploadResponse = await client.assets.upload("image", file);
          updatedImages.push({
            _type: "image",
            asset: { _ref: uploadResponse._id },
          });
        }
      }

      // Prepare product update
      const updatedProduct = {
        _type: "products",
        name: formData.name,
        price: formData.price,
        description: formData.description,
        category: [{ _type: "reference", _ref: formData.category }],
        image: updatedImages,
      };

      // Update product in Sanity
      await client.patch(product._id).set(updatedProduct).commit();

      // Navigate to product listing after successful update
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <nav className="flex py-3 justify-start w-full">
          <Link href="/dashboard">
            <p className="hover:text-blue-600 text-lg">Home</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/dashboard/products">
            <p className="hover:text-blue-600 text-lg">Products</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/dashboard/products">
            <span className="hover:text-blue-600 text-lg">{product.name}</span>
          </Link>
        </nav>

        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border px-4 py-2 rounded w-full"
            />
            <div className="mt-2">
              {existingImages.map((image, idx) => (
                <img
                  key={idx}
                  src={urlFor(image).url()}
                  alt="Product"
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditProduct;

export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "products" && slug.current == '${slug}'][0]`;

  const product = await client.fetch(query);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
};
