import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Never use output: "export" — this app needs server rendering + API routes
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "a.espncdn.com" },
      { protocol: "https", hostname: "secure.espncdn.com" },
      { protocol: "https", hostname: "**.espncdn.com" },
    ],
  },
};

export default nextConfig;
