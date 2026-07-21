"use client";

import App from "@/App";
import { LanguageProvider } from "@/i18n";

export function HomePage() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
