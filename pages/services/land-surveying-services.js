import React from "react";

const EnvironmentalServices = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Image */}
      <div
        className="w-full h-64 bg-cover bg-center mb-12 rounded-lg shadow-md"
        style={{ backgroundImage: "url('/land-header.jpg')" }}
      ></div>

      <h1 className="text-4xl font-bold text-center mb-8">
        Land Surveying Services
      </h1>

      {/* Introduction Section with Image */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        <img
          src="/land-intro.jpg"
          alt="Environmental Intro"
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-6"
        />
        <p className="text-lg text-gray-700 leading-relaxed justify-center  item-center max-w-3xl">
          Ans Engineering provides a full-service Land Surveying department
          including four Registered Land Surveyors licensed by the Surveyors of
          Kenya (SoK). Using the most state-of-the-art equipment available, we
          are able to provide our clients with the most e cient methods of eld
          data collection and layout work in the following areas:
        </p>
      </div>

      {/* Service Areas Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          "GPS Surveys",
          "Boundary Surveys",
          "Site Planning Surveys",
          "Topographic Surveys",
          "Land Boundary Surveys",
          "Subdivision Plan",
          "Photogrammetric Ground Control",
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

export default EnvironmentalServices;
