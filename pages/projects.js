import Head from "next/head";

export default function Projects() {
  const projects = [
    {
      title: "Nairobi High-Rise Apartments",
      description:
        "A modern high-rise building designed for residential use, integrating sustainable materials and efficient use of space.",
      location: "Nairobi, Kenya",
    },
    {
      title: "Coastal Waterfront Hotel",
      description:
        "Luxury waterfront hotel featuring reinforced water-retaining structures and environmentally sustainable designs.",
      location: "Mombasa, Kenya",
    },
    {
      title: "Industrial Manufacturing Plant",
      description:
        "An advanced facility focusing on efficient production and safety standards for a manufacturing hub.",
      location: "Thika, Kenya",
    },
    {
      title: "Urban Office Complex",
      description:
        "An innovative office complex in the heart of the city, balancing aesthetics and energy efficiency.",
      location: "Nairobi, Kenya",
    },
    // Add more projects as needed
  ];

  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>Ans Engineering Group | Our Projects</title>
      </Head>

      {/* Hero Section */}
      <section
        id="projects-hero"
        className="relative h-[50vh] md:h-[60vh] bg-fixed bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/projects-hero.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Our Projects</h1>
          <p className="mt-4 text-lg md:text-xl">
            Showcasing excellence in engineering and innovation.
          </p>
        </div>
      </section>

      {/* Projects List Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">{project.description}</p>
                  <p className="mt-4 text-gray-500 italic">
                    Location: {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-16 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
            Want to Learn More?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Explore more projects or contact us to start your own.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-gray-100 text-yellow-500 font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
