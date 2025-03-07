import Head from "next/head";
import { motion } from "framer-motion";
import { FaTruck, FaBox, FaClock, FaGlobe } from "react-icons/fa";

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
        <title>About Us | Zetu Couriers</title>
        <meta
          name="description"
          content="Learn about Zetu Couriers - Your trusted courier and fulfillment partner in East Africa."
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
            About Zetu Couriers
          </motion.h1>
          <motion.p
            className="text-xl text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Delivering Excellence Across East Africa
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
                icon: <FaTruck className="text-3xl" />,
                title: "Speed",
                description:
                  "Committed to lightning-fast deliveries with same-day and overnight options.",
              },
              {
                icon: <FaBox className="text-3xl" />,
                title: "Reliability",
                description:
                  "Ensuring your packages arrive on time with near-zero error rates.",
              },
              {
                icon: <FaClock className="text-3xl" />,
                title: "Innovation",
                description:
                  "Leveraging cutting-edge technology for tracking and fulfillment.",
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: "Reach",
                description:
                  "Serving Kenya, Uganda, and Tanzania with plans to expand across Africa.",
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
                  className="text-green-500 mb-4"
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
            <h2 className="text-4xl font-bold text-green-400 mb-8">
              Our Story
            </h2>
            <motion.div className="space-y-6 text-gray-300" variants={fadeInUp}>
              <p className="text-lg leading-relaxed">
                Founded in 2018 and headquartered in Nairobi, Kenya, Zetu
                Couriers started as a small logistics provider with a big
                vision: to transform the courier and fulfillment landscape in
                East Africa. From our humble beginnings, we’ve grown to serve
                clients across Kenya, Uganda, and Tanzania, with branches in key
                cities like Mombasa, Kisumu, and Nakuru.
              </p>
              <p className="text-lg leading-relaxed">
                Our mission is to deliver fast, reliable, and affordable
                solutions that empower businesses and individuals alike. Whether
                it’s same-day express delivery, secure cash-on-delivery
                services, or comprehensive warehousing, we’re here to connect
                supply to demand with powerful logistics technology. With a plan
                to expand across Africa, Zetu Couriers is committed to being
                your trusted partner in every shipment.
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
                To be the leading courier and fulfillment provider in Africa,
                delivering unparalleled speed, reliability, and innovation to
                every corner of the continent.
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
                To empower businesses and individuals with seamless logistics
                solutions, offering fast deliveries, secure services, and
                advanced technology that enhances customer satisfaction and
                reduces turnaround time.
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
            Ready to Ship with Zetu?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Partner with Zetu Couriers and experience the future of logistics in
            East Africa
          </p>
          <motion.a
            href="/contact"
            className="px-8 py-3 bg-green-500 text-gray-900 font-bold rounded-lg hover:bg-green-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request a Quote
          </motion.a>
        </motion.div>
      </section>
    </motion.div>
  );
}
