import React, { useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../../utils/client";
import useAuthStore from "../../../store/authStore";
import DashboardLayout from "../../../components/dashboard/Layout";
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate unique keys

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null, // Change to store image as a file
    slug: "",
  });
  const [imageFiles, setImageFiles] = useState([]); // For handling multiple image uploads
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { userProfile } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files); // Store the selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userProfile) {
      console.error("No user profile found.");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageAssets = [];

      // Upload each image and store its asset reference with a unique key
      for (let file of imageFiles) {
        const uploadResponse = await client.assets.upload("image", file);
        imageAssets.push({
          _type: "image",
          asset: { _ref: uploadResponse._id },
          _key: uuidv4(), // Add a unique key for each image
        });
      }
      // Generate the slug if not provided
      const slug =
        formData.slug || formData.name.toLowerCase().replace(/ /g, "-");

      const newProduct = {
        _type: "products",
        name: formData.name,
        description: formData.description,
        slug: {
          _type: "slug",
          current: slug,
        },
        price: formData.price,
        category: formData.category,
        image: imageAssets, // Array of uploaded image assets with unique keys
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
      };

      // Create the new product in Sanity
      await client.create(newProduct);

      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
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
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
              placeholder="Enter slug (URL-friendly name)"
              required
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
              multiple // Allow multiple file selection
              accept="image/*"
              onChange={handleImageChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
