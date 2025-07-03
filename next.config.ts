import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.context = __dirname; // set root context to your project folder
    return config;
  },
};

export default nextConfig;
