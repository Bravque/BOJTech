/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add real image hosts here when photographs and screenshots are uploaded.
      // Example: { protocol: "https", hostname: "images.bojtechnologies.co.ke" },
    ],
  },
};

export default nextConfig;
