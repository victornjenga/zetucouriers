import React, { useEffect, useState } from "react";
import { client } from "../../utils/client"; // Assuming you have a configured Sanity client
import DashboardLayout from "../../components/dashboard/Layout";

const UsersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const customersQuery = `*[_type == "user" && role == "customer"]`;
        const vendorsQuery = `*[_type == "user" && role == "vendor"]`;

        const [customersResult, vendorsResult] = await Promise.all([
          client.fetch(customersQuery),
          client.fetch(vendorsQuery),
        ]);

        setCustomers(customersResult);
        setVendors(vendorsResult);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full">
        <h1 className="text-2xl font-bold dark:text-gray-100 p-4">Users</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Vendors</h2>
          <table className="min-w-full bg-white dark:bg-gray-800 mb-6">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">#</th>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor._id} className="border-b">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{vendor.name}</td>
                  <td className="px-6 py-3">{vendor.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-xl font-semibold">Customers</h2>
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">#</th>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer._id} className="border-b">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{customer.name}</td>
                  <td className="px-6 py-3">{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
