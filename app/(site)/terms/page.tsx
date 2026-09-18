import type { Metadata } from "next";
import { LegalLayout, type LegalBlock } from "@/components/sections/LegalLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing the use of the BOJ Technologies Limited website and services.",
  alternates: { canonical: "/terms" },
};

const sections: LegalBlock[] = [
  {
    heading: "1. Agreement to Terms",
    paragraphs: [
      `These Terms and Conditions ("Terms") govern your access to and use of the website and services provided by BOJ Technologies Limited ("we", "us" or "our"). By accessing our website or engaging our services, you agree to be bound by these Terms.`,
    ],
  },
  {
    heading: "2. Services",
    paragraphs: [
      "BOJ Technologies Limited provides technology services including software development, web and mobile application development, graphic and digital design, digital marketing, computer hardware supply, networking, wireless connectivity, IT consultancy and maintenance.",
      "The specific scope, deliverables, timelines and fees for any engagement will be defined in a separate proposal, quotation or agreement.",
    ],
  },
  {
    heading: "3. Quotations and Payments",
    bullets: [
      "Quotations are valid for the period stated in the quotation.",
      "Payment terms will be agreed in writing before work commences.",
      "Unless otherwise agreed, invoices are payable within the timeframe specified on the invoice.",
    ],
  },
  {
    heading: "4. Intellectual Property",
    paragraphs: [
      "Upon full payment, ownership of custom deliverables created specifically for a client transfers to that client, unless otherwise agreed in writing. We retain ownership of our pre-existing tools, frameworks, methodologies and any third-party components, which may be licensed for use within the deliverables.",
      "All content on this website, including text, graphics, logos and design, is the property of BOJ Technologies Limited and is protected by applicable laws.",
    ],
  },
  {
    heading: "5. Client Responsibilities",
    bullets: [
      "Provide accurate information and timely feedback required to complete the work.",
      "Ensure you have the rights to any materials you provide to us.",
      "Use our services and any supplied systems lawfully and as intended.",
    ],
  },
  {
    heading: "6. Warranties and Support",
    paragraphs: [
      "We deliver our services with reasonable skill and care. Warranty and support terms for specific solutions will be set out in the relevant agreement. Ongoing maintenance and support may be provided under a separate support arrangement.",
    ],
  },
  {
    heading: "7. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, BOJ Technologies Limited shall not be liable for any indirect, incidental or consequential loss arising from the use of our website or services. Our total liability for any claim shall not exceed the fees paid for the relevant service.",
    ],
  },
  {
    heading: "8. Third-Party Services",
    paragraphs: [
      "Our solutions may integrate with or rely on third-party services and products. We are not responsible for the availability, performance or terms of such third-party services.",
    ],
  },
  {
    heading: "9. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the courts of Kenya.",
    ],
  },
  {
    heading: "10. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "11. Contact Us",
    paragraphs: [
      `For any questions about these Terms, please contact us at ${site.email} or call ${site.phonePrimary}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="Please read these terms carefully. They govern your use of our website and services."
      updated="5 September 2026"
      sections={sections}
    />
  );
}
