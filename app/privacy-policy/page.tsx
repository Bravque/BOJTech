import type { Metadata } from "next";
import { LegalLayout, type LegalBlock } from "@/components/sections/LegalLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BOJ Technologies Limited collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalBlock[] = [
  {
    heading: "1. Introduction",
    paragraphs: [
      `BOJ Technologies Limited ("we", "us" or "our") is committed to protecting the privacy of everyone who interacts with us. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website or use our services.`,
      "By using our website and services, you consent to the practices described in this policy.",
    ],
  },
  {
    heading: "2. Information We Collect",
    paragraphs: ["We may collect the following types of information:"],
    bullets: [
      "Contact details you provide, such as your name, email address, phone number and company name.",
      "Project and enquiry information you share when requesting a quote or consultation.",
      "Technical information such as your IP address, browser type and pages visited, collected automatically to improve our website.",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    paragraphs: ["We use the information we collect to:"],
    bullets: [
      "Respond to your enquiries and provide the services you request.",
      "Prepare quotes, proposals and project documentation.",
      "Communicate with you about your projects and our services.",
      "Improve our website, services and customer experience.",
      "Comply with legal and regulatory obligations.",
    ],
  },
  {
    heading: "4. How We Protect Your Information",
    paragraphs: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure or destruction. While we take reasonable steps to safeguard your data, no method of transmission over the internet is completely secure.",
    ],
  },
  {
    heading: "5. Sharing Your Information",
    paragraphs: [
      "We do not sell your personal information. We may share information with trusted service providers who assist us in operating our business, subject to confidentiality obligations, or where required by law.",
    ],
  },
  {
    heading: "6. Your Rights",
    paragraphs: [
      "You have the right to access, correct or request deletion of your personal information, and to object to or restrict certain processing. To exercise these rights, please contact us using the details below.",
    ],
  },
  {
    heading: "7. Cookies",
    paragraphs: [
      "Our website may use cookies and similar technologies to enhance your browsing experience and analyze site usage. You can control cookies through your browser settings.",
    ],
  },
  {
    heading: "8. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised update date.",
    ],
  },
  {
    heading: "9. Contact Us",
    paragraphs: [
      `If you have any questions about this Privacy Policy or how we handle your information, please contact us at ${site.email} or call ${site.phonePrimary}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains how BOJ Technologies Limited handles your information."
      updated="5 September 2026"
      sections={sections}
    />
  );
}
