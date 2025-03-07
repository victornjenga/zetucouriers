import Head from "next/head";
import { motion } from "framer-motion";
import {
  FaTruck,
  FaBox,
  FaClock,
  FaWarehouse,
  FaLock,
  FaShippingFast,
} from "react-icons/fa";

const services = [
  {
    name: "Express Courier",
    description:
      "Same-day, scheduled, and overnight delivery services to meet your urgent needs with speed and reliability.",
    href: "/services/express-courier",
  },
  {
    name: "Cash on Delivery",
    description:
      "Secure and convenient payment collection upon delivery, widely used across East Africa.",
    href: "/services/cash-on-delivery",
  },
  {
    name: "Order Fulfillment",
    description:
      "From picking and packing to shipping, we ensure your orders reach customers accurately and on time.",
    href: "/services/order-fulfillment",
  },
  {
    name: "Warehousing",
    description:
      "Flexible short-term and long-term storage solutions with advanced warehouse management.",
    href: "/services/warehousing",
  },
  {
    name: "Medical Courier",
    description:
      "Specialized transport for pharmaceuticals and medical items, adhering to strict regulations.",
    href: "/services/medical-courier",
  },
  {
    name: "Packaging Services",
    description:
      "Comprehensive packaging solutions to ensure your items are secure and ready for transit.",
    href: "/services/packaging",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Our Services | Zetu Couriers</title>
        <meta
          name="description"
          content="Discover Zetu Couriers' comprehensive range of courier and fulfillment services across East Africa"
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
            Our Courier Services
          </motion.h1>
          <motion.p
            className="text-xl text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Fast, reliable, and tailored solutions for your shipping needs
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaTruck className="text-4xl" />,
                title: "Lightning-Fast Delivery",
                description:
                  "Same-day and overnight options to get your packages where they need to be, fast.",
              },
              {
                icon: <FaBox className="text-4xl" />,
                title: "Reliable Fulfillment",
                description:
                  "Accurate order processing with near-zero error rates for your peace of mind.",
              },
              {
                icon: <FaClock className="text-4xl" />,
                title: "24/7 Availability",
                description:
                  "Round-the-clock support and tracking to keep you connected to your shipments.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-800 rounded-lg"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-green-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-gray-900"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Explore Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden h-full"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6 bg-gray-900">
                  <h3 className="text-2xl font-bold text-green-400 mb-2">
                    {service.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{service.description}</p>
                  <a
                    href={service.href}
                    className="mt-4 inline-block text-green-500 font-semibold hover:underline"
                  >
                    Learn More
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Ready to Ship with Zetu?
          </motion.h2>
          <motion.p
            className="text-gray-900 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Partner with us for fast, reliable, and affordable courier services
            across East Africa
          </motion.p>
          <motion.a
            href="/contact"
            className="px-8 py-3 bg-gray-900 text-gray-100 font-bold rounded-lg hover:bg-green-400 transition-colors duration-300"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Request a Quote
          </motion.a>
        </div>
      </section>
    </div>
  );
}
