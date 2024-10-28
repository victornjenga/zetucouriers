import Head from "next/head";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { client } from "../utils/client";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "Ans Engineering provided exceptional services in our infrastructure project, ensuring quality and sustainability throughout.",
      name: "James Mwangi, Kenya Infrastructure Group",
    },
    {
      text: "Their expertise in structural engineering and project management was critical to our success.",
      name: "Njeri Wambui, Nairobi City Planning",
    },
    {
      text: "Ans Engineering’s approach to safety and sustainability impressed us from the start. Truly a reliable partner.",
      name: "Paul Otieno, East Africa Developers",
    },
  ];

  const services = [
    {
      name: "Civil Engineering",
      description:
        "Delivering innovative civil engineering solutions for roads, bridges, and infrastructure.",
      image: "/civil-engineering.jpg",
    },
    {
      name: "Structural Engineering",
      description:
        "Designing safe, efficient, and sustainable structures for a variety of sectors.",
      image: "/structural-engineering.jpg",
    },
    {
      name: "Construction Supervision",
      description:
        "Providing on-site supervision and ensuring projects meet industry standards and client expectations.",
      image: "/construction-supervision.jpg",
    },
    {
      name: "Frontend Engineering Design",
      description:
        "Comprehensive design solutions in the initial stages of project planning for effective outcomes.",
      image: "/frontend-engineering-design.jpg",
    },
    {
      name: "Geotechnical Engineering",
      description:
        "Specialized analysis and design solutions to understand subsurface conditions for safe foundations.",
      image: "/geotechnical-engineering.jpg",
    },
    {
      name: "Structural Condition and Integrity Assessment",
      description:
        "Assessing existing structures for safety, durability, and structural integrity.",
      image: "/structural-assessment.jpg",
    },
    {
      name: "Environmental Impact Assessment",
      description:
        "Analyzing environmental factors to mitigate impacts and comply with regulations.",
      image: "/environmental-impact.jpg",
    },
    {
      name: "Project Management and Construction Supervision",
      description:
        "Efficient project management and construction oversight for timely, high-quality project completion.",
      image: "/project-management.jpg",
    },
    {
      name: "BIM Modelling",
      description:
        "Advanced BIM modeling for precise design, planning, and collaboration in projects.",
      image: "/bim-modelling.jpg",
    },
  ];

  const nextSlide = () =>
    setActiveIndex((activeIndex + 1) % testimonials.length);
  const prevSlide = () =>
    setActiveIndex(
      (activeIndex - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="bg-gray-50 w-full z-0">
      <Head>
        <title>
          Ans Engineering Group | Infrastructure & Consulting Experts
        </title>
      </Head>
      {/* Hero Section with Parallax */}
      <section
        id="hero"
        className="relative h-[60vh] md:h-[80vh] bg-fixed bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/engineering-hero.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-4 sm:space-y-6 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold animate-fadeInDown">
           Ans Engineering Group Limited
          </h1>
          <h1 className="text-2xl md:text-4xl font-bold animate-fadeInDown">
            Building a Sustainable Future
          </h1>
          <p className="text-lg md:text-xl animate-fadeInUp">
            Quality, safety, and innovation in every project.
          </p>
          <a
            href="/projects"
            className="mt-6 md:mt-8 inline-block bg-yellow-500 text-gray-900 px-6 md:px-8 py-2 md:py-3 rounded-lg shadow-lg hover:bg-yellow-600 font-semibold animate-bounce transition-transform transform hover:scale-105"
          >
            Explore Our Projects
          </a>
        </div>

        {/* Arrow Down Icon */}
        <FaArrowDown className="absolute bottom-6 md:bottom-10 text-xl md:text-2xl text-yellow-500 animate-bounce" />
      </section>

      {/* Vision & Mission Section */}
      <section id="vision-mission" className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Vision & Mission
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Vision Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4 text-yellow-500">
                Vision
              </h3>
              <p className="text-gray-600">
                To be a best-in-class integrated engineering consultancy and
                construction services provider, executing projects to
                world-class standards for our clients and delivering industry
                benchmarked value to our stakeholders.
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4 text-yellow-500">
                Mission
              </h3>
              <p className="text-gray-600">
                To achieve excellence in engineering consultancy and
                construction services through a proactive culture based on team
                spirit and the will to deliver against targets. We uphold
                accountability, implement best practices in project management,
                and maintain industry-leading standards in health and safety.
              </p>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mt-12">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                  Quality
                </h3>
                <p className="text-gray-600">
                  We conduct on-site awareness programs to ensure continuous
                  focus on quality. Our projects are designed to deliver value
                  at every stage, emphasizing our commitment to excellence.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                  Sustainability
                </h3>
                <p className="text-gray-600">
                  We aim to minimize environmental impact and reduce waste,
                  promoting sustainable practices across all operations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                  Safety
                </h3>
                <p className="text-gray-600">
                  Every incident prevented is a life potentially saved. We
                  prioritize safe operating practices and continuous safety
                  training across all projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section with Parallax */}
      <section
        // id="services"
        className="py-20 px-4 sm:px-6 bg-fixed bg-gradient-to-b from-gray-50 to-gray-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg animate-fadeIn">
            Our Engineering Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 px-4 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
              >
                {/* Service Background Image */}
                <div
                  className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>

                {/* Text Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health, Safety, and Environmental Management Policy Section */}
      <section
        id="hse-policy"
        className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Health, Safety, and Environmental Management Policy
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Our commitment to a safe, healthy, and environmentally responsible
            workplace.
          </p>

          <div className="space-y-8 text-gray-700">
            <p>
              The management of Ans Engineering Group Ltd recognizes the
              importance of safety, health, and environmental management to the
              success of the organization. Our staff are vital to the delivery
              of high-quality products and services for our clients. To this
              end, we are committed to taking all reasonable steps to ensure a
              safe and healthy workplace for all staff, while acknowledging our
              responsibility for environmental protection.
            </p>

            <p>
              Our goal is to design a safe workplace for all staff and reduce
              the potential for injuries to zero. Employees will benefit from a
              secure work environment that provides protection from injury,
              allowing each person to focus on delivering top-quality products
              and services. Each of us has responsibilities and accountability
              for various aspects of Ans Engineering Group Ltd’s safety program.
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                  Senior Management
                </h3>
                <p>
                  The organization and its senior management are committed to
                  developing the program, providing financial resources,
                  monitoring progress, offering training, contracting necessary
                  services and staff, and adhering to rehabilitation and
                  recognition practices. At a minimum, we meet all legislative
                  requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                  Managers and Supervisors
                </h3>
                <p>
                  Managers and supervisors are responsible for implementing
                  programs, reinforcing and coaching employees, and monitoring
                  workplace conditions. They also identify and control hazards
                  to maintain a safe environment.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                  Employees
                </h3>
                <p>
                  Each employee has a responsibility to participate in the
                  company’s safety program, attend training sessions, inform
                  management of any HSE concerns or hazards, and monitor the HSE
                  performance of colleagues and third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Resources
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Optimizing operational efficiency with equipped offices, expert
            teams, and advanced technology.
          </p>

          <div className="space-y-12 text-gray-700">
            {/* Office Infrastructure */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-yellow-500 mb-4">
                Office Infrastructure
              </h3>
              <p>
                Our office in Nairobi is fully furnished to provide an optimal
                environment for engineering analysis and design work. With
                in-house facilities such as workstations, drawing/document
                printing, plotting, and scanning, we ensure seamless project
                workflow. A backup power system supports urgent tasks during
                sudden power outages, enabling continuity and efficiency.
              </p>
            </div>

            {/* Human Resource */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-yellow-500 mb-4">
                Human Resource
              </h3>
              <p>
                As a professional services firm, we recognize our staff as our
                most important asset. Our team of engineers, technicians, and
                support staff possess expertise across a wide range of
                engineering disciplines. Additionally, we have standing
                agreements with external experts, ensuring specialized skills
                are readily available for various projects.
              </p>
            </div>

            {/* Computer Aided Design and Drafting (CADD) */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-yellow-500 mb-4">
                Computer Aided Design and Drafting (CADD)
              </h3>
              <p>
                Since 2015, Ans Engineering Group Ltd. has integrated
                computer-aided design software for analysis, design, drawing
                preparation, and project planning. Our customized CADD system
                includes symbol libraries, macros, and standard details, which
                enhance productivity and quality of work. Drafting standards,
                layering conventions, and detailed construction templates ensure
                consistent and high-quality outputs across all disciplines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="relative">
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition-colors"
              >
                ‹
              </button>
              <div className="w-2/3">
                <div className="text-center p-8 bg-gray-50 shadow-lg rounded-lg">
                  <p className="text-lg text-gray-700 mb-4 italic">
                    "{testimonials[activeIndex].text}"
                  </p>
                  <p className="text-lg font-semibold">
                    - {testimonials[activeIndex].name}
                  </p>
                </div>
              </div>
              <button
                onClick={nextSlide}
                className="p-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition-colors"
              >
                ›
              </button>
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
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeIn delay-200">
            Let’s build together. Contact us for consultancy or project
            execution.
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
