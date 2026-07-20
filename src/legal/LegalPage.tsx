"use client";

import { Footer, Navbar, PromoBar } from '@/components/layout';
import { Container } from '@/components/ui';

type LegalPageProps = {
  type: 'privacy' | 'terms';
};

const legalCopy = {
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'Your privacy matters to Vantins.',
    intro:
      'This page explains how Vantins handles personal information shared through our website, quote requests, support channels, and policy-related communications.',
    sections: [
      {
        title: 'Information we may collect',
        body:
          'We may collect contact details, insurance needs, quote information, communication preferences, and details required to help compare coverage or support an active policy.',
      },
      {
        title: 'How we use information',
        body:
          'We use information to respond to inquiries, prepare insurance quotes, support policy administration, communicate with clients, and improve our service experience.',
      },
      {
        title: 'Sharing and protection',
        body:
          'Vantins uses reasonable safeguards to protect personal data and only shares information when needed for service delivery, carrier communication, operational support, or legal requirements.',
      },
      {
        title: 'Your choices',
        body:
          'You may request updates to your communication preferences or ask questions about your information by contacting Vantins through the support channels listed on this site.',
      },
    ],
  },
  terms: {
    eyebrow: 'Terms and Conditions',
    title: 'Website use and communication terms.',
    intro:
      'These terms apply when you use the Vantins website, request information, submit a quote inquiry, or communicate with our team through digital channels.',
    sections: [
      {
        title: 'Informational use',
        body:
          'Website content is provided for general informational purposes and does not replace a formal insurance policy, carrier document, quote, binder, or licensed advisory conversation.',
      },
      {
        title: 'Quotes and coverage',
        body:
          'Insurance availability, pricing, eligibility, limits, exclusions, and terms depend on carrier underwriting, application details, and applicable legal requirements.',
      },
      {
        title: 'Communications consent',
        body:
          'By sharing your information, you authorize Vantins to contact you through phone, email, SMS, social media, or other appropriate channels related to your inquiry or policy needs.',
      },
      {
        title: 'Updates',
        body:
          'Vantins may update these terms as services, requirements, or website features evolve. Continued use of the website means you accept the current terms.',
      },
    ],
  },
};

export function LegalPage({ type }: LegalPageProps) {
  const copy = legalCopy[type];

  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <section className="bg-[#06182d] py-20 text-white lg:py-28">
          <Container>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
              {copy.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.75rem,5vw,60px)] font-extrabold leading-[1.02] tracking-tight text-balance">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/72">
              {copy.intro}
            </p>
          </Container>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <Container className="grid gap-6 md:grid-cols-2">
            {copy.sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-ink/10 bg-[#f7f8fa] p-7">
                <h2 className="text-xl font-bold text-ink">{section.title}</h2>
                <p className="mt-3 leading-relaxed text-ink/65">{section.body}</p>
              </article>
            ))}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
