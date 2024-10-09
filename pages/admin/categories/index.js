import React, { useState } from "react";
import DashboardLayout from "../../../components/dashboard/Layout";
import { client } from "../../../utils/client";
import Link from "next/link";
import { toast } from "react-toastify";

function Categories({ categories }) {
  const [title, setTitle] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Open the delete confirmation modal
  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  // Handle the addition of a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!title) return;

    setIsAdding(true);
    try {
      const newCategory = {
        _type: "category",
        title,
      };
      await client.create(newCategory); // Add new category to Sanity
      setTitle(""); // Clear input
      toast.success(`Category Added successfully!`);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Handle the deletion of a category
  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      setIsDeleting(true);
      try {
        await client.delete(selectedCategory._id); // Delete category from Sanity
        closeDeleteModal();
        toast.success(`Category Deleted successfully!`);
        window.location.reload(); // Reload page to reflect deletion
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex py-3 justify-start w-full">
          <Link href="/dashboard">
            <p className="hover:text-blue-600 text-lg">Dashboard</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/dashboard/categories">
            <p className="hover:text-blue-600 text-lg">Categories</p>
          </Link>
        </nav>

        <h1 className="text-2xl font-bold mb-6">Product Categories</h1>

        {/* Add Category Form */}
        <form onSubmit={handleAddCategory} className="mb-6">
          <div className="mb-4">
            <label className="block py-2">Add New Category</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter category title"
              className="border px-4 py-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              isAdding ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add Category"}
          </button>
        </form>

        {/* Categories List */}
        <div className="overflow-x-auto sites scrollbar-hide">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2">Category Name</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td className="border px-4 py-2">{category.title}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => openDeleteModal(category)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm w-[90%] md:w-full">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedCategory.title}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCategory}
                  className={`bg-red-500 text-white px-4 py-2 rounded ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Categories;

// Fetch categories from Sanity
export const getServerSideProps = async () => {
  try {
    const query = `*[_type == "category"]{_id, title}`;
    const categories = await client.fetch(query);

    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
};
