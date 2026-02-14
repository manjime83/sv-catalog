import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;
