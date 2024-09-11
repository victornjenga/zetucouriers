import React, { useEffect, useState } from "react";
import { client } from "../../utils/client"; // Assuming Sanity client is configured
import DashboardLayout from "../../components/dashboard/Layout";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold dark:text-gray-100 mb-6">Settings</h1>

        <h2>Coming Soon</h2>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
