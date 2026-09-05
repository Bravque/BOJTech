export type ProjectCategory =
  | "Software Projects"
  | "Websites"
  | "Mobile Applications"
  | "Graphic Design"
  | "Networking Projects"
  | "Digital Marketing";

export const projectCategories: ProjectCategory[] = [
  "Software Projects",
  "Websites",
  "Mobile Applications",
  "Graphic Design",
  "Networking Projects",
  "Digital Marketing",
];

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  client: string;
  year: string;
  description: string;
  tags: string[];
  // Image fields — replace with real project screenshots later.
  image?: string;
  imageAlt: string;
  imagePlaceholder: string;
  imageCategory: string;
};

export const projects: Project[] = [
  {
    slug: "retail-pos-platform",
    name: "Retail POS & Inventory Platform",
    category: "Software Projects",
    client: "Supermarket Chain",
    year: "2025",
    description:
      "A multi-branch point of sale and inventory management platform with real-time sales dashboards and centralized reporting.",
    tags: ["POS", "Inventory", "Dashboard"],
    imageAlt: "Retail POS software dashboard with sales and inventory analytics",
    imagePlaceholder: "Software dashboard — POS & inventory analytics",
    imageCategory: "Software Projects",
  },
  {
    slug: "corporate-website-redesign",
    name: "Corporate Website Redesign",
    category: "Websites",
    client: "Professional Services Firm",
    year: "2025",
    description:
      "A modern, responsive corporate website with a clean design system, strong SEO foundations and fast performance.",
    tags: ["Web", "SEO", "Responsive"],
    imageAlt: "Corporate website displayed on a laptop screen",
    imagePlaceholder: "Website displayed on a laptop",
    imageCategory: "Websites",
  },
  {
    slug: "ecommerce-store",
    name: "E-Commerce Store",
    category: "Websites",
    client: "Retail Brand",
    year: "2024",
    description:
      "A full e-commerce store with product catalog, secure checkout and order management, built for growth.",
    tags: ["E-commerce", "Payments", "Catalog"],
    imageAlt: "E-commerce website storefront on desktop and mobile",
    imagePlaceholder: "E-commerce storefront on desktop and mobile",
    imageCategory: "Websites",
  },
  {
    slug: "field-services-app",
    name: "Field Services Mobile App",
    category: "Mobile Applications",
    client: "Services Company",
    year: "2025",
    description:
      "A cross-platform mobile app for scheduling, job tracking and on-site reporting for field teams.",
    tags: ["Android", "iOS", "Cross-platform"],
    imageAlt: "Field services mobile application screens",
    imagePlaceholder: "Mobile app screens — field services",
    imageCategory: "Mobile Applications",
  },
  {
    slug: "delivery-tracking-app",
    name: "Delivery Tracking App",
    category: "Mobile Applications",
    client: "Logistics Startup",
    year: "2024",
    description:
      "A mobile app with live order tracking, driver routing and customer notifications.",
    tags: ["Mobile", "Maps", "Realtime"],
    imageAlt: "Delivery tracking mobile app interface",
    imagePlaceholder: "Mobile app screens — delivery tracking",
    imageCategory: "Mobile Applications",
  },
  {
    slug: "brand-identity-system",
    name: "Brand Identity System",
    category: "Graphic Design",
    client: "Startup Brand",
    year: "2025",
    description:
      "A complete brand identity including logo, color system, typography and marketing collateral.",
    tags: ["Branding", "Logo", "Collateral"],
    imageAlt: "Brand identity and marketing materials layout",
    imagePlaceholder: "Branding and marketing materials",
    imageCategory: "Graphic Design",
  },
  {
    slug: "campus-network-installation",
    name: "Campus Network Installation",
    category: "Networking Projects",
    client: "Educational Institution",
    year: "2024",
    description:
      "Structured cabling, LAN/WAN setup and campus-wide Wi-Fi coverage for a learning institution.",
    tags: ["LAN/WAN", "Wi-Fi", "Cabling"],
    imageAlt: "Network installation with cabling and access points on a campus",
    imagePlaceholder: "Network installation — cabling & access points",
    imageCategory: "Networking Projects",
  },
  {
    slug: "office-wifi-deployment",
    name: "Office Wi-Fi Deployment",
    category: "Networking Projects",
    client: "Corporate Office",
    year: "2025",
    description:
      "Seamless wireless coverage across a multi-floor office with managed access points and guest access.",
    tags: ["Wi-Fi", "Access Points", "WiFi Chap Chap"],
    imageAlt: "Wireless access point deployment in a corporate office",
    imagePlaceholder: "Wireless access points deployment in an office",
    imageCategory: "Networking Projects",
  },
  {
    slug: "social-media-growth-campaign",
    name: "Social Media Growth Campaign",
    category: "Digital Marketing",
    client: "Consumer Brand",
    year: "2025",
    description:
      "A multi-channel social media and advertising campaign that grew engagement and generated qualified leads.",
    tags: ["Social", "Ads", "Analytics"],
    imageAlt: "Social media campaign analytics and creative assets",
    imagePlaceholder: "Social media campaign & analytics",
    imageCategory: "Digital Marketing",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
