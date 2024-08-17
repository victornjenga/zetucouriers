// import { Footer, Navbar } from "../components";
import "../styles/globals.css";
// import NextNprogress from "nextjs-progressbar";
// import { RiWhatsappFill } from "react-icons/ri";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/Navbar";
// import Footer from '@/components/Footer'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useAuthStore from "/store/authStore";
import { Toaster } from "react-hot-toast";
import { RiWhatsappFill } from "react-icons/ri";
import whatsapp from "/public/whatsapp.png";
import call from "/public/call.png";

import Layout from "@/components/Layout";
import Router from "next/router";
import { StateContext } from "../context/StateContext";
import Footer from "@/components/Footer";
import Image from "next/image";
import { CurrencyProvider } from "../context/CurrencyProvider";
import { ThemeProvider } from "next-themes";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Platinum Fitness</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </Head>
      <div>
        <ThemeProvider attribute="class" enableSystem={false}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}
          >
            <CurrencyProvider>
              <StateContext>
              {/* <div className="bottom-3  animate-bounce fixed z-10 cursor-pointer left-4 ">
                  <a
                    href="tell: +254705079016"
                  >
                    <Image
                      width={60}
                      height={60}
                      className="py-2"
                      src={call}
                      alt="/"
                    />
                  </a>
                </div> */}
                <div className="w-full bg-gray-50 dark:bg-gray-950">
                  <Navbar />
                  <Toaster />
                  <div className="w-full flex flex-col justify-center items-center ">
                    <Component {...pageProps} />
                  </div>
                  <Footer />
                </div>
                <div className="bottom-3 animate-bounce fixed z-10 cursor-pointer right-4 ">
                  <a
                    href="https://wa.me/+254705079016?text=Hello,+There"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      width={100}
                      height={100}
                      className="py-2"
                      src={whatsapp}
                      alt="/"
                    />
                  </a>
                </div>
              </StateContext>
            </CurrencyProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </div>
    </>
  );
};

export default MyApp;
