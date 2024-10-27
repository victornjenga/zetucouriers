import React, { useState } from "react";
import DashboardLayout from "../../../components/admin/Layout";
import { client } from "../../../utils/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

function Publications({ publications, error }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  const router = useRouter();

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleEditPublication = (slug) => {
    router.push(`/admin/publications/edit/${slug}`);
  };

  const openDeleteModal = (publication) => {
    setSelectedPublication(publication);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPublication(null);
  };

  const handleDeletePublication = async () => {
    if (selectedPublication) {
      try {
        await client.delete(selectedPublication._id); // Delete publication from Sanity
        closeDeleteModal();

        // Show success toast notification
        toast.success(
          `Publication ${selectedPublication.name} deleted successfully!`
        );

        router.reload(); // Reload the page to update the publications list
      } catch (error) {
        console.error("Error deleting publication:", error);
        toast.error("Failed to delete publication. Please try again.");
      }
    }
  };

  const handleAddPublication = () => {
    router.push("/admin/publications/add");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex py-3 justify-start w-full">
          <Link href="/admin">
            <p className="hover:text-blue-600 text-lg">Dashboard</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/admin/publications">
            <p className="hover:text-blue-600 text-lg">Publications</p>
          </Link>
        </nav>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Publications</h1>
          <button
            onClick={handleAddPublication}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New Publication
          </button>
        </div>

        {/* Publications Table */}
        <div className="overflow-x-auto sites scrollbar-hide">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2">Image</th>
                <th className="py-2">Name</th>
                <th className="py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {publications && publications.length > 0 ? (
                publications.map((publication) => (
                  <tr key={publication._id}>
                    <td className="border px-1 md:px py-2">
                      <img
                        src={publication.image?.[0]?.asset?.url}
                        alt={publication.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                      />
                    </td>
                    <td className="border px-4 py-2">{publication.name}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => openDeleteModal(publication)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No publications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedPublication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm w-[90%] md:w-full">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedPublication.name}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePublication}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Publications;

export const getServerSideProps = async () => {
  try {
    const query = `*[_type == "publications"]{
      _id,
      name,
      slug,
      image[]{
        asset->{
          url
        }
      },
      postedBy->{
        name,
        email
      }
    }`;

    const publications = await client.fetch(query);

    return {
      props: { publications: publications || [] },
    };
  } catch (error) {
    console.error("Error fetching publications:", error);

    return {
      props: { publications: [], error: "Failed to fetch publications" },
    };
  }
};
