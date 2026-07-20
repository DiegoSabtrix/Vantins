"use client";

import App from "@/App";
import { LanguageProvider } from "@/i18n";

export default function Home() {
  return <LanguageProvider><App /></LanguageProvider>;
}
