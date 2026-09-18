import { getSiteSettings } from "@/lib/content";

/**
 * Organization + LocalBusiness + WebSite JSON-LD for SEO / rich results.
 * All values are sourced from the site settings in the database, so updating
 * contact details in the admin dashboard keeps this structured data correct.
 */
export async function StructuredData() {
  const site = await getSiteSettings();
  const logo = `${site.url}/logo-full.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        url: site.url,
        logo,
        image: logo,
        description: site.longDescription,
        email: site.email,
        telephone: site.phonePrimary,
        sameAs: site.socials.map((s) => s.href),
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${site.url}/#localbusiness`,
        name: site.legalName,
        url: site.url,
        image: logo,
        email: site.email,
        telephone: site.phonePrimary,
        priceRange: "$$",
        areaServed: { "@type": "Country", name: "Kenya" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Creadex Building",
          postOfficeBoxNumber: "8-40400",
          addressLocality: "Migori",
          addressCountry: "KE",
        },
        parentOrganization: { "@id": `${site.url}/#organization` },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "14:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.shortName,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
