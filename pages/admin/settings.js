import React, { useState, useEffect } from "react";
import { client } from "../../utils/client"; // Sanity client
import DashboardLayout from "../../components/dashboard/Layout";
import useAuthStore from "../../store/authStore"; // Zustand for logged-in user
import Image from "next/image";
import { toast } from "react-toastify";

const Settings = () => {
  const { userProfile } = useAuthStore(); // Logged in user profile from Zustand
  const [settings, setSettings] = useState(null);
  const [newBanners, setNewBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for saving
  const [error, setError] = useState(""); // Error state

  // Fetch site settings from Sanity
  const fetchSettings = async () => {
    try {
      const query = `*[_type == "settings"]{
        _id, siteName, description, logo, flashSaleEndTime,
        heroBanners[]{_key, asset->{_id, url}}
      }[0]`; // Fetch settings including hero banners
      const result = await client.fetch(query);
      setSettings(result);
    } catch (fetchError) {
      console.error("Error fetching settings:", fetchError);
      setError("Failed to load settings");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Handle new banner image upload
  const handleBannerUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/")); // Validate image type
    const urls = validImages.map((file) => URL.createObjectURL(file)); // Create preview URLs
    setNewBanners((prev) => [...prev, ...urls]); // Update state with new preview URLs

    if (validImages.length !== files.length) {
      toast.warn("Some files were not valid images and were not added.");
    }
  };

  // Remove banner preview
  const removeBannerPreview = (url) => {
    setNewBanners((prev) => prev.filter((banner) => banner !== url));
  };

  // Remove current banner
  const removeCurrentBanner = async (bannerKey) => {
    if (!settings) return;
    const updatedBanners = settings.heroBanners.filter(
      (banner) => banner._key !== bannerKey
    );

    // Update state and send the change to Sanity
    try {
      await client
        .patch(settings._id)
        .set({ heroBanners: updatedBanners })
        .commit();

      setSettings((prev) => ({ ...prev, heroBanners: updatedBanners }));
      toast.success("Banner removed successfully");
    } catch (error) {
      console.error("Failed to remove banner", error);
      toast.error("Failed to remove banner");
    }
  };

  // Update site settings
  const handleSaveSettings = async () => {
    if (!settings) return; // Ensure settings are loaded
    setIsLoading(true); // Set loading state
    setError(""); // Reset any previous error

    // Prepare updated settings object
    const updatedSettings = {
      siteName: settings.siteName,
      description: settings.description,
      flashSaleEndTime: settings.flashSaleEndTime,
      heroBanners: settings.heroBanners || [], // Preserve current banners
    };

    // Upload new banners and append them to existing ones
    if (newBanners.length > 0) {
      try {
        const uploadedBanners = await Promise.all(
          newBanners.map(async (banner) => {
            const response = await fetch(banner);
            const blob = await response.blob();
            const uploadedImage = await client.assets.upload("image", blob); // Upload image blob

            // Generate a unique _key for each new banner
            return {
              _key: uploadedImage._id, // You could use uuid() here if you prefer
              asset: { _type: "reference", _ref: uploadedImage._id },
            };
          })
        );

        // Append newly uploaded banners to the existing ones
        updatedSettings.heroBanners = [
          ...updatedSettings.heroBanners,
          ...uploadedBanners,
        ];
      } catch (uploadError) {
        setError("Failed to upload one or more banners.");
        console.error("Upload Error:", uploadError);
      }
    }

    // Save the updated settings to Sanity
    try {
      await client
        .patch(settings._id) // Use the correct settings document ID
        .set(updatedSettings)
        .commit();

      toast.success("Settings updated successfully");
      setNewBanners([]); // Clear uploaded banners
      fetchSettings(); // Re-fetch the settings to reflect changes
    } catch (error) {
      console.error("Failed to update settings", error);
      setError("Failed to update settings");
      toast.error("Failed to update settings");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Display error message if any */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Check if settings are null or undefined */}
        {!settings ? (
          <p>Loading...</p> // Display a loading message or spinner while fetching settings
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Admin Profile */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
                <div className="flex items-center space-x-4">
                  {userProfile?.profileImage && (
                    <Image
                      src={userProfile.profileImage}
                      alt="Admin Profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-lg font-medium">{userProfile?.name}</p>
                    <p className="">{userProfile?.email}</p>
                  </div>
                </div>
              </div>

              {/* Site Settings */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
                <label className="block text-sm font-medium ">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />

                <label className="block text-sm font-medium mt-4">
                  Site Description
                </label>
                <textarea
                  value={settings.description || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, description: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Current Hero Banners */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Current Hero Banners
                </h2>
                <div className="flex flex-col gap-4">
                  {settings.heroBanners?.length > 0 ? (
                    settings.heroBanners.map((banner) => (
                      <div key={banner._key} className="relative p-2">
                        {banner.asset && (
                          <div>
                            <Image
                              src={banner.asset.url}
                              alt={`Current Hero Banner`}
                              width={300}
                              height={150}
                              layout="responsive"
                              className="rounded shadow-md"
                            />
                            <button
                              onClick={() => removeCurrentBanner(banner._key)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                            >
                              X
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No banners available.</p>
                  )}
                </div>
              </div>

              {/* New Banners Preview */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  New Banner Previews
                </h2>
                <div className="flex flex-wrap gap-4">
                  {newBanners.map((url, index) => (
                    <div
                      key={index}
                      className="relative w-1/2 md:w-1/3 lg:w-1/4 p-2"
                    >
                      <Image
                        src={url}
                        alt={`New Banner Preview`}
                        width={300}
                        height={150}
                        layout="responsive"
                        className="rounded shadow-md"
                      />
                      <button
                        onClick={() => removeBannerPreview(url)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Banners */}
                <div className="mt-4">
                  <label className="block text-sm font-medium">
                    Upload New Banners
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    multiple
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save All Settings Button */}
        <button
          onClick={handleSaveSettings}
          className={`mt-8 bg-blue-500 text-white p-2 rounded-md ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
