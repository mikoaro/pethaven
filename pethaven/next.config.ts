import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/image**',
      },
      {
        protocol: 'https',
        hostname: 'sjc.microlink.io',
        port: '',
        pathname: '/lSi1yh**',
      },
      {
        protocol: 'https',
        hostname: 'gray-fancy-rattlesnake-26.mypinata.cloud',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
  experimental: {
    ppr: false,
  },
};

export default nextConfig;


