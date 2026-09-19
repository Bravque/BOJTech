import type { LucideIcon } from "lucide-react";
import {
  Lightbulb,
  ShieldCheck,
  Gauge,
  Award,
  HeartHandshake,
  TrendingUp,
  Sparkles,
  Users,
  Layers,
  LifeBuoy,
  Rocket,
  Target,
} from "lucide-react";

export const site = {
  name: "BOJ Technologies Limited",
  shortName: "BOJ Technologies",
  legalName: "BOJ Technologies Limited",
  tagline: "Technology Solutions Built for Growth",
  description:
    "BOJ Technologies Limited delivers innovative software, digital, networking and technology solutions for modern businesses.",
  longDescription:
    "BOJ Technologies Limited is an Information and Communication Technology company providing innovative digital, software, hardware, networking and technology solutions to businesses, organizations, institutions and individuals.",
  url: "https://bojtechnologies.com",
  email: "info@bojtechnologies.com",
  salesEmail: "inforbrav@gmail.com",
  phonePrimary: "+254 798 942 939",
  phoneSecondary: "",
  location: "Migori, Kenya",
  addressLines: ["Creadex Building", "P.O. Box 8-40400", "Migori, Kenya"],
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { days: "Saturday", time: "9:00 AM – 2:00 PM" },
    { days: "Sunday & Public Holidays", time: "Closed (Emergency support available)" },
  ],
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Twitter / X", href: "https://twitter.com/", icon: "twitter" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
];

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export type Value = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const coreValues: Value[] = [
  {
    title: "Innovation",
    description:
      "We embrace new ideas and emerging technology to build solutions that keep our clients ahead of the curve.",
    icon: Lightbulb,
  },
  {
    title: "Integrity",
    description:
      "We are honest, transparent and accountable in every engagement, earning trust through consistent delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Reliability",
    description:
      "We build dependable systems and offer support our clients can count on, day in and day out.",
    icon: Gauge,
  },
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest professional standards in design, engineering and service delivery.",
    icon: Award,
  },
  {
    title: "Customer Focus",
    description:
      "We listen first, then tailor technology around the real goals and workflows of each client.",
    icon: HeartHandshake,
  },
  {
    title: "Continuous Improvement",
    description:
      "We keep learning, refining and upgrading so our solutions grow stronger over time.",
    icon: TrendingUp,
  },
];

export type WhyChoose = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyChoose: WhyChoose[] = [
  {
    title: "Innovative Solutions",
    description:
      "Modern, future-ready technology designed around measurable business outcomes — not buzzwords.",
    icon: Sparkles,
  },
  {
    title: "Professional Team",
    description:
      "Skilled engineers, designers and consultants who bring discipline and craft to every project.",
    icon: Users,
  },
  {
    title: "Reliable Technology",
    description:
      "Robust, secure and well-tested systems built on proven, production-grade foundations.",
    icon: ShieldCheck,
  },
  {
    title: "Tailored Solutions",
    description:
      "Every solution is shaped around your specific workflows, industry and growth ambitions.",
    icon: Target,
  },
  {
    title: "End-to-End Support",
    description:
      "From strategy and build to deployment and maintenance, we stay with you across the journey.",
    icon: LifeBuoy,
  },
  {
    title: "Scalable Systems",
    description:
      "Architectures designed to grow with you — from a single branch to nationwide operations.",
    icon: Layers,
  },
  {
    title: "Customer-Focused Approach",
    description:
      "Clear communication, honest timelines and a genuine partnership at every stage.",
    icon: HeartHandshake,
  },
  {
    title: "Growth Enablement",
    description:
      "Technology that helps you operate smarter, connect better and grow faster.",
    icon: Rocket,
  },
];

export const stats = [
  { value: "12", suffix: "+", label: "Technology services under one roof", shortLabel: "Technology services" },
  { value: "5", suffix: "", label: "Specialist product brands", shortLabel: "Product brands" },
  { value: "9", suffix: "+", label: "Industries served across Kenya", shortLabel: "Industries served" },
  { value: "100", suffix: "%", label: "Commitment to client success", shortLabel: "Client commitment" },
];
