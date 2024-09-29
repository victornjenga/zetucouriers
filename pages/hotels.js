import { useState, useEffect } from "react";
import Head from "next/head";
import { FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "@/components/Navbar"; // If you have a Navbar component
import Footer from "@/components/Footer"; // If you have a Footer component
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import the MapContainer from react-leaflet, disabling SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const hotels = [
  {
    name: "Skyline Hotel",
    lat: -1.286389,
    lng: 36.817223,
    location: "Nairobi",
    price: "99",
    meal: "Lunch",
  },
  {
    name: "Ocean Breeze",
    lat: -4.043477,
    lng: 39.668206,
    location: "Mombasa",
    price: "10",
    meal: "Breakfast",
  },
  {
    name: "Hotel Paradise",
    lat: -0.023559,
    lng: 37.906193,
    location: "Nyeri",
    price: "990",
    meal: "Dinner",
  },
];

export default function HotelMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [isClient, setIsClient] = useState(false); // Client-side rendering flag

  // Detect if it's running on the client-side
  useEffect(() => {
    setIsClient(true);

    // Initialize Leaflet only on the client-side
    if (typeof window !== "undefined") {
      const L = require("leaflet");

      // Set default marker icons for Leaflet
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/marker-icon-2x.png", // Adjust the path to your icon
        iconUrl: "/marker-icon.png", // Adjust the path to your icon
        shadowUrl: "/marker-shadow.png", // Adjust the path to your icon shadow
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  useEffect(() => {
    setFilteredHotels(
      hotels.filter(
        (hotel) =>
          (!selectedLocation || hotel.location === selectedLocation) &&
          (!selectedMeal || hotel.meal === selectedMeal) &&
          (!selectedPrice || hotel.price === selectedPrice)
      )
    );
  }, [selectedLocation, selectedMeal, selectedPrice]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleMealChange = (event) => {
    setSelectedMeal(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>Hotels Near You | Find Your Perfect Stay</title>
      </Head>

      <section
        className="relative h-[40vh] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url('/hero-food.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find Hotels Near You
          </h1>
          <p className="text-lg md:text-xl mt-4">
            Choose your location and explore the finest hotels offering
            world-class menus.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Hotels on the Map
          </h2>

          {/* Filter Section */}
          <div className="mb-8 text-center">
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Filter Hotels
              </h3>
              <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="location"
                    className="block text-lg font-semibold mb-2 text-gray-600"
                  >
                    Select a Location:
                  </label>
                  <select
                    id="location"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="">All Locations</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Nyeri">Nyeri</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="meal"
                    className="block text-lg font-semibold mb-2 text-gray-600"
                  >
                    Select Meal Type:
                  </label>
                  <select
                    id="meal"
                    value={selectedMeal}
                    onChange={handleMealChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="">Any Meal</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="price"
                    className="block text-lg font-semibold mb-2 text-gray-600"
                  >
                    Select Price Range:
                  </label>
                  <select
                    id="price"
                    value={selectedPrice}
                    onChange={handlePriceChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="">Any Price</option>
                    <option value="10">10</option>
                    <option value="99">99</option>
                    <option value="990">990</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[500px] mb-12">
            {isClient && (
              <MapContainer
                center={
                  userLocation
                    ? [userLocation.lat, userLocation.lng]
                    : [-1.286389, 36.817223]
                }
                zoom={userLocation ? 12 : 7}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {userLocation && (
                  <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>Your Location</Popup>
                  </Marker>
                )}
                {filteredHotels.map((hotel, index) => (
                  <Marker key={index} position={[hotel.lat, hotel.lng]}>
                    <Popup>
                      <div>
                        <h3 className="text-lg font-semibold">{hotel.name}</h3>
                        <p className="text-gray-700">
                          Location: {hotel.location}
                        </p>
                        <p className="text-gray-700">Meal: {hotel.meal}</p>
                        <p className="text-gray-700">Price: {hotel.price}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
