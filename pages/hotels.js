import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useMemo } from "react";
import axios from "axios";
import { client } from "../utils/client";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi"; // Make sure to import the location icon

export default function Hotels({ vendors }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [selectedVendor, setSelectedVendor] = useState(null);

  // Calculate a map center based on vendors' coordinates
  const mapCenter = useMemo(() => {
    const vendorWithCoords = vendors.find((vendor) => vendor.lat && vendor.lng);
    return vendorWithCoords
      ? { lat: vendorWithCoords.lat, lng: vendorWithCoords.lng }
      : { lat: -1.2921, lng: 36.8219 }; // Default to Nairobi if no valid coordinates
  }, [vendors]);

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
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
        Partner Hotels
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {vendors.map((vendor) => {
          if (!vendor.vendorSlug?.current) return null;

          return (
            <div
              key={vendor._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
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
                <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-2">
                  {vendor.name}
                </h2>
                {/* <div className="flex items-center text-gray-600 mb-2">
                  <FiMapPin className="text-lg mr-1" />
                  <span>
                    {vendor.vendorSettings?.address || "Address not available"}
                  </span>
                </div> */}
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

      {/* Map Section */}
      <div className="h-96 w-full">
        {isLoaded && (
          <GoogleMap
            zoom={12}
            center={mapCenter}
            mapContainerClassName="w-full h-full"
          >
            {vendors
              .filter((vendor) => vendor.lat && vendor.lng) // Only show markers for valid coordinates
              .map((vendor, index) => (
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
    console.log("Geocoding response:", response.data);

    const { results } = response.data;

    if (results && results.length > 0) {
      const location = results[0].geometry.location;
      console.log(`Coordinates for ${address}:`, location);
      return { lat: location.lat, lng: location.lng };
    } else {
      console.warn(`No coordinates found for address: ${address}`);
      return { lat: 0, lng: 0 };
    }
  } catch (error) {
    console.error(`Error fetching coordinates for address: ${address}`, error);
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
  console.log("Vendors fetched from Sanity:", vendors);

  // Geocode each vendor's address to get lat/lng
  const formattedVendors = await Promise.all(
    vendors.map(async (vendor) => {
      const address = vendor?.vendorSettings?.address || "";
      console.log(`Geocoding address for vendor ${vendor.name}:`, address);

      if (address) {
        const { lat, lng } = await geocodeAddress(address);
        return {
          ...vendor,
          lat,
          lng,
        };
      } else {
        console.warn(`No address for vendor: ${vendor.name}`);
        return {
          ...vendor,
          lat: null,
          lng: null,
        };
      }
    })
  );

  console.log("Formatted vendors with geocoded addresses:", formattedVendors);

  return {
    props: {
      vendors: formattedVendors || [],
    },
    revalidate: 60,
  };
}
