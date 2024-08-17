"use client";

import { motion } from "framer-motion";
import { RiFocus2Fill } from "react-icons/ri";
import { GrMicrofocus } from "react-icons/gr";
import styles from "../styles/style";
import { planetVariants, staggerContainer, fadeIn } from "../utils/motion";

const About = () => (
  <section
    className={`${styles.paddings} px-4 relative pt-48 md:pt-40 z-1 mx-auto w-[100%] md:w-[90%]`}
  >
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="flex-[0.95] flex justify-center flex-col"
      >
        <h1 className="text-5xl md:text-6xl py-5 text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-900">
          Who We Are?
        </h1>
        <p className="justify-center">
          We sell both Home and commercial gym equipments.our Equipment s ranges
          from Strength,cardio,CrossFit and much more We facilitate
          installation, maintenance, quotations, Design layout, procurement, &
          delivery services{" "}
        </p>
        <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
          <div className="flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]">
            <div
              className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] shadow-lg dark:bg-[#323F5D]`}
            >
              <RiFocus2Fill className="text-4xl text-red-600" />
            </div>
            <h1 className="mt-[26px] font-bold text-[24px] leading-[30.24px] dark:text-gray-100">
              OUR MISSION AND OBJECTIVES
            </h1>
            <p className="flex-1 mt-[16px] font-normal text-[18px] dark:text-gray-100  leading-[32.4px]">
              Our mission is to offer a comprehensive range of top-tier home and
              commercial gym equipment, including strength, cardio, and CrossFit
              products.{" "}
            </p>
          </div>
          <div className="flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]">
            <div
              className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] shadow-lg dark:bg-[#323F5D]`}
            >
              <GrMicrofocus className="text-red-600 text-4xl" />
            </div>
            <h1 className="mt-[26px] font-bold text-[24px] leading-[30.24px] dark:text-gray-100">
              Customer Satisfaction
            </h1>
            <p className="flex-1 mt-[16px] font-normal text-[18px] dark:text-gray-100  leading-[32.4px]">
              To be the leading provider of innovative and high-quality gym
              equipment, empowering individuals and businesses to achieve their
              fitness goals and create exceptional workout environments.{" "}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn("left", "tween", 0.3, 1)}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <img
          src="/about.png"
          alt="about"
          className="w-[100%] h-[90%] object-contain"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default About;
