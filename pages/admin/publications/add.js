import React, { useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../../utils/client";
import useAuthStore from "../../../store/authStore";
import DashboardLayout from "../../../components/admin/Layout";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import toast from "react-hot-toast";

const AddPublication = ({ categories = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categories: [],
    publicationFiles: null,
    slug: "",
    location: "",
  });
  const [filePreviews, setFilePreviews] = useState([]);
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, publicationFiles: files }));

    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(filePreviews).then((previews) => setFilePreviews(previews));
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
      let publicationAssets = [];

      for (let file of formData.publicationFiles) {
        const uploadResponse = await client.assets.upload("image", file);
        publicationAssets.push({
          _type: "image",
          asset: { _ref: uploadResponse._id },
          _key: uuidv4(),
        });
      }

      const slug =
        formData.slug || formData.name.toLowerCase().replace(/ /g, "-");

      const newPublication = {
        _type: "publication",
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
        files: publicationAssets,
        postedBy: {
          _type: "reference",
          _ref: userProfile?._id,
        },
        location: formData.location,
      };

      await client.create(newPublication);
      toast.success("Publication added successfully!");
      router.push("/admin/publications");
    } catch (error) {
      console.error("Error adding publication:", error);
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
          <Link href="/admin/publications">
            <p className="hover:text-blue-600 text-lg">Publications</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/admin/publications/add">
            <span className="hover:text-blue-600 text-lg">Add</span>
          </Link>
        </nav>
        <h1 className="text-2xl font-bold mb-6">Add New Publication</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Publication Name</label>
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

          <div className="mb-4">
            <label className="block">Publication Files</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          {filePreviews.length > 0 && (
            <div className="mb-4">
              <label className="block">File Previews</label>
              <div className="grid grid-cols-3 gap-2">
                {filePreviews.map((preview, index) => (
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
            {isSubmitting ? "Submitting..." : "Add Publication"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddPublication;

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
