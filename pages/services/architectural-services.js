import React from "react";

const ArchitecturalServices = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Image */}
      <div
        className="w-full h-64 bg-cover bg-center mb-12 rounded-lg shadow-md"
        style={{ backgroundImage: "url('/architectural-header.jpg')" }}
      ></div>

      <h1 className="text-4xl font-bold text-center mb-8">
        Architectural Services
      </h1>

      {/* Introduction Section with Image */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        <img
          src="/architectural-intro.jpg"
          alt="Architectural Intro"
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-6"
        />
        <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left max-w-3xl">
          We provide sustainable design of state-of-the-art facilities from the
          feasibility planning stage through to completion, ensuring that each
          project is both functional and innovative.
        </p>
      </div>

      {/* Service Areas Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          "Master Planning",
          "Hospitality",
          "Planning + Urban Design",
          "Sports, Leisure & Culture",
          "Residential",
          "Education",
          "Retail",
          "Healthcare",
          "Workplace",
          "Public Realm & Landscaping",
          "Mixed Use",
          "Interior Design",
        ].map((area, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {area}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitecturalServices;
