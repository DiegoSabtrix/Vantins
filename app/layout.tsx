import type { Metadata } from "next";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Vantins",
  description: "Smart business tools designed to help your company grow.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
