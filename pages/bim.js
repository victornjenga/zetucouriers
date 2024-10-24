import Head from "next/head";

export default function WorkingWithBIM() {
  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>Ans Engineering Group | Working with BIM</title>
      </Head>

      {/* Hero Section with Parallax */}
      <section
        id="hero"
        className="relative h-[50vh] md:h-[60vh] bg-fixed bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/bim-hero.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-4 sm:space-y-6 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold animate-fadeInDown">
            Working with BIM
          </h1>
          <p className="text-lg md:text-xl animate-fadeInUp">
            Innovating through Building Information Modeling
          </p>
        </div>
      </section>

      {/* BIM Section */}
      <section
        id="bim"
        className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 drop-shadow-lg">
            Embracing BIM Technologies
          </h2>
          <p className="text-lg text-center text-gray-700 max-w-2xl mx-auto mb-12">
            Since early 2013, we have shifted our focus towards fully working
            with software that integrates BIM into our projects. With the help
            of powerful tools like Revit, ROBOT, and TEKLA, we deliver precise
            and efficient project management, design, and construction outcomes.
          </p>

          {/* BIM Tools Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Revit",
                description:
                  "A powerful tool for design, documentation, and collaboration, ensuring BIM integration from start to finish.",
                image: "/revit.jpg",
              },
              {
                title: "ROBOT Structural Analysis",
                description:
                  "Allows accurate structural analysis and simulations for complex designs, ensuring structural integrity.",
                image: "/robot-analysis.jpg",
              },
              {
                title: "TEKLA Structures",
                description:
                  "Enables us to model and manage complex structures with precision, enhancing project coordination and accuracy.",
                image: "/tekla.jpg",
              },
            ].map((tool, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
              >
                {/* Tool Background Image */}
                <div
                  className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${tool.image})` }}
                ></div>

                {/* Text Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="cta"
        className="relative py-16 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg animate-fadeIn">
            Ready to Leverage BIM for Your Projects?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeIn delay-200">
            Contact us to learn how we can integrate BIM into your project for
            improved efficiency and accuracy.
          </p>
          <a
            href="/contacts"
            className="inline-block px-10 py-4 bg-gray-100 text-yellow-500 font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
