import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/content";

// The app reads company content from the database (metadata, footer, etc.), so
// it renders dynamically. This cascades to every route and makes content edits
// appear instantly.
export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.shortName} | ${site.tagline}`,
      template: `%s | ${site.shortName}`,
    },
    description: site.description,
    keywords: [
      "BOJ Technologies",
      "software development Kenya",
      "web development Migori",
      "mobile app development",
      "POS systems Kenya",
      "networking solutions",
      "Wi-Fi installation",
      "IT consultancy",
      "digital marketing Kenya",
      "graphic design",
      "IT support Kenya",
    ],
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    openGraph: {
      type: "website",
      locale: "en_KE",
      url: site.url,
      siteName: site.shortName,
      title: `${site.shortName} | ${site.tagline}`,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.shortName} | ${site.tagline}`,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
