import type { Metadata } from "next";
import { HomePage } from "@/HomePage";

const siteUrl = "https://vantins-website.diego681936.chatgpt.site";

export const metadata: Metadata = {
  title: "Commercial Truck Insurance for Owner-Operators & Fleets | Vantins",
  description:
    "Compare commercial truck insurance from multiple carriers with Vantins. Get owner-operator, fleet, cargo, physical damage, general liability, and workers' comp coverage guidance.",
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "commercial truck insurance",
    "trucking insurance",
    "owner-operator insurance",
    "fleet insurance",
    "cargo insurance",
    "physical damage coverage",
    "general liability trucking",
    "workers comp trucking",
    "truck insurance quote",
    "Vantins insurance",
  ],
  openGraph: {
    title: "Commercial Truck Insurance for Owner-Operators & Fleets | Vantins",
    description:
      "Vantins helps truckers compare carriers and find trucking insurance built for trucks, cargo, drivers, and growing fleets.",
    url: siteUrl,
    siteName: "Vantins",
    images: [
      {
        url: "/vantins-insurance-logo.png",
        width: 2047,
        height: 512,
        alt: "Vantins commercial truck insurance agency logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Truck Insurance for Owner-Operators & Fleets | Vantins",
    description:
      "Compare owner-operator, fleet, cargo, physical damage, general liability, and workers' comp coverage with Vantins.",
    images: ["/vantins-insurance-logo.png"],
  },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "InsuranceAgency",
      "@id": `${siteUrl}/#insurance-agency`,
      name: "Vantins",
      url: siteUrl,
      logo: `${siteUrl}/vantins-insurance-logo.png`,
      image: `${siteUrl}/vantins-insurance-logo.png`,
      description:
        "Vantins is a commercial trucking insurance agency helping owner-operators and fleets compare multiple carriers for trucking coverage.",
      areaServed: "United States",
      serviceType: [
        "Commercial Truck Insurance",
        "Owner-Operator Insurance",
        "Fleet Insurance",
        "Cargo Insurance",
        "Physical Damage Coverage",
        "General Liability",
        "Workers' Compensation",
      ],
      knowsAbout: [
        "trucking insurance",
        "commercial truck insurance",
        "motor truck cargo",
        "physical damage coverage",
        "fleet liability",
        "workers compensation for trucking",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Vantins",
      url: siteUrl,
      inLanguage: "en-US",
      publisher: {
        "@id": `${siteUrl}/#insurance-agency`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#home`,
      url: siteUrl,
      name: "Commercial Truck Insurance for Owner-Operators & Fleets | Vantins",
      description:
        "Compare owner-operator, fleet, cargo, physical damage, general liability, and workers' comp trucking insurance coverage with Vantins.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#insurance-agency`,
      },
      primaryImageOfPage: `${siteUrl}/vantins-insurance-logo.png`,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      <HomePage />
    </>
  );
}
