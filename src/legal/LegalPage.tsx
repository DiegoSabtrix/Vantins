"use client";

import { Footer, Navbar, PromoBar } from '@/components/layout';
import { Container } from '@/components/ui';
import { LanguageProvider } from '@/i18n';

type LegalPageProps = {
  type: 'privacy' | 'terms';
};

const legalCopy = {
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'Privacy Policy',
    intro:
      'This Privacy Policy explains how Vantins collects, uses, protects, and shares information provided through our website, quote forms, calls, messages, support channels, and policy-related communications.',
    sections: [
      {
        title: 'Information we collect',
        body:
          'We may collect your name, phone number, email address, mailing address, insurance needs, quote details, business information, vehicle or fleet details, communication preferences, and other information you choose to provide.',
      },
      {
        title: 'How we use your information',
        body:
          'We use information to respond to inquiries, prepare and compare insurance quotes, support applications and policy administration, communicate with you, improve our services, and comply with legal or regulatory obligations.',
      },
      {
        title: 'When information is shared',
        body:
          'We may share information with insurance carriers, licensed agents, service providers, operational partners, or legal authorities when needed to provide services, process requests, support policies, or meet legal requirements.',
      },
      {
        title: 'Communication choices',
        body:
          'By submitting your information, you authorize Vantins to contact you by phone, email, SMS, social media, or other channels related to your inquiry or policy needs. You may request to update your preferences or opt out where applicable.',
      },
      {
        title: 'Data protection',
        body:
          'Vantins uses reasonable administrative, technical, and organizational safeguards to protect personal information. No online transmission or storage system can be guaranteed to be completely secure.',
      },
      {
        title: 'Contact us',
        body:
          'If you have questions about this Privacy Policy or your personal information, please contact Vantins through the support or contact channels listed on this website.',
      },
    ],
  },
  terms: {
    eyebrow: 'Terms and Conditions',
    title: 'Terms and Conditions',
    intro:
      'These Terms and Conditions apply when you access the Vantins website, request a quote, submit information, or communicate with our team through digital or offline channels.',
    sections: [
      {
        title: 'Website information',
        body:
          'The information on this website is provided for general informational purposes only. It does not replace a formal insurance quote, policy, binder, carrier document, or licensed advisory conversation.',
      },
      {
        title: 'Quotes and coverage',
        body:
          'Insurance availability, pricing, eligibility, limits, exclusions, and policy terms depend on carrier underwriting, application information, state requirements, and applicable law. Submitting a request does not guarantee coverage.',
      },
      {
        title: 'Communications consent',
        body:
          'By sharing your information, you authorize Vantins to contact you by telephone, email, SMS text message, social media, and other appropriate communication channels related to your inquiry, quote, application, or policy needs.',
      },
      {
        title: 'Third-party services',
        body:
          'This website may reference insurance carriers, partners, tools, links, or third-party services. Vantins is not responsible for third-party websites, policies, products, pricing, or decisions.',
      },
      {
        title: 'User responsibilities',
        body:
          'You agree to provide accurate and current information when requesting quotes or services. Inaccurate, incomplete, or outdated information may affect eligibility, pricing, coverage, or service delivery.',
      },
      {
        title: 'Changes to these terms',
        body:
          'Vantins may update these Terms and Conditions as services, requirements, or website features evolve. Continued use of the website means you accept the current version.',
      },
    ],
  },
};

export function LegalPage({ type }: LegalPageProps) {
  return (
    <LanguageProvider>
      <LegalPageContent type={type} />
    </LanguageProvider>
  );
}

function LegalPageContent({ type }: LegalPageProps) {
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
          <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-ink/10 bg-[#f7f8fa] p-7">
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
