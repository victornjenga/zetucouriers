import React from "react";

const EngineeringServices = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Image */}
      <div
        className="w-full h-64 bg-cover bg-center mb-12 rounded-lg shadow-md"
        style={{ backgroundImage: "url('/engineering-header.jpg')" }}
      ></div>

      <h1 className="text-4xl font-bold text-center mb-8">
        Engineering Services
      </h1>

      {/* Introduction Section with Image */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        <img
          src="/engineering-intro.jpg"
          alt="Engineering Intro"
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-6"
        />
        <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left max-w-3xl">
          Ans Engineering Group Ltd provides a multi-disciplinary engineering
          design and building services to complement our wide range of
          infrastructural consultancy services. We deliver comprehensive
          engineering services of civil,structural, mechanical, electrical
          disciplines
        </p>
      </div>

      {/* Service Areas Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          "Civil & Structural Engineering",
          "Procurement",
          "Mechanical & Electrical Services",
          "Construction Management",
          "Geotechnical Engineering",
          "Water and Sanitation Engineering",
          "Feasibility Studies",
          "Transportation & Infrastructure",
          "Conceptual to Detail Design",
          "Technical Services",
          "Engineeing Survery",
          "Structural Forensic Studies",
        ].map((service, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {service}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineeringServices;
