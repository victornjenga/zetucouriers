import React, { useState } from "react";
import { client } from "../../utils/client";
import DashboardLayout from "../../components/admin/Layout";
import { toast } from "react-toastify";

function FeaturedProducts({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts);

  const handleToggleFeatured = async (productId, isFeatured) => {
    try {
      // Update the product's featured status in Sanity
      await client.patch(productId).set({ featured: !isFeatured }).commit();

      // Update the local state to reflect the change
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, featured: !isFeatured }
            : product
        )
      );

      toast.success(
        `Product ${!isFeatured ? "added to" : "removed from"} featured list!`
      );
    } catch (error) {
      console.error("Error updating product featured status:", error);
      toast.error("Failed to update featured status.");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Featured Products</h1>

        <div className="overflow-x-auto sites scrollbar-hide">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2">Product Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Featured</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        handleToggleFeatured(product._id, product.featured)
                      }
                      className={`px-4 py-2 rounded ${
                        product.featured
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {product.featured ? "Remove" : "Add"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FeaturedProducts;

export const getServerSideProps = async () => {
  const query = `*[_type == "products"]{
    _id,
    name,
    price,
    featured
  }`;

  const products = await client.fetch(query);

  return {
    props: { products },
  };
};
