import React, { useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../../utils/client";
import useAuthStore from "../../../store/authStore";
import DashboardLayout from "../../../components/admin/Layout";
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate unique keys
import Link from "next/link";
import toast from "react-hot-toast";

const AddProduct = ({ categories = [], variations = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categories: [], // Multiple category selection with checkboxes
    variations: [], // Multiple variation selection
    image: null,
    slug: "",
    location: "", // Add location field
  });
  const [imageFiles, setImageFiles] = useState([]); // For handling multiple image uploads
  const [imagePreviews, setImagePreviews] = useState([]); // For image preview
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

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value] // Add the category if checked
        : prev.categories.filter((category) => category !== value), // Remove the category if unchecked
    }));
  };

  // Handle variation checkbox change
  const handleVariationChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      variations: checked
        ? [...prev.variations, value]
        : prev.variations.filter((variation) => variation !== value),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files); // Store the selected files

    // Generate image previews
    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(filePreviews).then((previews) => setImagePreviews(previews));
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

      // Prepare the new product data
      const newProduct = {
        _type: "products", // Ensure this matches your product document type
        name: formData.name,
        description: formData.description,
        slug: {
          _type: "slug",
          current: slug,
        },
        price: formData.price,
        category: formData.categories.map((categoryId) => ({
          _type: "reference",
          _ref: categoryId, // Reference to the category document ID
          _key: uuidv4(), // Add a unique key for each category reference
        })),
        variations: formData.variations.map((variationId) => ({
          _type: "reference",
          _ref: variationId,
          _key: uuidv4(),
        })),
        image: imageAssets, // Array of uploaded image assets with unique keys
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        location: formData.location, // Include the location
      };

      // Create the new product in Sanity
      await client.create(newProduct);
      toast.success("Product added successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <nav className="flex py-3 justify-start w-full">
          <Link href="/admin">
            <p className="hover:text-blue-600 text-lg">Home</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/admin/products">
            <p className="hover:text-blue-600 text-lg">Projects</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/admin/products/add">
            <span className="hover:text-blue-600 text-lg">Add</span>
          </Link>
        </nav>
        <h1 className="text-2xl font-bold mb-6">Add New Project</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Project Name</label>
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
            <label className="block ">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block ">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block ">Categories</label>
            <div>
              {categories.map((category) => (
                <div key={category._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={category._id}
                    value={category._id}
                    onChange={handleCategoryChange}
                    checked={formData.categories.includes(category._id)}
                  />
                  <label htmlFor={category._id} className="ml-2">
                    {category.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block ">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="mb-4">
              <label className="block ">Image Preview</label>
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt="Preview"
                    className="h-24 w-24 object-cover"
                  />
                ))}
              </div>
            </div>
          )}

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

// Fetch categories from Sanity
export const getServerSideProps = async () => {
  try {
    const categoryQuery = `*[_type == "category"]{_id, title}`;
    const variationQuery = `*[_type == "variations"]{_id, title}`;

    const categories = await client.fetch(categoryQuery);
    const variations = await client.fetch(variationQuery);

    return {
      props: {
        categories: categories || [],
        variations: variations || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categories: [],
        variations: [],
      },
    };
  }
};
