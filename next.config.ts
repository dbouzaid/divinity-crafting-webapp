import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
};

export default nextConfig;
