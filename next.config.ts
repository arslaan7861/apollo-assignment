import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.apollo247.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
