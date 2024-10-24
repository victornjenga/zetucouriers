import Head from "next/head";

export default function Team() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Ans Engineering Group | Our Team</title>
      </Head>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Team
          </h2>
          <div className="bg-white shadow-lg p-6 rounded-lg relative">
            {/* Top Section - Company Name and Slogan */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold text-blue-600">
                Ans Engineering Group Ltd.
              </h3>
              <p className="text-md text-red-600 italic">
                Engineering with Sustainability
              </p>
            </div>

            {/* Managing Director */}
            <div className="flex flex-col items-center relative mb-8">
              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-4 w-full sm:w-64 bg-blue-100">
                <h4 className="text-2xl font-bold text-gray-800">
                  Managing Director
                </h4>
                <p className="text-lg text-gray-600">
                  Eng. George Ochieng Okumu
                </p>
              </div>
              {/* Line from Managing Director to next row */}
              <div className="w-1 h-8 bg-gray-400"></div>
            </div>

            {/* Second Row - Administration and Director */}
            <div className="flex flex-col sm:flex-row justify-center space-y-8 sm:space-y-0 sm:space-x-16 mt-8">
              <div className="flex flex-col items-center">
                <div className="border border-gray-300 rounded-lg p-4 w-full sm:w-64 bg-blue-100">
                  <h4 className="text-xl font-bold text-gray-800">
                    Administration
                  </h4>
                  <p className="text-lg text-gray-600">
                    Accounts & Finance Manager
                  </p>
                  <p className="text-lg text-gray-600">
                    Administrative Assistants
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Divia Kemunto
                  </p>
                </div>
                {/* Line to Senior Engineers */}
                <div className="w-1 h-8 bg-gray-400 mt-4"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="border border-gray-300 rounded-lg p-4 w-full sm:w-64 bg-blue-100">
                  <h4 className="text-xl font-bold text-gray-800">Director</h4>
                  <p className="text-lg text-gray-600">Business Development</p>
                  <p className="text-lg font-semibold text-gray-800">
                    Mary Achieng
                  </p>
                </div>
                {/* Line to Senior Engineers */}
                <div className="w-1 h-8 bg-gray-400 mt-4"></div>
              </div>
            </div>

            {/* Senior Engineers Section */}
            <div className="flex flex-col items-center sm:flex-row sm:justify-center mt-8 relative">
              <div className="w-full sm:w-4/5 border-t border-gray-400 absolute top-0"></div>
              <div className="flex flex-col sm:flex-row space-x-3 justify-around w-full sm:w-4/5 mt-4">
                {/* Structural Engineers */}
                <div className="flex flex-col items-center">
                  <div className="border border-gray-300 rounded-lg p-4 w-full sm:w-48 bg-white">
                    <h5 className="text-xl font-semibold text-blue-600">
                      Structural Engineers
                    </h5>
                    <p className="text-lg font-medium text-gray-700">
                      Eng. Daniel Adede
                    </p>
                  </div>
                  <div className="w-1 h-8 bg-gray-400 mt-4"></div>
                </div>
                {/* Civil Engineers */}
                <div className="flex flex-col items-center mt-8 sm:mt-0">
                  <div className="border border-gray-300 rounded-lg p-4 w-full sm:w-48 bg-white">
                    <h5 className="text-xl font-semibold text-blue-600">
                      Civil Engineers
                    </h5>
                    <p className="text-lg font-medium text-gray-700">
                      Eng. Joab Ngiti
                    </p>
                  </div>
                  <div className="w-1 h-8 bg-gray-400 mt-4"></div>
                </div>
                {/* Mechanical & Electrical Engineers */}
                <div className="flex flex-col items-center mt-8 sm:mt-0">
                  <div className="border border-gray-300 rounded-lg p-4 w-full sm:w-48 bg-white">
                    <h5 className="text-xl font-semibold text-blue-600">
                      Mechanical & Electrical Engineers
                    </h5>
                    <p className="text-lg font-medium text-gray-700">
                      Lilian Amonde
                    </p>
                  </div>
                  <div className="w-1 h-8 bg-gray-400 mt-4"></div>
                </div>
                {/* Geotechnical Engineers */}
                <div className="flex flex-col items-center mt-8 sm:mt-0">
                  <div className="border border-gray-300 rounded-lg p-4 w-full sm:w-48 bg-white">
                    <h5 className="text-xl font-semibold text-blue-600">
                      Geotechnical Engineers
                    </h5>
                    <p className="text-lg font-medium text-gray-700">
                      Eng. Douglas Kithinji
                    </p>
                  </div>
                  <div className="w-1 h-8 bg-gray-400 mt-4"></div>
                </div>
              </div>
            </div>

            {/* Support Teams */}
            <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Environmentalists */}
              <div className="flex flex-col items-center">
                <div className="border border-gray-300 rounded-lg p-4 w-full bg-white text-center">
                  <p className="text-lg font-medium text-gray-700">
                    Environmentalists
                  </p>
                </div>
              </div>
              {/* Surveyors */}
              <div className="flex flex-col items-center">
                <div className="border border-gray-300 rounded-lg p-4 w-full bg-white text-center">
                  <p className="text-lg font-medium text-gray-700">Surveyors</p>
                </div>
              </div>
              {/* Site Supervision Team */}
              <div className="flex flex-col items-center">
                <div className="border border-gray-300 rounded-lg p-4 w-full bg-white text-center">
                  <p className="text-lg font-medium text-gray-700">
                    Site Supervision Team
                  </p>
                </div>
              </div>
            </div>

            {/* Graduate Engineers & Interns */}
            <div className="text-center mt-12">
              <div className="border border-gray-300 rounded-lg p-4 w-full bg-white">
                <h4 className="text-xl font-semibold text-gray-800">
                  Graduate Engineers & Interns
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
