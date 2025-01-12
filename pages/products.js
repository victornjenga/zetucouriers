import Head from "next/head";
import { motion } from "framer-motion";
import { FaChartLine, FaShieldAlt, FaHandshake } from "react-icons/fa";

const services = [
  {
    name: "Agricultural Futures",
    description:
      "Agricultural futures contracts are standardized according to the amount of commodity being bought or sold, the expected time and place of delivery, and quality of the product.",
    href: "/products/agricultural-futures",
  },
  {
    name: "Currency Futures",
    description:
      "CNC offers active traders, portfolio managers, proprietary trading groups and corporations with access to exchange traded currency futures markets an alternative venue or liquidity source.",
    href: "/products/currency-futures",
  },
  {
    name: "Energy Futures",
    description:
      "Energy Futures assists clients in all segments of the energy spectrum including access to one of the most diverse and sophisticated energy market solutions.",
    href: "/products/energy-futures",
  },
  {
    name: "Interest Rate Derivatives",
    description:
      "Interest rate derivatives are instruments used to hedge against adverse changes of interest rates.",
    href: "/products/interest-rate-derivatives",
  },
  {
    name: "Equity Index Futures",
    description:
      "Equity index futures are derivatives that enable investors to speculate on or hedge against the future value of a stock market index.",
    href: "/products/equity-index-futures",
  },
  {
    name: "Metal Futures",
    description:
      "Metal futures provide producers, manufacturers, traders, and speculators with cost-efficient trading and risk management opportunities.",
    href: "/products/metal-futures",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Our Products | CNC Commodities</title>
        <meta
          name="description"
          content="Explore CNC Commodities' comprehensive range of trading products and services"
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
            Our Trading Products
          </motion.h1>
          <motion.p
            className="text-xl text-yellow-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Comprehensive trading solutions for every market
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaChartLine className="text-4xl" />,
                title: "Advanced Trading",
                description:
                  "State-of-the-art platforms with real-time market data",
              },
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: "Secure Operations",
                description:
                  "Enhanced security measures protecting your investments",
              },
              {
                icon: <FaHandshake className="text-4xl" />,
                title: "Expert Support",
                description:
                  "24/7 professional support from our trading experts",
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
                <div className="text-yellow-400 mb-4 flex justify-center">
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

      {/* Products Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-gray-900"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Trading Products
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
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                    {service.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Ready to Start Trading?
          </motion.h2>
          <motion.p
            className="text-gray-900 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Join thousands of traders who trust CNC Commodities for their
            trading needs
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-gray-900 text-gray-100 font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-300"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Open Account
          </motion.button>
        </div>
      </section>
    </div>
  );
}
