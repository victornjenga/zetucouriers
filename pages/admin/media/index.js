import React, { useState } from "react";
import DashboardLayout from "../../../components/admin/Layout";
import { client } from "../../../utils/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

function Media({ media, error }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

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

  const handleEditMedia = (slug) => {
    router.push(`/admin/media/edit/${slug}`);
  };

  const openDeleteModal = (mediaItem) => {
    setSelectedMedia(mediaItem);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMedia(null);
  };

  const handleDeleteMedia = async () => {
    if (selectedMedia) {
      try {
        await client.delete(selectedMedia._id); // Delete media from Sanity
        closeDeleteModal();

        // Show success toast notification
        toast.success(`Media item ${selectedMedia.name} deleted successfully!`);

        router.reload(); // Reload the page to update the media list
      } catch (error) {
        console.error("Error deleting media:", error);
        toast.error("Failed to delete media. Please try again.");
      }
    }
  };

  const handleAddMedia = () => {
    router.push("/admin/media/add");
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
          <Link href="/admin/media">
            <p className="hover:text-blue-600 text-lg">Media</p>
          </Link>
        </nav>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Media</h1>
          <button
            onClick={handleAddMedia}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New Media
          </button>
        </div>

        {/* Media Table */}
        <div className="overflow-x-auto sites scrollbar-hide">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2">Image</th>
                <th className="py-2">Name</th>
                {/* <th className="py-2">Actions</th> */}
                <th className="py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {media && media.length > 0 ? (
                media.map((mediaItem) => (
                  <tr key={mediaItem._id}>
                    <td className="border px-1 md:px py-2">
                      <img
                        src={mediaItem.image?.[0]?.asset?.url}
                        alt={mediaItem.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                      />
                    </td>
                    <td className="border px-4 py-2">{mediaItem.name}</td>
                    {/* <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEditMedia(mediaItem.slug.current)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                    </td> */}
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => openDeleteModal(mediaItem)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No media found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm w-[90%] md:w-full">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedMedia.name}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMedia}
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

export default Media;

export const getServerSideProps = async () => {
  try {
    const query = `*[_type == "media"]{
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

    const media = await client.fetch(query);

    return {
      props: { media: media || [] },
    };
  } catch (error) {
    console.error("Error fetching media:", error);

    return {
      props: { media: [], error: "Failed to fetch media" },
    };
  }
};
