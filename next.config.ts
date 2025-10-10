import type { NextConfig } from "next";

// Allow external quest cover images (e.g. quest.cover_image_url)
const imageDomains = [
  "example.com",
  "i.pinimg.com",
];

const nextConfig: NextConfig = {
  images: {
    domains: imageDomains,
  },
};

export default nextConfig;
