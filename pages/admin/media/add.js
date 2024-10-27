import React, { useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../../utils/client";
import useAuthStore from "../../../store/authStore";
import DashboardLayout from "../../../components/admin/Layout";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import toast from "react-hot-toast";

const AddMedia = ({ categories = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categories: [],
    mediaFiles: null,
    slug: "",
    location: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]);
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
        ? [...prev.categories, value]
        : prev.categories.filter((category) => category !== value),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, mediaFiles: files }));

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
      let mediaAssets = [];

      for (let file of formData.mediaFiles) {
        const uploadResponse = await client.assets.upload("image", file);
        mediaAssets.push({
          _type: "image",
          asset: { _ref: uploadResponse._id },
          _key: uuidv4(),
        });
      }

      const slug =
        formData.slug || formData.name.toLowerCase().replace(/ /g, "-");

      const newMedia = {
        _type: "media",
        name: formData.name,
        description: formData.description,
        slug: {
          _type: "slug",
          current: slug,
        },
        category: formData.categories.map((categoryId) => ({
          _type: "reference",
          _ref: categoryId,
          _key: uuidv4(),
        })),
        image: mediaAssets,
        postedBy: {
          _type: "reference",
          _ref: userProfile?._id,
        },
        location: formData.location,
      };

      await client.create(newMedia);
      toast.success("Media added successfully!");
      router.push("/admin/media");
    } catch (error) {
      console.error("Error adding media:", error);
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
          <Link href="/admin/media">
            <p className="hover:text-blue-600 text-lg">Media</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/admin/media/add">
            <span className="hover:text-blue-600 text-lg">Add</span>
          </Link>
        </nav>
        <h1 className="text-2xl font-bold mb-6">Add New Media</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Media Name</label>
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
            <label className="block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded w-full"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label className="block">Categories</label>
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
          </div> */}

          <div className="mb-4">
            <label className="block">Media Files</label>
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
              <label className="block">Image Preview</label>
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
            {isSubmitting ? "Submitting..." : "Add Media"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddMedia;

export const getServerSideProps = async () => {
  try {
    const categoryQuery = `*[_type == "category"]{_id, title}`;

    const categories = await client.fetch(categoryQuery);

    return {
      props: {
        categories: categories || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
};
