import Head from "next/head";
import { motion } from "framer-motion";
import { FaChartLine, FaHandshake, FaGlobe, FaUserTie } from "react-icons/fa";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
};

const scaleUp = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 },
};

export default function About() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 overflow-x-hidden w-full"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <Head>
        <title>About Us | CNC Commodities</title>
        <meta
          name="description"
          content="CNC Commodities - Leading commodity derivative trading company in Kenya and East Africa."
        />
      </Head>

      {/* Hero Section */}
      <motion.section
        className="relative h-[40vh] flex items-center justify-center px-4"
        variants={scaleUp}
      >
        <div className="text-center w-full max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About CNC Commodities
          </motion.h1>
          <motion.p
            className="text-xl text-yellow-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Leading the Future of Commodity Trading
          </motion.p>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <section className="py-16 bg-white w-full">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={staggerContainer}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            variants={staggerContainer}
          >
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-yellow-500 mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-900 w-full">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={fadeInUp}
          whileInView="animate"
          initial="initial"
          viewport={{ once: true }}
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={scaleUp}
          >
            <h2 className="text-4xl font-bold text-yellow-400 mb-8">
              Our Story
            </h2>
            <motion.div className="space-y-6 text-gray-300" variants={fadeInUp}>
              <p className="text-lg leading-relaxed">
                CNC was established in 2022 and headquartered in Westland's,
                Nairobi...
              </p>
              <p className="text-lg leading-relaxed">
                Our aim is to become a leading entity in the commodity trading
                sector...
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
          >
            <motion.div
              className="bg-gray-50 p-8 rounded-xl shadow-lg"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              whileInView="animate"
              initial="initial"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading global derivatives brokerage firm...
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-8 rounded-xl shadow-lg"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              whileInView="animate"
              initial="initial"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To empower clients with comprehensive and innovative trading
                solutions...
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 w-full">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={fadeInUp}
          whileInView="animate"
          initial="initial"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join CNC Commodities and experience the future of commodity trading
          </p>
          <motion.button
            className="px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </motion.div>
  );
}
