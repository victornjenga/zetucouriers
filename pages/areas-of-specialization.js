import Head from "next/head";

export default function AreasOfSpecialization() {
  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>Ans Engineering Group | Areas of Specialization</title>
      </Head>

      {/* Hero Section with Parallax */}
      <section
        id="hero"
        className="relative h-[50vh] md:h-[60vh] bg-fixed bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/areas-specialization-hero.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-4 sm:space-y-6 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold animate-fadeInDown">
            Areas of Specialization
          </h1>
          <p className="text-lg md:text-xl animate-fadeInUp">
            Expertise in Structural and Civil Engineering
          </p>
        </div>
      </section>

      {/* Specialization Section */}
      <section
        id="specializations"
        className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto">
          {/* Structural Engineering */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 drop-shadow-lg">
              Structural Engineering
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: "Residential & Commercial Buildings",
                  description:
                    "Design of low and high-rise buildings for safety and durability.",
                },
                {
                  title: "Industrial Structures",
                  description:
                    "Engineering solutions for warehouses and factories.",
                },
                {
                  title: "Hospitals & Institutions",
                  description:
                    "Specialized designs for healthcare, educational, and religious facilities.",
                },
                {
                  title: "Water Retaining Structures",
                  description:
                    "Design of swimming pools, water tanks, and more.",
                },
                {
                  title: "Blast Resistant Designs",
                  description: "We engineer safe, resilient infrastructure.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-xl bg-white p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Civil Engineering */}
          <div>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 drop-shadow-lg">
              Civil Engineering
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: "Access Roads & Drainage",
                  description:
                    "Design and supervision of access roads, drainage systems, and parking facilities.",
                },
                {
                  title: "Culverts & Drainage Improvement",
                  description:
                    "Solutions for stormwater management and drainage improvement.",
                },
                {
                  title: "Design Interpretations & Reviews",
                  description:
                    "Providing design interpretations for civil projects.",
                },
                {
                  title: "Project Planning & Implementation",
                  description:
                    "Project management and planning solutions for civil works.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-xl bg-white p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
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
            Need Expert Engineering Solutions?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeIn delay-200">
            Contact us today for consultation and project implementation.
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
