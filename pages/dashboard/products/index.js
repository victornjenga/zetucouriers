import React, { useState } from "react";
import DashboardLayout from "../../../components/dashboard/Layout";
import { client } from "../../../utils/client"; // Make sure your sanity client is properly imported
import { useRouter } from "next/router";
import axios from "axios"; // Missing axios import
import { urlFor } from "../../../utils/client";
import Link from "next/link";

function Products({ products }) {
  // console.log(products);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Stores the product to delete

  const router = useRouter();

  const handleEditProduct = (slug) => {
    router.push(`/dashboard/products/edit/${slug}`);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await client.delete(selectedProduct._id); // Delete product from Sanity
        // You may refresh the page or update state to remove the product from the list
        closeDeleteModal();
        router.reload(); // Refresh the page after deletion
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  const handleAddProduct = () => {
    router.push("/dashboard/products/add");
  };
  return (
    <DashboardLayout>
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex py-3 justify-start w-full ">
          <Link href="/dashboard">
            <p className="hover:text-blue-600 text-lg">Dashboard</p>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/dashboard/products">
            <p className="hover:text-blue-600 text-lg">products</p>
          </Link>
          {/* &nbsp;&gt;&nbsp;
          <Link href={`/websites/detail/${site.slug.current}`}>
            <span className="hover:text-blue-600 text-lg">{site.name}</span>
          </Link> */}
        </nav>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Websites</h1>
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New Product
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto sites scrollbar-hide">
          <table className="min-w-full">
            <thead>
              <tr>
                {/* <th className="py-2">Product Image</th> */}
                <th className="py-2">Product Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Actions</th>
                <th className="py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    {/* <td className="border px-4 py-2">
              {product.image && product.image[0] ? (
                <img
                  src={urlFor(product.image && product.image[0])}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              ) : (
                <span>No image available</span>
              )}
            </td> */}
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.price}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEditProduct(product.slug.current)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => openDeleteModal(product)}
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
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-700  p-6 rounded-lg shadow-lg max-w-sm w-[90%] md:w-full">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedProduct.name}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
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

export default Products;

export const getServerSideProps = async ({ query: { category } }) => {
  try {
    let products;

    if (category) {
      // Query Sanity for websites under the selected category
      const query = `*[_type == "products" && "${category}" in category[]->title]{
          _id,
          name,
          image,
          category[]->{
            _id,
            title
          },
          description,
          price,
          slug,
          brand,
          specs,
          postedBy->{
        _id,
        name,
        email,
        image
      },
          variations
        }`;

      products = await client.fetch(query);
    } else {
      // If no category is provided, fetch all webproducts from Sanity
      const allPostsQuery = `*[_type == "products"]{
          _id,
          name,
          image,
          category[]->{
            _id,
            title
          },
          description,
          price,
          slug,
          brand,
          specs,
          postedBy->{
        _id,
        name,
        email,
      },
          variations
        }`;

      products = await client.fetch(allPostsQuery);
    }

    return {
      props: { products: products || [] }, // Ensure products is always an array
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      props: { products: [], error: "Failed to fetch products" }, // Handle error case
    };
  }
};
