import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";
const repo = "who-dey-live";

const nextConfig: NextConfig = {
  ...(isGhPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
  images: {
    unoptimized: isGhPages,
    remotePatterns: [
      { protocol: "https", hostname: "a.espncdn.com" },
      { protocol: "https", hostname: "secure.espncdn.com" },
      { protocol: "https", hostname: "**.espncdn.com" },
    ],
  },
};

export default nextConfig;
