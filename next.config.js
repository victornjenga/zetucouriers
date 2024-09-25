/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"], // Add your allowed image domains here
  },
};

module.exports = nextConfig;
