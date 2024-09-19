import React, { useState } from "react";
import { client } from "../../utils/client";
import DashboardLayout from "../../components/dashboard/Layout";
import { toast } from "react-toastify";

function FlashSaleProducts({ products = [], flashSaleEndTime }) {
  const [flashSaleProducts, setFlashSaleProducts] = useState(products);
  const [loading, setLoading] = useState({}); // To track loading state for each product
  const [newEndTime, setNewEndTime] = useState(flashSaleEndTime || ""); // Store flash sale end time
  const [savingEndTime, setSavingEndTime] = useState(false); // Track saving state for end time

  // Toggle flash sale status
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
      toast.error("Failed to update flash sale status.");
    }
  };

  // Change discount value
  const handleDiscountChange = (productId, discount) => {
    setFlashSaleProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, discountPercentage: discount }
          : product
      )
    );
  };

  // Save discount percentage
  const handleSaveDiscount = async (productId, discount) => {
    setLoading((prevLoading) => ({ ...prevLoading, [productId]: true }));

    try {
      await client
        .patch(productId)
        .set({ discountPercentage: discount })
        .commit();
      toast.success("Discount updated successfully!");
    } catch (error) {
      toast.error("Failed to update discount.");
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [productId]: false }));
    }
  };

  // Update flash sale end time in Sanity
  const handleSaveEndTime = async () => {
    setSavingEndTime(true); // Start saving state
    try {
      // Fetch site settings to get the correct document ID
      const settings = await client.fetch(`*[_type == "settings"][0]{ _id }`);

      if (!settings || !settings._id) {
        toast.error(
          "Site settings document not found. Please create it in Sanity."
        );
        setSavingEndTime(false);
        return;
      }

      // Patch the correct document ID to update the flash sale end time
      await client
        .patch(settings._id)
        .set({ flashSaleEndTime: newEndTime }) // `newEndTime` is the selected end time
        .commit();

      toast.success("Flash Sale End Time updated successfully!");
    } catch (error) {
      console.error("Error saving Flash Sale End Time:", error);
      toast.error("Failed to update Flash Sale End Time.");
    } finally {
      setSavingEndTime(false); // Stop saving state
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Flash Sale Products</h1>

        {/* Flash Sale End Time */}
        <div className="my-4 ">
          <h2 className="text-xl">Set Flash Sale End Time:</h2>
          <input
            type="datetime-local"
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
            className="border px-4 py-2"
          />
          <button
            onClick={handleSaveEndTime}
            className={`px-4 py-2 rounded ${
              savingEndTime
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            disabled={savingEndTime} // Disable button while saving
          >
            {savingEndTime ? "Saving..." : "Save End Time"}
          </button>
        </div>

        {/* Flash Sale Products Table */}
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
                      {product.flashSale ? "Remove " : "Add "}
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
                        disabled={loading[product._id]}
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
  // Query to fetch products
  const productQuery = `*[_type == "products"]{
    _id,
    name,
    price,
    flashSale,
    discountPercentage,
    image
  }`;

  // Query to fetch flash sale end time from the settings schema
  const flashSaleEndTimeQuery = `*[_type == "settings"][0]{ flashSaleEndTime }`;

  // Fetch products and flash sale end time
  const products = await client.fetch(productQuery);
  const settings = await client.fetch(flashSaleEndTimeQuery);

  // Return fetched data as props
  return {
    props: {
      products: products || [],
      flashSaleEndTime: settings?.flashSaleEndTime || null,
    },
  };
};
