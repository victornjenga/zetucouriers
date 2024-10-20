import React, { useState, useEffect } from "react";
import { client } from "../../utils/client"; // Sanity client
import DashboardLayout from "../../components/vendor/Layout";
import useAuthStore from "../../store/authStore"; // Zustand for logged-in vendor
import { toast } from "react-toastify";

const VendorSettings = () => {
  const { userProfile } = useAuthStore(); // Logged-in vendor profile from Zustand
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  const [settings, setSettings] = useState({
    _id: "", // Add _id field to track the document ID
    vendorName: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    socialLinks: [{ platform: "", url: "" }],
    businessHours: [{ day: "", openTime: "", closeTime: "" }],
  });

  // Fetch vendor settings from Sanity based on the logged-in vendor
  const fetchVendorSettings = async () => {
    if (!userProfile) return;

    try {
      // Fetch the vendor's settings from Sanity
      const query = `*[_type == "vendorSettings" && vendor._ref == "${userProfile._id}"][0]{
        _id, vendorName, description, logo, contactEmail, contactPhone, address, socialLinks, businessHours
      }`;
      const result = await client.fetch(query);

      // If no settings exist, set _id to null, otherwise use the existing _id
      if (!result) {
        // No settings document found, keep _id as empty for creation later
        setSettings((prevSettings) => ({
          ...prevSettings,
          vendorName: userProfile.name || "Unnamed Vendor",
          contactEmail: userProfile.email || "",
        }));
      } else {
        // Settings exist, set the entire fetched result into state including _id
        setSettings(result);
      }
    } catch (fetchError) {
      console.error("Error fetching vendor settings:", fetchError);
      setError("Failed to load vendor settings");
    }
  };

  useEffect(() => {
    fetchVendorSettings();
  }, [userProfile]);

  // Add a new social media link
  const addSocialLink = () => {
    setSettings({
      ...settings,
      socialLinks: [...settings.socialLinks, { platform: "", url: "" }],
    });
  };

  // Add a new business hour entry
  const addBusinessHour = () => {
    setSettings({
      ...settings,
      businessHours: [
        ...settings.businessHours,
        { day: "", openTime: "", closeTime: "" },
      ],
    });
  };

  // Update vendor settings
  const handleSaveSettings = async () => {
    if (!settings) {
      toast.error("Settings data is missing.");
      return; // Stop execution if settings object is missing
    }

    const updatedSettings = {
      vendorName: settings.vendorName,
      description: settings.description,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      address: settings.address,
      socialLinks: settings.socialLinks,
      businessHours: settings.businessHours,
    };

    try {
      setLoading(true); // Set loading to true when the save process begins

      if (settings._id) {
        // Update existing document
        await client
          .patch(settings._id) // Use the existing _id to update the document
          .set(updatedSettings)
          .commit();

        toast.success("Settings updated successfully");
      } else {
        // Create a new settings document
        const newDocument = {
          _type: "vendorSettings",
          vendor: { _type: "reference", _ref: userProfile._id }, // Reference the vendor
          ...updatedSettings,
        };

        await client.create(newDocument);
        toast.success("Settings created successfully");
      }

      fetchVendorSettings(); // Re-fetch the settings to reflect changes
    } catch (error) {
      console.error("Failed to update settings", error);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false); // Set loading to false once the process is complete
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-6">Vendor Settings</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Vendor Profile */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Vendor Profile</h2>
              <p className="text-lg font-medium">{userProfile?.name}</p>
              <p>{userProfile?.email}</p>
            </div>

            {/* Vendor Settings */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Business Information
              </h2>

              <label className="block text-sm font-medium">Vendor Name</label>
              <input
                type="text"
                value={settings.vendorName || ""}
                onChange={(e) =>
                  setSettings({ ...settings, vendorName: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />

              <label className="block text-sm font-medium mt-4">
                Description
              </label>
              <textarea
                value={settings.description || ""}
                onChange={(e) =>
                  setSettings({ ...settings, description: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />

              <label className="block text-sm font-medium mt-4">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail || ""}
                onChange={(e) =>
                  setSettings({ ...settings, contactEmail: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />

              <label className="block text-sm font-medium mt-4">
                Contact Phone
              </label>
              <input
                type="tel"
                value={settings.contactPhone || ""}
                onChange={(e) =>
                  setSettings({ ...settings, contactPhone: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />

              <label className="block text-sm font-medium mt-4">Address</label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Social Media Links */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
              {settings.socialLinks?.map((link, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <label className="block text-sm font-medium">Platform</label>
                  <input
                    type="text"
                    value={link.platform || ""}
                    onChange={(e) => {
                      const newLinks = [...settings.socialLinks];
                      newLinks[index].platform = e.target.value;
                      setSettings({ ...settings, socialLinks: newLinks });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />

                  <label className="block text-sm font-medium">URL</label>
                  <input
                    type="url"
                    value={link.url || ""}
                    onChange={(e) => {
                      const newLinks = [...settings.socialLinks];
                      newLinks[index].url = e.target.value;
                      setSettings({ ...settings, socialLinks: newLinks });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              ))}

              {/* Button to add a new social media link */}
              <button
                onClick={addSocialLink}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Add Social Link
              </button>
            </div>

            {/* Business Hours */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
              {settings.businessHours?.map((hour, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <label className="block text-sm font-medium">Day</label>
                  <input
                    type="text"
                    value={hour.day || ""}
                    onChange={(e) => {
                      const newHours = [...settings.businessHours];
                      newHours[index].day = e.target.value;
                      setSettings({ ...settings, businessHours: newHours });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />

                  <label className="block text-sm font-medium">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    value={hour.openTime || ""}
                    onChange={(e) => {
                      const newHours = [...settings.businessHours];
                      newHours[index].openTime = e.target.value;
                      setSettings({ ...settings, businessHours: newHours });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />

                  <label className="block text-sm font-medium">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    value={hour.closeTime || ""}
                    onChange={(e) => {
                      const newHours = [...settings.businessHours];
                      newHours[index].closeTime = e.target.value;
                      setSettings({ ...settings, businessHours: newHours });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              ))}

              {/* Button to add a new business hour */}
              <button
                onClick={addBusinessHour}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Add Business Hour
              </button>
            </div>
          </div>
        </div>

        {/* Save All Settings Button */}
        <button
          onClick={handleSaveSettings}
          disabled={loading} // Disable the button during loading
          className={`mt-8 p-2 rounded-md ${
            loading
              ? "bg-gray-500 cursor-not-allowed" // Change color and cursor when loading
              : "bg-blue-500 text-white"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="inline mr-2 w-4 h-4 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save All Settings"
          )}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default VendorSettings;
