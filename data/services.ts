import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Globe,
  Smartphone,
  ShoppingCart,
  PenTool,
  Share2,
  Megaphone,
  MonitorSmartphone,
  Network,
  Wifi,
  Lightbulb,
  Wrench,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: LucideIcon;
  shortDescription: string;
  overview: string;
  features: string[];
  outcomes: string[];
  // Image fields — replace placeholders with real assets later.
  image?: string;
  imageAlt: string;
  imagePlaceholder: string;
  imageCategory: string;
};

export const services: Service[] = [
  {
    slug: "software-development",
    name: "Software Development",
    shortName: "Software",
    tagline: "Custom software engineered around your business",
    icon: Code2,
    shortDescription:
      "Custom business software, web apps, SaaS platforms and system integrations built for real workflows.",
    overview:
      "We design and build custom software that fits the exact way your organization works. From internal business tools to full SaaS platforms, our engineering team delivers reliable, secure and scalable systems that automate processes, reduce manual work and unlock new efficiency.",
    features: [
      "Custom business software",
      "Web applications",
      "Mobile applications",
      "Point of Sale (POS) systems",
      "Business management systems",
      "SaaS platforms",
      "System integration",
      "Custom digital platforms",
    ],
    outcomes: [
      "Automate manual, repetitive processes",
      "Unify fragmented tools into one platform",
      "Scale confidently as your business grows",
    ],
    imageAlt: "Software developer working on a modern business application dashboard",
    imagePlaceholder: "Developer working on a software / dashboard interface",
    imageCategory: "Software Development",
  },
  {
    slug: "web-development",
    name: "Web Development",
    shortName: "Web",
    tagline: "Websites and web apps that convert",
    icon: Globe,
    shortDescription:
      "Corporate websites, e-commerce stores and progressive web apps that are fast, secure and beautiful.",
    overview:
      "Your website is your digital front door. We craft high-performance corporate websites, e-commerce platforms and progressive web applications with clean design, strong SEO foundations and fast loading — built to represent your brand and drive real results.",
    features: [
      "Corporate websites",
      "E-commerce websites",
      "Web applications",
      "Progressive Web Applications",
      "Content-managed websites",
      "SEO-ready architecture",
    ],
    outcomes: [
      "Make a premium first impression",
      "Turn visitors into enquiries and sales",
      "Rank higher and load faster",
    ],
    imageAlt: "Modern website displayed across laptop and mobile devices",
    imagePlaceholder: "Modern website displayed across laptop and mobile devices",
    imageCategory: "Web Development",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    shortName: "Mobile Apps",
    tagline: "Native and cross-platform mobile apps",
    icon: Smartphone,
    shortDescription:
      "Android and iOS applications with intuitive interfaces and dependable performance.",
    overview:
      "We build mobile applications that people love to use. Whether native Android and iOS or cross-platform, our apps combine clean UX, solid performance and secure back-ends to put your services directly in your customers' hands.",
    features: [
      "Android applications",
      "iOS applications",
      "Cross-platform apps",
      "Progressive Web Apps",
      "Secure API back-ends",
      "App store deployment support",
    ],
    outcomes: [
      "Reach customers on any device",
      "Deliver a smooth, branded experience",
      "Enable services on the go",
    ],
    imageAlt: "Mobile application interface on a smartphone",
    imagePlaceholder: "Mobile application interface / app screens",
    imageCategory: "Mobile App Development",
  },
  {
    slug: "pos-and-business-systems",
    name: "POS & Business Systems",
    shortName: "POS Systems",
    tagline: "Sell smarter, manage everything in one place",
    icon: ShoppingCart,
    shortDescription:
      "Modern Point of Sale and business management systems for retail, hospitality and services.",
    overview:
      "Our POS and business management systems help you run day-to-day operations with confidence — from sales and inventory to reporting and analytics. Designed for shops, supermarkets, restaurants and service businesses that need speed, accuracy and clear insight.",
    features: [
      "Point of Sale (POS) terminals",
      "Inventory & stock control",
      "Sales & revenue reporting",
      "Multi-branch management",
      "Customer & loyalty tracking",
      "Real-time analytics dashboards",
    ],
    outcomes: [
      "Speed up checkout and reduce errors",
      "Know your stock and sales in real time",
      "Manage multiple branches centrally",
    ],
    imageAlt: "Point of Sale system interface displayed in a retail environment",
    imagePlaceholder: "POS system interface in a retail environment",
    imageCategory: "POS Systems",
  },
  {
    slug: "graphic-and-digital-design",
    name: "Graphic & Digital Design",
    shortName: "Design",
    tagline: "Brand identity that stands out",
    icon: PenTool,
    shortDescription:
      "Logo design, corporate branding, marketing graphics and UI/UX that elevate your brand.",
    overview:
      "Great technology deserves great design. Our creative team crafts memorable brand identities, marketing materials and product interfaces — from logos and corporate branding to social graphics and polished UI/UX for your digital products.",
    features: [
      "Logo design",
      "Corporate branding",
      "Marketing posters",
      "Social media graphics",
      "Product advertisements",
      "UI/UX design",
    ],
    outcomes: [
      "Build a consistent, professional brand",
      "Stand out across every channel",
      "Delight users with intuitive interfaces",
    ],
    imageAlt: "Branding materials, posters and digital designs laid out",
    imagePlaceholder: "Branding materials, posters and digital designs",
    imageCategory: "Graphic Design",
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    shortName: "Social Media",
    tagline: "Grow and engage your audience",
    icon: Share2,
    shortDescription:
      "Content creation, community management and social advertising that build real engagement.",
    overview:
      "We help brands stay active, relevant and engaging online. From content planning and creation to community management and paid social campaigns, we grow your audience and keep your brand top of mind.",
    features: [
      "Social media management",
      "Content creation",
      "Community management",
      "Social media advertising",
      "Content calendars",
      "Performance reporting",
    ],
    outcomes: [
      "Grow a loyal, engaged following",
      "Stay consistent across platforms",
      "Turn followers into customers",
    ],
    imageAlt: "Social media analytics and marketing campaign dashboard",
    imagePlaceholder: "Social media analytics and marketing campaign dashboard",
    imageCategory: "Digital Marketing",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortName: "Marketing",
    tagline: "Campaigns that drive measurable growth",
    icon: Megaphone,
    shortDescription:
      "Data-driven digital marketing campaigns, brand strategy and business promotion.",
    overview:
      "We plan and run digital marketing campaigns that deliver measurable results. Combining brand strategy, targeted advertising and performance analytics, we help you reach the right audience and grow your business online.",
    features: [
      "Digital marketing campaigns",
      "Brand strategy",
      "Search & social advertising",
      "Business promotion",
      "Analytics & reporting",
      "Conversion optimization",
    ],
    outcomes: [
      "Reach the right audience efficiently",
      "Generate qualified leads and sales",
      "Track ROI with clear reporting",
    ],
    imageAlt: "Digital marketing campaign performance dashboard",
    imagePlaceholder: "Digital marketing campaign and analytics",
    imageCategory: "Digital Marketing",
  },
  {
    slug: "computer-hardware-supply",
    name: "Computer Hardware Supply",
    shortName: "Hardware",
    tagline: "Reliable IT equipment, professionally installed",
    icon: MonitorSmartphone,
    shortDescription:
      "Supply of computers, laptops, printers, accessories and networking equipment.",
    overview:
      "We supply quality computers, laptops, printers, accessories and networking equipment — with professional installation and setup. Get dependable hardware from a partner who understands the full technology picture.",
    features: [
      "Computers & laptops",
      "Computer accessories",
      "Printers",
      "Networking equipment",
      "IT equipment supply",
      "Hardware installation",
    ],
    outcomes: [
      "Source reliable, right-fit equipment",
      "Get set up quickly and correctly",
      "Buy from a single trusted partner",
    ],
    imageAlt: "Computers, laptops and IT equipment ready for supply",
    imagePlaceholder: "Computers, laptops and IT equipment",
    imageCategory: "Hardware Supply",
  },
  {
    slug: "networking-solutions",
    name: "Networking Solutions",
    shortName: "Networking",
    tagline: "Networks built for performance and uptime",
    icon: Network,
    shortDescription:
      "LAN and WAN installation, network infrastructure, routing and configuration.",
    overview:
      "We design, install and configure robust network infrastructure for businesses and institutions. From structured cabling and LAN/WAN setup to routing and configuration, we build networks that are fast, secure and dependable.",
    features: [
      "LAN & WAN installation",
      "Network infrastructure",
      "Structured cabling",
      "Router & switch configuration",
      "Business & institutional networking",
      "Network security setup",
    ],
    outcomes: [
      "Keep everyone reliably connected",
      "Reduce downtime and bottlenecks",
      "Build a secure network foundation",
    ],
    imageAlt: "Network cables, switches and routing infrastructure in a server room",
    imagePlaceholder: "Network cables, switches, routers and infrastructure",
    imageCategory: "Networking",
  },
  {
    slug: "wireless-connectivity-solutions",
    name: "Wireless Connectivity Solutions",
    shortName: "Wireless",
    tagline: "Seamless Wi-Fi, everywhere it matters",
    icon: Wifi,
    shortDescription:
      "Wi-Fi installation, wireless solutions and access point deployment for full coverage.",
    overview:
      "Powered by our WiFi Chap Chap brand, we deliver reliable wireless connectivity for offices, institutions and public spaces. We design and install Wi-Fi networks and access points that provide strong, seamless coverage across your premises.",
    features: [
      "Wi-Fi network installation",
      "Wireless network solutions",
      "Access point installation",
      "Wireless coverage planning",
      "Hotspot & guest access",
      "Wireless network management",
    ],
    outcomes: [
      "Enjoy strong coverage in every corner",
      "Connect more users without slowdowns",
      "Manage access securely and simply",
    ],
    imageAlt: "Wi-Fi access points and wireless connectivity across a modern space",
    imagePlaceholder: "Wi-Fi access points and wireless connectivity",
    imageCategory: "Wireless Connectivity",
  },
  {
    slug: "it-consultancy",
    name: "IT Consultancy",
    shortName: "Consultancy",
    tagline: "Expert guidance for confident decisions",
    icon: Lightbulb,
    shortDescription:
      "Technology advisory services that align your IT investments with business goals.",
    overview:
      "We help organizations make smart technology decisions. Our consultants assess your needs, recommend the right solutions and create a clear roadmap — so every IT investment moves your business forward.",
    features: [
      "IT consultancy",
      "Technology advisory services",
      "IT strategy & roadmaps",
      "Digital transformation planning",
      "Systems assessment",
      "Vendor & solution selection",
    ],
    outcomes: [
      "Invest in the right technology",
      "Reduce risk and avoid costly mistakes",
      "Get a clear path to transformation",
    ],
    imageAlt: "Technology consultant discussing a digital solution with a client",
    imagePlaceholder: "Technology consultant discussing a solution with a client",
    imageCategory: "IT Consultancy",
  },
  {
    slug: "it-maintenance-and-support",
    name: "IT Maintenance & Support",
    shortName: "Support",
    tagline: "Keep everything running, always",
    icon: Wrench,
    shortDescription:
      "System maintenance, troubleshooting and infrastructure support that keeps you online.",
    overview:
      "Technology should just work. Our maintenance and support services keep your computers, networks and systems healthy — with proactive maintenance, fast troubleshooting and dependable infrastructure support.",
    features: [
      "System maintenance",
      "Computer maintenance",
      "Network troubleshooting",
      "IT infrastructure support",
      "Preventive maintenance",
      "Responsive technical support",
    ],
    outcomes: [
      "Minimize downtime and disruption",
      "Resolve issues quickly",
      "Extend the life of your equipment",
    ],
    imageAlt: "Technician maintaining computer and network infrastructure",
    imagePlaceholder: "Technician maintaining computer or network infrastructure",
    imageCategory: "IT Maintenance",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
