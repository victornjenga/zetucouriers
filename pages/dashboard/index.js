import React from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "../../components/dashboard/Layout";
import InfoCard from "../../components/dashboard/InfoCard";
import { FaFileAlt, FaPeopleArrows } from "react-icons/fa";

function index() {
  const router = useRouter();

  return (
    <DashboardLayout>
      
      <div className="w-full">
        <h1 class="text-2xl font-bold dark:text-gray-100 p-4">Dashboard</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <InfoCard
            title="Products"
            quantity="10"
            background="bg-blue-700"
            icon={<FaFileAlt />}
          />
          <InfoCard
            title="Users"
            quantity="10"
            background="bg-green-700"
            icon={<FaPeopleArrows />}
          />
          <InfoCard
            title="Events"
            quantity="10"
            background="bg-blue-700"
            icon={<FaFileAlt />}
          />
          {/* users  info card */}
          <InfoCard
            title="Users"
            quantity="10"
            background="bg-green-700"
            icon={<FaPeopleArrows />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default index;
