import Head from "next/head";
import { motion } from "framer-motion";
import { FaChartLine, FaHandshake, FaGlobe, FaUserTie } from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us | CNC Commodities</title>
        <meta
          name="description"
          content="CNC Commodities - Leading commodity derivative trading company in Kenya and East Africa."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About CNC Commodities
          </motion.h1>
          <motion.p
            className="text-xl text-yellow-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Leading the Future of Commodity Trading
          </motion.p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaChartLine className="text-3xl" />,
                title: "Excellence",
                description:
                  "Committed to delivering superior trading solutions and market insights",
              },
              {
                icon: <FaHandshake className="text-3xl" />,
                title: "Integrity",
                description:
                  "Operating with transparency and ethical standards in all transactions",
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: "Innovation",
                description:
                  "Pioneering advanced trading technologies and market solutions",
              },
              {
                icon: <FaUserTie className="text-3xl" />,
                title: "Expertise",
                description:
                  "Led by experienced professionals in commodity trading",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-yellow-500 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-yellow-400 mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                CNC was established in 2022 and headquartered in Westland's,
                Nairobi. We are a dynamic commodity derivative trading company
                poised to make a significant impact in the Kenyan and East
                African commodity markets. Our focus encompasses a diverse range
                of commodities, including agricultural products, sillage, milk,
                Mango Puree, Tomato Puree & energy resources and minerals.
              </p>
              <p className="text-lg leading-relaxed">
                Our aim is to become a leading entity in the commodity trading
                sector by providing reliable services and innovative solutions
                to both producers and consumers through a platform built with
                top tier security features encapsulating the latest web-based
                technology by CMX. Through a team of highly skilled derivative
                traders and well-trained Representatives, we bring together a
                whole Value chain that will uberize commodity trades across the
                region.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              className="bg-gray-50 p-8 rounded-xl shadow-lg"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading global derivatives brokerage firm specializing
                in commodities, transforming market access through innovative
                trading solutions, unparalleled expertise, and a commitment to
                integrity. We envision a future where our advanced technology
                and deep market insights empower investors and producers alike,
                driving sustainable growth and maximizing value across the
                global commodity landscape.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-8 rounded-xl shadow-lg"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To empower clients with comprehensive and innovative trading
                solutions across both derivative and physical commodities
                markets. Our mission is to facilitate effective risk management,
                optimize returns, and enhance operational efficiencies. We are
                dedicated to providing exceptional service, transparent
                operations, and ongoing education, fostering trust and long-term
                partnerships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join CNC Commodities and experience the future of commodity
              trading
            </p>
            <button className="px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-300">
              Get Started
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
