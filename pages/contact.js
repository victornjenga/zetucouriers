import React from "react";
import { planetVariants, staggerContainer, fadeIn } from "../utils/motion";
import { motion } from "framer-motion";
import styles from "../styles/style";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdMarkEmailRead, MdLocationOn } from "react-icons/md";
function contact() {
  return (
    <div class=" pt-48 mx-auto w-[90%] md:w-[70%]">
      <section class="mb-10 ">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <div class="flex flex-wrap w-full">
            <motion.div
              variants={fadeIn("up", "tween", 0.2, 1)}
              class="grow-0 shrink-0 text-left  mb-6 md:mb-0 w-full md:w-[50%] "
            >
              <h1 className="text-5xl md:text-6xl py-5 text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-yellow-600  to-yellow-900">
                <span className=" text-transparent  bg-clip-text bg-gradient-to-r from-yellow-600  to-yellow-900">
                  Contact
                </span>{" "}
                Us
              </h1>
              <p>Feel Free to Reach Out To Us.</p>
              <p>Any Question? Write Down And Send Us</p>
              <div class=" mt-4 flex ">
                <MdLocationOn className="mr-2 text-2xl dark:text-white" />
                <p>Nairobi, Kenya</p>
              </div>
              <div class=" my-3 flex item-center ">
                <BsFillTelephoneFill className="mr-2 text-2xl dark:text-white" />
                <p>+254705079016</p>
              </div>
              <div class=" my-3 flex item-center">
                <MdMarkEmailRead className="mr-2 text-2xl dark:text-white" />
                <p>civrotstore@gmail.com</p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("left", "tween", 0.2, 1)}
              class="grow-0 shrink-0 basis-auto mb-4 md:mb-0 w-full md:w-[50%] px-3 lg:px-6"
            >
              <form className="flex flex-col w-full justify-center items-center text-center my-10">
                <input
                  className="rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-gray-100 w-[300px] focus:outline-none focus:rounded-md focus:ring-1 ring-blue-500    h-10 px-4 my-3 py-2 "
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                />

                <input
                  className=" rounded-2xl w-[300px] bg-gray-200 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:rounded-md focus:ring-1 ring-blue-500   h-10 px-4 my-3 py-2 "
                  placeholder="Enter your phone"
                  type="text"
                  name="number"
                />

                <input
                  className=" rounded-2xl w-[300px] bg-gray-200 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:rounded-md focus:ring-1 ring-blue-500   h-10 px-4 my-3 py-2 "
                  placeholder="Date of Birth"
                  type="text"
                  name="number"
                />

                <textarea
                  name="message"
                  placeholder="Messsage"
                  className="bg-gray-200  w-[300px] dark:bg-gray-800 dark:text-gray-100 border-b py-2 pl-4 rounded-2xl focus:outline-none focus:rounded-md focus:ring-1 ring-blue-500 font-light text-gray-500"
                ></textarea>

                <button className="bg-blue-600  my-3 text-gray-100  text-white font-semibold px-3 py-2 rounded-xl">
                  Submit
                </button>
                <div className="text-left"></div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default contact;