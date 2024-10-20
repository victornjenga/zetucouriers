import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  OverlayView,
} from "@react-google-maps/api";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { client } from "../utils/client";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";

export default function Hotels({ vendors }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [closestVendor, setClosestVendor] = useState(null);

  // Request the user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Find the closest hotel based on user's location
  useEffect(() => {
    if (userLocation) {
      let closest = null;
      let minDistance = Infinity;

      vendors.forEach((vendor) => {
        if (vendor.lat && vendor.lng) {
          const distance = getDistanceFromLatLonInKm(
            userLocation.lat,
            userLocation.lng,
            vendor.lat,
            vendor.lng
          );

          if (distance < minDistance) {
            minDistance = distance;
            closest = vendor;
          }
        }
      });

      setClosestVendor(closest);
    }
  }, [userLocation, vendors]);

  // Function to calculate distance between two points
  function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Set the map center based on the closest hotel or user location
  const mapCenter = useMemo(() => {
    if (closestVendor) {
      return { lat: closestVendor.lat, lng: closestVendor.lng };
    }
    return userLocation || { lat: -1.2921, lng: 36.8219 }; // Default to Nairobi if no location
  }, [closestVendor, userLocation]);

  if (!vendors?.length) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">
          No Vendors Available
        </h1>
        <p className="text-gray-500 text-lg">
          It looks like there are no hotels or vendors available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-50 mb-12">
        Partner Hotels
      </h1>

      {/* Display hotels in a grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {vendors.map((vendor) => {
          if (!vendor.vendorSlug?.current) return null;

          return (
            <div
              key={vendor._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative w-full h-24 md:h-48">
                <Image
                  src={vendor.picture || "/placeholder.png"}
                  alt={vendor.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              <div className="px-3 py-2">
                <h2 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-50 mb-2">
                  {vendor.name}
                </h2>
                <Link href={`/hotel/${vendor.vendorSlug.current}`}>
                  <div className="text-blue-500 font-semibold hover:underline">
                    View Menu
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-50 mb-12">
        Hotels Locations On The Map
      </h1>

      {/* Map Section */}
      <div className="h-96 w-full">
        {isLoaded && (
          <GoogleMap
            zoom={closestVendor ? 14 : 12} // Zoom in closer to the nearest hotel
            center={mapCenter}
            mapContainerClassName="w-full h-full"
          >
            {vendors
              .filter((vendor) => vendor.lat && vendor.lng) // Only show markers for valid coordinates
              .map((vendor, index) => (
                <>
                  <Marker
                    key={index}
                    position={{ lat: vendor.lat, lng: vendor.lng }}
                    icon={{
                      url: "/marker-icon-2x.png", // Define the custom marker icon here
                      scaledSize: new window.google.maps.Size(40, 40), // Size of the marker
                    }}
                    onClick={() => setSelectedVendor(vendor)}
                    onLoad={() =>
                      console.log(
                        `Custom Marker loaded at: ${vendor.lat}, ${vendor.lng}`
                      )
                    }
                  />
                  {/* <OverlayView
                    key={index}
                    position={{ lat: vendor.lat, lng: vendor.lng }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  >
                    <div
                      style={{
                        background: "red", // Red circle for demonstration
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      H
                    </div>
                  </OverlayView> */}
                </>
              ))}

            {selectedVendor && (
              <InfoWindow
                position={{ lat: selectedVendor.lat, lng: selectedVendor.lng }}
                onCloseClick={() => setSelectedVendor(null)}
              >
                <div className="text-sm">
                  <h3 className="font-semibold text-lg">
                    {selectedVendor.name}
                  </h3>
                  <p>{selectedVendor.vendorSettings?.contactPhone}</p>
                  <p>{selectedVendor.vendorSettings?.address}</p>
                  <Link href={`/hotel/${selectedVendor.vendorSlug.current}`}>
                    <p className="text-blue-500 hover:underline">View Menu</p>
                  </Link>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

// Geocode the address using Google Maps API
async function geocodeAddress(address) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(geocodeURL);
    const { results } = response.data;

    if (results && results.length > 0) {
      const location = results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      return { lat: 0, lng: 0 };
    }
  } catch (error) {
    return { lat: 0, lng: 0 };
  }
}

// Fetching vendors with role 'vendor' and geocode their address
export async function getStaticProps() {
  const query = `*[_type == "user" && role == "vendor"]{
    _id,
    name,
    picture,
    "vendorSlug": vendorSlug,
    "vendorSettings": *[_type == "vendorSettings" && vendor._ref == ^._id][0] {
      address,
      contactPhone,
    }
  }`;

  const vendors = await client.fetch(query);

  const formattedVendors = await Promise.all(
    vendors.map(async (vendor) => {
      const address = vendor?.vendorSettings?.address || "";
      if (address) {
        const { lat, lng } = await geocodeAddress(address);
        return {
          ...vendor,
          lat,
          lng,
        };
      } else {
        return {
          ...vendor,
          lat: null,
          lng: null,
        };
      }
    })
  );

  return {
    props: {
      vendors: formattedVendors || [],
    },
    revalidate: 60,
  };
}
