import type { LucideIcon } from "lucide-react";
import {
  Store,
  UtensilsCrossed,
  Building2,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Landmark,
  HandHeart,
  Rocket,
} from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  // Image fields — replace with real imagery later.
  image?: string;
  imageAlt: string;
  imagePlaceholder: string;
  imageCategory: string;
};

export const industries: Industry[] = [
  {
    slug: "retail-supermarkets",
    name: "Retail & Supermarkets",
    icon: Store,
    description:
      "POS, inventory and analytics that speed up checkout and give clear visibility into sales and stock.",
    image: "/images/bansiui.png",
    imageAlt: "Modern supermarket technology and POS at checkout",
    imagePlaceholder: "Modern supermarket technology and POS",
    imageCategory: "Retail",
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants & Hospitality",
    icon: UtensilsCrossed,
    description:
      "Digital ordering, POS and management systems tailored for restaurants, cafés and hospitality.",
    image: "/images/hotelpos.jpg",
    imageAlt: "Restaurant using digital ordering technology",
    imagePlaceholder: "Restaurant using digital ordering technology",
    imageCategory: "Hospitality",
  },
  {
    slug: "sme",
    name: "Small & Medium Businesses",
    icon: Briefcase,
    description:
      "Affordable, scalable software, websites and IT support designed to help SMEs grow.",
    image: "/images/software-dashboard.jpeg",
    imageAlt: "Small business team using modern technology",
    imagePlaceholder: "SME team working with modern technology",
    imageCategory: "SME",
  },
  {
    slug: "corporates",
    name: "Corporates",
    icon: Building2,
    description:
      "Enterprise-grade software, networking and digital transformation for established organizations.",
    image: "/images/cabling2.png",
    imageAlt: "Professional corporate office technology environment",
    imagePlaceholder: "Professional office technology",
    imageCategory: "Corporate",
  },
  {
    slug: "education",
    name: "Schools & Institutions",
    icon: GraduationCap,
    description:
      "Digital learning tools, computer labs, campus networks and Wi-Fi for educational institutions.",
    image: "/images/cctvnetworking.jpg",
    imageAlt: "Digital learning and computer technology in a school",
    imagePlaceholder: "Digital learning and computer technology",
    imageCategory: "Education",
  },
  {
    slug: "ngos",
    name: "NGOs",
    icon: HandHeart,
    description:
      "Reliable, cost-effective technology and digital tools that help NGOs deliver greater impact.",
    image: "/images/ngo.jpg",
    imageAlt: "NGO team using technology for community programs",
    imagePlaceholder: "NGO team using technology for programs",
    imageCategory: "NGO",
  },
  {
    slug: "government",
    name: "Government & Public Institutions",
    icon: Landmark,
    description:
      "Secure systems, IT infrastructure and digital transformation for public-sector institutions.",
    image: "/images/kuppetfrontui.png",
    imageAlt: "Government digital transformation and IT infrastructure",
    imagePlaceholder: "Digital transformation and IT infrastructure",
    imageCategory: "Government",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    description:
      "Technology solutions that streamline operations and support better patient care.",
    image: "/images/hospital.jpg",
    imageAlt: "Healthcare technology in a modern facility",
    imagePlaceholder: "Healthcare technology",
    imageCategory: "Healthcare",
  },
  {
    slug: "startups",
    name: "Startups",
    icon: Rocket,
    description:
      "Fast, scalable MVPs, branding and digital foundations to help startups launch and grow.",
    image: "/images/printing.jpg",
    imageAlt: "Young entrepreneurs working with technology in a startup",
    imagePlaceholder: "Young entrepreneurs working with technology",
    imageCategory: "Startups",
  },
];
