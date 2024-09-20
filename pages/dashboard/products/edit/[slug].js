import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../../components/dashboard/Layout";
import { useRouter } from "next/router";
import { client } from "../../../../utils/client";
import Link from "next/link";
import { urlFor } from "../../../../utils/client"; // To display image preview
import { v4 as uuidv4 } from "uuid"; // For unique keys
import toast from "react-hot-toast";

function EditProduct({ product, categories = [], variations = [] }) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
    categories: product.category.map((cat) => cat._ref) || [],
    variations: product.variations?.map((varr) => varr._ref) || [],
  });

  const [existingImages, setExistingImages] = useState(product.image || []);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

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
        ? [...prev.categories, value]
        : prev.categories.filter((categoryId) => categoryId !== value),
    }));
  };

  const handleVariationChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      variations: checked
        ? [...prev.variations, value]
        : prev.variations.filter((variationId) => variationId !== value),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(filePreviews).then((previews) => setImagePreviews(previews));
  };

  // Handle image removal from existing images
  const handleRemoveImage = (imageKey) => {
    setExistingImages((prev) =>
      prev.filter((image) => image._key !== imageKey)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if new images are uploaded, else use existing ones
      let updatedImages = existingImages;
      if (imageFiles.length > 0) {
        updatedImages = []; // Reset images if new images are being uploaded
        for (let file of imageFiles) {
          const uploadResponse = await client.assets.upload("image", file);
          updatedImages.push({
            _type: "image",
            asset: { _ref: uploadResponse._id },
            _key: uuidv4(),
          });
        }
      }

      // Prepare updated product data
      const updatedProduct = {
        _type: "products",
        name: formData.name,
        price: formData.price,
        description: formData.description,
        category: formData.categories.map((categoryId) => ({
          _type: "reference",
          _ref: categoryId,
          _key: uuidv4(),
        })),
        variations: formData.variations.map((variationId) => ({
          _type: "reference",
          _ref: variationId,
          _key: uuidv4(),
        })),
        image: updatedImages,
      };

      // Update product in Sanity
      await client.patch(product._id).set(updatedProduct).commit();
      toast.success("Product updated successfully!");
      // Navigate to product listing after successful update
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          <Link href={`/dashboard/products/edit/${product.slug.current}`}>
            <span className="hover:text-blue-600 text-lg">{product.name}</span>
          </Link>
        </nav>

        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

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
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
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

          {/* Categories */}
          <div className="mb-4">
            <label className="block text-gray-700">Categories</label>
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

          {/* Variations */}
          <div className="mb-4">
            <label className="block text-gray-700">Variations</label>
            <div>
              {variations.map((variation) => (
                <div key={variation._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={variation._id}
                    value={variation._id}
                    onChange={handleVariationChange}
                    checked={formData.variations.includes(variation._id)}
                  />
                  <label htmlFor={variation._id} className="ml-2">
                    {variation.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border px-4 py-2 rounded w-full"
            />
            <div className="flex gap-2 mt-2">
              {/* Existing Images */}
              {existingImages.map((image, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={urlFor(image).url()}
                    alt="Product"
                    className="w-24 h-24 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image._key)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
              {/* New Image Previews */}
              {imagePreviews.map((preview, idx) => (
                <img
                  key={idx}
                  src={preview}
                  alt="New Preview"
                  className="w-24 h-24 object-cover"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditProduct;

// Fetching product, categories, and variations from Sanity
export const getServerSideProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "products" && slug.current == '${slug}'][0]`;
  const categoryQuery = `*[_type == "category"]{_id, title}`;
  const variationQuery = `*[_type == "variations"]{_id, title}`;

  const product = await client.fetch(productQuery);
  const categories = await client.fetch(categoryQuery);
  const variations = await client.fetch(variationQuery);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
      categories,
      variations,
    },
  };
};
