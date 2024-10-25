import Head from "next/head";

export default function Careers() {
  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>Ans Engineering Group | Careers</title>
      </Head>

      {/* Hero Section with Parallax */}
      <section
        id="hero"
        className="relative h-[50vh] md:h-[60vh] bg-fixed bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/careers-hero.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-4 sm:space-y-6 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold animate-fadeInDown">
            Join Our Team
          </h1>
          <p className="text-lg md:text-xl animate-fadeInUp">
            Empowering engineers through training and growth.
          </p>
        </div>
      </section>

      {/* Careers Section */}
      <section
        id="careers"
        className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 drop-shadow-lg">
            Careers at Ans Engineering
          </h2>
          <p className="text-lg text-center text-gray-700 max-w-2xl mx-auto mb-12">
            We believe in continuous learning and growth. Our structured
            training programs prepare our staff to gain professional engineering
            registration and ensure they deliver exceptional services to our
            clients.
          </p>

          {/* Structured Training Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">
                Structured Training
              </h3>
              <p className="text-gray-600">
                We offer continuous in-house training on design, detailing,
                software usage, and the latest industry trends. Our training
                ensures that our staff stays ahead of the curve in delivering
                high-quality services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">
                Professional Development
              </h3>
              <p className="text-gray-600">
                Our staff are equipped to gain Professional Engineering
                registration faster through hands-on training and mentoring,
                allowing them to grow their expertise and career in a supportive
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Opportunities Section */}
      <section
        id="internships"
        className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg animate-fadeIn">
            Internship Opportunities
          </h2>
          <p className="text-lg text-center text-gray-700 max-w-2xl mx-auto mb-12">
            We provide opportunities for university students to undertake
            attachments with us, where we train them in design and site
            inspections, ensuring they gain valuable hands-on experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">
                Design Training
              </h3>
              <p className="text-gray-600">
                Learn how to design and detail real-world engineering projects,
                working alongside experienced professionals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">
                Site Inspections
              </h3>
              <p className="text-gray-600">
                Gain field experience through site inspections and learn how our
                engineers ensure project quality and safety.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">
                Software Training
              </h3>
              <p className="text-gray-600">
                Become proficient in industry-standard software, including
                Revit, TEKLA, and other tools used for BIM and project design.
              </p>
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
            Interested in Joining Us?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeIn delay-200">
            Contact us to learn more about career and internship opportunities.
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
