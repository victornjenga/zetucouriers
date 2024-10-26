import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../utils/client"; // Assuming you have a configured Sanity client
import DashboardLayout from "../../components/admin/Layout";
import InfoCard from "../../components/admin/InfoCard";
import { FaFileAlt, FaPeopleArrows } from "react-icons/fa";

function Dashboard() {
  const router = useRouter();

  // States for products and categories count
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  // Fetch products and categories count from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products count
        const productsQuery = `count(*[_type == "products"])`;
        const categoriesQuery = `count(*[_type == "category"])`;
        const ordersQuery = `count(*[_type == "orders"])`;

        const [productCountResult, categoryCountResult, ordersCountResult] = await Promise.all([
          client.fetch(productsQuery),
          client.fetch(categoriesQuery),
          client.fetch(ordersQuery),
        ]);

        setProductsCount(productCountResult);
        setCategoriesCount(categoryCountResult);
        setOrdersCount(ordersCountResult);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full">
        <h1 className="text-2xl font-bold dark:text-gray-100 p-4">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <InfoCard
            title="Products"
            quantity={productsCount} // Show the actual products count
            background="bg-blue-700"
            icon={<FaFileAlt />}
          />
          <InfoCard
            title="Categories"
            quantity={categoriesCount} // Show the actual categories count
            background="bg-green-700"
            icon={<FaPeopleArrows />}
          />

          <InfoCard
            title="Orders"
            quantity={ordersCount} // Show the actual orders count
            background="bg-blue-700"
            icon={<FaFileAlt />}
          />
          <InfoCard
            title="Users"
            quantity="10" // Static or can be fetched similarly
            background="bg-green-700"
            icon={<FaPeopleArrows />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
