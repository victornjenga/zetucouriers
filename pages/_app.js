// import { Footer, Navbar } from "../components";
import "../styles/globals.css";
// import NextNprogress from "nextjs-progressbar";
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
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for Toast

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const isAdminOrVendor =
    router.pathname.startsWith("/admin") ||
    router.pathname.startsWith("/vendor");

  const handleClick = () => {
    const phoneNumber = "+254732246065";
    const message = `Hello Ans Engineering.`;
    const currentUrl = window.location.href;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <Head>
        <title>Ans Engineering</title>
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
                <div className="w-full bg-gray-50 dark:bg-gray-950">
                  <ToastContainer />
                  {!isAdminOrVendor && <Navbar />}{" "}
                  {/* Hide Navbar for admin and vendor */}
                  <Toaster />
                  <div className="w-full flex flex-col justify-center items-center ">
                    <Component {...pageProps} />
                  </div>
                  {!isAdminOrVendor && <Footer />}{" "}
                  {/* Hide Footer for admin and vendor */}
                </div>

                {!router.pathname.startsWith("/admin") && (
                  <div
                    onClick={handleClick}
                    className="bottom-10 animate-bounce fixed z-40 cursor-pointer right-4 "
                  >
                    <Image
                      width={100}
                      height={100}
                      className="py-2"
                      src={whatsapp}
                      alt="/"
                    />
                  </div>
                )}
              </StateContext>
            </CurrencyProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </div>
    </>
  );
};

export default MyApp;