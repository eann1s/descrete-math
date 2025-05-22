import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverRuntimeConfig: {
    apiUrl: process.env.NEXT_SERVER_API_URL || "http://app:5000/api/v1",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  },
};

export default nextConfig;
