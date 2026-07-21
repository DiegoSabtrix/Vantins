import type { Metadata } from "next";
import "../src/index.css";

const siteUrl = "https://vantins-website.diego681936.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vantins | Commercial Truck Insurance Made Simple",
    template: "%s",
  },
  description:
    "Vantins helps owner-operators and trucking fleets compare multiple insurance carriers for commercial truck, cargo, physical damage, liability, and workers' comp coverage.",
  applicationName: "Vantins",
  authors: [{ name: "Vantins" }],
  creator: "Vantins",
  publisher: "Vantins",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "insurance",
  openGraph: {
    title: "Vantins | Commercial Truck Insurance Made Simple",
    description:
      "Compare trucking insurance options for owner-operators and fleets with licensed Vantins advisors.",
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
    title: "Vantins | Commercial Truck Insurance Made Simple",
    description:
      "Commercial truck insurance guidance for owner-operators, fleets, cargo, physical damage, liability, and workers' comp.",
    images: ["/vantins-insurance-logo.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
