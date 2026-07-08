import { PromoBar, Navbar, Footer } from '@/components/layout';
import {
  Hero,
  HighlightBand,
  TrustBar,
  Features,
  ProductShowcase,
  Stats,
  Testimonials,
  Pricing,
  Faq,
  CtaBanner,
} from '@/sections';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <PromoBar />
      <Navbar />

      <main id="main">
        <Hero />
        <HighlightBand />
        <Features />
        <ProductShowcase />
        <Stats />
        <Testimonials />
        <TrustBar />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
