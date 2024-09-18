import React, { useState } from "react";
import { client } from "../../utils/client";
import DashboardLayout from "../../components/dashboard/Layout";
import { toast } from "react-toastify";

function FlashSaleProducts({ products }) {
  const [flashSaleProducts, setFlashSaleProducts] = useState(products);
  const [loading, setLoading] = useState({}); // To track loading state for each product

  const handleToggleFlashSale = async (productId, isFlashSale) => {
    setFlashSaleProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, flashSale: !isFlashSale }
          : product
      )
    );

    try {
      await client.patch(productId).set({ flashSale: !isFlashSale }).commit();
      toast.success(
        `Product ${!isFlashSale ? "added to" : "removed from"} flash sale!`
      );
    } catch (error) {
      setFlashSaleProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, flashSale: isFlashSale }
            : product
        )
      );
      console.error("Error updating product flash sale status:", error);
      toast.error("Failed to update flash sale status.");
    }
  };

  const handleDiscountChange = (productId, discount) => {
    setFlashSaleProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, discountPercentage: discount }
          : product
      )
    );
  };

  const handleSaveDiscount = async (productId, discount) => {
    setLoading((prevLoading) => ({ ...prevLoading, [productId]: true })); // Start loading

    try {
      await client
        .patch(productId)
        .set({ discountPercentage: discount })
        .commit();
      toast.success("Discount updated successfully!");
    } catch (error) {
      console.error("Failed to update discount:", error);
      toast.error("Failed to update discount.");
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [productId]: false })); // Stop loading
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Flash Sale Products</h1>

        <div className="overflow-x-auto sites scrollbar-hide">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2">Product Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Flash Sale</th>
                <th className="py-2">Discount Percentage</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flashSaleProducts.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        handleToggleFlashSale(product._id, product.flashSale)
                      }
                      className={`px-4 py-2 rounded ${
                        product.flashSale
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {product.flashSale
                        ? "Remove from Flash Sale"
                        : "Add to Flash Sale"}
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    {product.flashSale && (
                      <input
                        type="number"
                        value={product.discountPercentage || ""}
                        onChange={(e) =>
                          handleDiscountChange(product._id, e.target.value)
                        }
                        className="border px-2 py-1 w-20"
                        placeholder="Discount %"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {product.flashSale && (
                      <button
                        onClick={() =>
                          handleSaveDiscount(
                            product._id,
                            product.discountPercentage
                          )
                        }
                        className={`px-4 py-2 rounded ${
                          loading[product._id]
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                        }`}
                        disabled={loading[product._id]} // Disable the button while loading
                      >
                        {loading[product._id] ? "Saving..." : "Save Discount"}
                      </button>
                    )}
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

export default FlashSaleProducts;

export const getServerSideProps = async () => {
  const query = `*[_type == "products"]{
    _id,
    name,
    price,
    flashSale,
    discountPercentage
  }`;

  const products = await client.fetch(query);

  return {
    props: { products },
  };
};
