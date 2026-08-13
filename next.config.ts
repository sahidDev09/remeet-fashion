import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yce-us.s3-accelerate.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
