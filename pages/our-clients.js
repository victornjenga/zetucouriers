import React from "react";

// Array of client images
const clients = [
  { name: "Asumbi", image: "/clients/asumbi.png" },
  { name: "Bantu", image: "/clients/bantu.png" },
  { name: "Brickford", image: "/clients/brickford.png" },
  { name: "EAC", image: "/clients/eac.png" },
  { name: "KAG", image: "/clients/kag.png" },
  { name: "RSA", image: "/clients/rsa.png" },
  { name: "St. Mary", image: "/clients/stmary.png" },
];

const OurClients = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Clients</h1>

      {/* Introduction Section */}
      <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12">
        We are proud to have partnered with these esteemed organizations. Our
        clients span across various sectors, all trusting us for quality and
        reliability.
      </p>

      {/* Client Logos Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {clients.map((client, index) => (
          <div
            key={index}
            className="relative group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
          >
            <img
              src={client.image}
              alt={client.name}
              className="w-full h-auto max-h-24 object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurClients;
