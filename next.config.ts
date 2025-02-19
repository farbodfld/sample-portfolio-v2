import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    FORMSPREE_URL: process.env.FORMSPREE_URL,
  }
};

export default nextConfig;
