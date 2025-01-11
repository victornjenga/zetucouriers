import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    });

    elements.forEach((el) => {
      observer.observe(el);
    });
  }, []);

  return (
    <div className="bg-gray-50 w-full">
      <Head>
        <title>About Us | Visible Industries Ltd</title>
        <meta
          name="description"
          content="Visible Industries Ltd - Leading commodity derivative trading company in Kenya and East Africa."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url('/about-hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Welcome to Visible Industries Ltd
          </h1>
          <p className="text-xl md:text-2xl mt-4">
            We Provide Commodity Trading Services
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 fade-in">
            Our Story
          </h2>
          <div className="space-y-6 fade-in">
            <p className="text-lg text-gray-700 leading-relaxed">
              Visible was established in 2022 and headquartered in Westland's,
              Nairobi is a dynamic commodity derivative trading company poised
              to make a significant impact in the Kenyan and East African
              commodity markets. Our focus encompasses a diverse range of
              commodities, including agricultural products, sillage, milk, Mango
              Puree, Tomato Puree & energy resources and minerals.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our aim is to become a leading entity in the commodity trading
              sector by providing reliable services and innovative solutions to
              both producers and consumers through a platform built with top
              tier features security features encapsulating the latest web based
              technology by CMX. Through a team of highly skilled derivative
              traders and well trained Representatives we bring together a whole
              Value chain that will uberize commodity trades across the region.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 sm:px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 fade-in">
            Vision & Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 fade-in">
              <h3 className="text-3xl font-semibold text-gray-900">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Is to be the leading global derivatives brokerage firm
                specializing in commodities, transforming market access through
                innovative trading solutions, unparalleled expertise, and a
                commitment to integrity. We envision a future where our advanced
                technology and deep market insights empower investors and
                producers alike, driving sustainable growth and maximizing value
                across the global commodity landscape.
              </p>
            </div>
            <div className="space-y-6 fade-in">
              <h3 className="text-3xl font-semibold text-gray-900">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To empower clients with comprehensive and innovative trading
                solutions across both derivative and physical commodities
                markets. Our mission is to facilitate effective risk management,
                optimize returns, and enhance operational efficiencies. We are
                dedicated to providing exceptional service, transparent
                operations, and ongoing education, fostering trust and long-term
                partnerships. By seamlessly integrating access to derivative
                instruments and physical commodities, we aim to be the preferred
                partner for clients navigating the complexities of the global
                commodities market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
