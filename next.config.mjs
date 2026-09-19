/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF intentionally disabled: the AVIF path in Next 14's Image Optimizer
    // has a known RCE advisory (GHSA-2xp9-vwfh-vxw4, fixed in Next 15.5.24+).
    // WebP gives comparable savings without that exposure. Re-enable AVIF after
    // upgrading Next to 15.5.24+.
    formats: ["image/webp"],
    remotePatterns: [
      // Add real image hosts here when photographs and screenshots are uploaded.
      // Example: { protocol: "https", hostname: "images.bojtechnologies.co.ke" },
    ],
  },
};

export default nextConfig;
