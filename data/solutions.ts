import type { LucideIcon } from "lucide-react";
import { ShoppingCart, Code2, Megaphone, PenTool, Wifi, Boxes } from "lucide-react";

export type Solution = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  icon: LucideIcon;
  description: string;
  highlights: string[];
  status: "Available" | "Coming Soon";
  accent: "brand" | "accent" | "violet" | "amber";
  // Image / mockup fields — replace with real product screenshots later.
  image?: string;
  imageAlt: string;
  imagePlaceholder: string;
  imageCategory: string;
};

export const solutions: Solution[] = [
  {
    slug: "boj-pos",
    name: "BOJ POS",
    category: "Point of Sale & Business Management",
    tagline: "A modern Point of Sale and business management system.",
    icon: ShoppingCart,
    description:
      "BOJ POS is a complete point of sale and business management solution for retail, supermarkets, restaurants and service businesses — combining fast checkout, inventory control and powerful analytics in one intuitive platform.",
    highlights: [
      "Sales dashboard & fast checkout",
      "Products & inventory management",
      "Reports, receipts & analytics",
      "Multi-branch & multi-user support",
    ],
    status: "Available",
    accent: "brand",
    imageAlt: "BOJ POS sales dashboard showing products, inventory and analytics",
    imagePlaceholder: "POS dashboard — sales, products, inventory, reports, analytics",
    imageCategory: "Product Mockup",
  },
  {
    slug: "boj-software",
    name: "BOJ Software Solutions",
    category: "Custom Software & Digital Platforms",
    tagline: "Custom software and digital platforms.",
    icon: Code2,
    description:
      "BOJ Software Solutions delivers custom business software, web applications and digital platforms — engineered to automate your operations, integrate your systems and scale with your growth.",
    highlights: [
      "Custom business dashboards",
      "Web & SaaS applications",
      "System integration",
      "Scalable cloud platforms",
    ],
    status: "Available",
    accent: "accent",
    imageAlt: "Custom business software dashboard and web application interface",
    imagePlaceholder: "Custom business dashboard / web application interface",
    imageCategory: "Product Mockup",
  },
  {
    slug: "boj-digital",
    name: "BOJ Digital",
    category: "Digital Marketing & Social Media",
    tagline: "Digital marketing and social media management solutions.",
    icon: Megaphone,
    description:
      "BOJ Digital helps brands grow online through social media management, content creation, digital advertising and data-driven marketing campaigns that deliver measurable results.",
    highlights: [
      "Social media analytics",
      "Marketing campaign dashboards",
      "Digital advertising",
      "Content & engagement tracking",
    ],
    status: "Available",
    accent: "violet",
    imageAlt: "Social media analytics and digital marketing campaign dashboard",
    imagePlaceholder: "Social media analytics / marketing campaign dashboard",
    imageCategory: "Product Mockup",
  },
  {
    slug: "boj-creative",
    name: "BOJ Creative",
    category: "Graphic Design & Branding",
    tagline: "Graphic design and branding solutions.",
    icon: PenTool,
    description:
      "BOJ Creative crafts memorable brand identities and marketing visuals — from logos and corporate branding to posters and social media designs that make brands stand out.",
    highlights: [
      "Brand identity & logo design",
      "Posters & marketing materials",
      "Social media designs",
      "UI/UX design systems",
    ],
    status: "Available",
    accent: "amber",
    imageAlt: "Brand identity, posters, logos and social media designs",
    imagePlaceholder: "Brand identity, posters, logo design, social media designs",
    imageCategory: "Product Mockup",
  },
  {
    slug: "wifi-chap-chap",
    name: "WiFi Chap Chap",
    category: "Wireless Connectivity & Networking",
    tagline: "Wireless connectivity and networking solutions.",
    icon: Wifi,
    description:
      "WiFi Chap Chap delivers fast, reliable wireless connectivity for offices, institutions and public spaces — with professionally installed access points and seamless coverage everywhere it matters.",
    highlights: [
      "Wi-Fi hotspots & guest access",
      "Wireless access points",
      "Network infrastructure",
      "Connected-user management",
    ],
    status: "Available",
    accent: "accent",
    imageAlt: "Wi-Fi hotspot, wireless access points and connected users",
    imagePlaceholder: "Wi-Fi hotspot, access points, network infrastructure, users",
    imageCategory: "Product Mockup",
  },
  {
    slug: "future-products",
    name: "Future Products",
    category: "Delivery & Digital Marketplace",
    tagline: "New products, built on the same trusted platform.",
    icon: Boxes,
    description:
      "BOJ Technologies is continuously innovating. Upcoming products include delivery and digital marketplace platforms, online payment integrations and more — all designed to extend the BOJ ecosystem for our clients.",
    highlights: [
      "Delivery & logistics platforms",
      "Digital marketplace",
      "Online payment integrations",
      "Expanding product ecosystem",
    ],
    status: "Coming Soon",
    accent: "brand",
    imageAlt: "Concept visual for future BOJ delivery and marketplace platforms",
    imagePlaceholder: "Future product concept — delivery & digital marketplace",
    imageCategory: "Concept",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
