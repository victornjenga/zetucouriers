import React, { useEffect, useState } from "react";
import { client } from "../../utils/client"; // Assuming you have a configured Sanity client
import DashboardLayout from "../../components/admin/Layout";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  // Fetch products, categories, and orders from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsQuery = `count(*[_type == "products"])`;
        const categoriesQuery = `count(*[_type == "category"])`;
        const ordersQuery = `*[_type == "orders"] | order(orderDate desc)`;

        const [productCountResult, categoryCountResult, ordersResult] =
          await Promise.all([
            client.fetch(productsQuery),
            client.fetch(categoriesQuery),
            client.fetch(ordersQuery),
          ]);

        setProductsCount(productCountResult);
        setCategoriesCount(categoryCountResult);
        setOrders(ordersResult);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-green-400";
      case "shipped":
        return "bg-blue-400";
      case "delivered":
        return "bg-green-400";
      case "cancelled":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  // Function to convert orders data to CSV format
  const downloadCSV = () => {
    const csvHeaders = [
      "Order Number",
      "Customer Name",
      "Email",
      "Phone",
      "Delivery Location",
      "Product Name",
      "Price",
      "Quantity",
      "Size",
      "Total Price",
      "Payment Method",
      "Order Date",
      "Status",
    ];

    const csvRows = orders.flatMap((order, index) =>
      order.cartItems.map((item) => {
        const row = [
          index + 1,
          `${order.firstName} ${order.lastName}`,
          order.email,
          order.phone,
          order.location,
          item.name,
          item.price,
          item.quantity,
          item.size || "N/A", // if size is not available
          order.totalPrice,
          order.paymentMethod,
          new Date(order.orderDate).toLocaleDateString(),
          order.status,
        ];
        return row.join(",");
      })
    );

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "orders_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <h1 className="text-2xl font-bold dark:text-gray-100 p-4">Orders</h1>

        {/* Add a Download CSV button */}
        <div className="mb-6">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Download Orders CSV
          </button>
        </div>

        <div className="overflow-x-auto sites scrollbar-hide">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">#</th>
                <th className="px-6 py-3 border-b">Customer Name</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Phone</th>
                <th className="px-6 py-3 border-b">Delivery Location</th>
                {/* <th className="px-6 py-3 border-b">Cart Items</th> */}
                <th className="px-6 py-3 border-b">Total Price</th>
                <th className="px-6 py-3 border-b">Payment Method</th>
                <th className="px-6 py-3 border-b">Order Date</th>
                <th className="px-6 py-3 border-b">Status</th>
                <th className="px-6 py-3 border-b">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-b">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="px-6 py-3">{order.email}</td>
                  <td className="px-6 py-3">{order.phone}</td>
                  <td className="px-6 py-3">{order.location}</td>
                  {/* <td className="px-6 py-3">
                    <ul>
                      {order.cartItems.map((item, idx) => (
                        <li key={idx} className="mb-2">
                          <div>Product: {item.name}</div>
                          <div>Price: Ksh {item.price}</div>
                          <div>Quantity: {item.quantity}</div>
                          {item.size && <div>Size: {item.size}</div>}
                        </li>
                      ))}
                    </ul>
                  </td> */}
                  <td className="px-6 py-3">Ksh {order.totalPrice}</td>
                  <td className="px-6 py-3 capitalize">
                    {order.paymentMethod}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-white px-3 py-1 rounded ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
