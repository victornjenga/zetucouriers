import React, { useState } from "react";
import DashboardLayout from "../../../components/admin/Layout";
import { client } from "../../../utils/client";
import Link from "next/link";
import { toast } from "react-toastify";

function Variations({ variations }) {
  const [title, setTitle] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Open the delete confirmation modal
  const openDeleteModal = (variation) => {
    setSelectedVariation(variation);
    setShowDeleteModal(true);
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedVariation(null);
  };

  // Handle the addition of a new variation
  const handleAddVariation = async (e) => {
    e.preventDefault();
    if (!title) return;

    setIsAdding(true);
    try {
      const newVariation = {
        _type: "variations",
        title,
      };
      await client.create(newVariation); // Add new variation to Sanity
      setTitle(""); // Clear input
      toast.success(`Variation Added successfully!`);
    } catch (error) {
      console.error("Error adding variation:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Handle the deletion of a variation
  const handleDeleteVariation = async () => {
    if (selectedVariation) {
      setIsDeleting(true);
      try {
        await client.delete(selectedVariation._id); // Delete variation from Sanity
        closeDeleteModal();
        toast.success(`Variation Deleted successfully!`);
        window.location.reload(); // Reload page to reflect deletion
      } catch (error) {
        toast.error("Failed to delete variation.");
        console.error("Error deleting variation:", error);
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
          <Link href="/dashboard/variations">
            <p className="hover:text-blue-600 text-lg">variations</p>
          </Link>
        </nav>

        <h1 className="text-2xl font-bold mb-6">Product variations</h1>

        {/* Add variation Form */}
        <form onSubmit={handleAddVariation} className="mb-6">
          <div className="mb-4">
            <label className="block py-2">Add New variation</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter variation title"
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
            {isAdding ? "Adding..." : "Add variation"}
          </button>
        </form>

        {/* variations List */}
        <div className="overflow-x-auto sites scrollbar-hide">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2">variation Name</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {variations && variations.length > 0 ? (
                variations.map((variation) => (
                  <tr key={variation._id}>
                    <td className="border px-4 py-2">{variation.title}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => openDeleteModal(variation)}
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
                    No variations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedVariation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm w-[90%] md:w-full">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedVariation.title}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteVariation}
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

export default Variations;

// Fetch variations from Sanity
export const getServerSideProps = async () => {
  try {
    const query = `*[_type == "variations"]{_id, title}`;
    const variations = await client.fetch(query);

    return {
      props: {
        variations,
      },
    };
  } catch (error) {
    console.error("Error fetching variations:", error);
    return {
      props: {
        variations: [],
      },
    };
  }
};
