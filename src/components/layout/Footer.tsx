import { Container, Logo } from '@/components/ui';
import { useT } from '@/i18n';

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/vantinsprotection/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M14 8.1h2.4V4.2A30 30 0 0 0 12.9 4c-3.5 0-5.8 2.1-5.8 6v3.4H3.2v4.4h3.9V24h4.8v-6.2h3.8l.6-4.4h-4.4v-3c0-1.3.3-2.3 2.1-2.3Z" />
      </svg>
    ),
    className: 'bg-[#1877F2] text-white',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/vantinsprotection/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.6" cy="7.4" r="0.9" className="fill-current stroke-none" />
      </svg>
    ),
    className: 'bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_16%,#fd5949_42%,#d6249f_68%,#285AEB_100%)] text-white',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@vantinsprotection',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M16.6 4c.4 2.3 1.7 3.7 4 4v4.1a8.1 8.1 0 0 1-4-1.1v5.8c0 3.8-2.6 6.2-6.2 6.2-3.4 0-6.1-2.4-6.1-5.7 0-3.6 2.8-5.9 6.8-5.7v4.2c-1.7-.3-2.7.4-2.7 1.5 0 1 .8 1.6 1.8 1.6 1.2 0 2-.7 2-2.4V4h4.4Z" />
      </svg>
    ),
    className: 'bg-[#0f0f0f] text-white shadow-[inset_2px_0_0_#25F4EE,inset_-2px_0_0_#FE2C55]',
  },
  {
    label: 'X',
    href: 'https://x.com/Vantinsprotec',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M14.4 10.2 22 1.5h-1.8l-6.6 7.6-5.3-7.6H2.2l8 11.4-8 9.4H4l7-8.2 5.7 8.2h6.1l-8.4-12.1Zm-2.5 2.9-.8-1.1L4.6 2.9h2.8l5.2 7.3.8 1.1 6.8 9.6h-2.8l-5.5-7.8Z" />
      </svg>
    ),
    className: 'bg-white text-black',
  },
];

const FOOTER_DISCLAIMER =
  'By sharing my personal information, I, the undersigned, hereby grant explicit consent to Vantins – USA Specialty Insurance to initiate contact with me via telephone, electronic mail, SMS text messages, social media platforms, and any other applicable communication channels, as required for the efficient administration and management of my insurance policy. I recognize and affirm that these communications are vital to ensure that the services provided by Vantins LLC are executed with the necessary diligence and promptness to meet my needs effectively. Vantins is committed to safeguarding my personal data with advanced security measures, maintaining privacy and preventing unauthorized access. I retain the option to modify my communication preferences or withdraw my consent at any time by notifying Vantins through designated channels. Furthermore, Vantins assures that my personal information will only be shared with third parties when essential for service provision or as mandated by legal requirements, and always with my explicit consent.';

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 overflow-hidden sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_repeat(4,minmax(0,1fr))]">
          <div className="min-w-0">
            <Logo invert />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`Vantins on ${social.label}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 ring-white/20 transition-transform hover:-translate-y-0.5 hover:ring-brand-300 ${social.className}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {t.footer.columns.map((col) => (
            <div key={col.heading} className="min-w-0">
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-brand-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-6xl text-xs leading-relaxed text-white/45">
            {FOOTER_DISCLAIMER}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold">
            <a href="/privacy-policy" className="text-white/60 transition-colors hover:text-brand-300">
              Privacy policy
            </a>
            <a href="/terms-and-conditions" className="text-white/60 transition-colors hover:text-brand-300">
              Terms and conditions
            </a>
          </div>
          <p className="mt-6 text-xs text-white/45">
            {t.footer.copyright.replace('{year}', String(year))}
          </p>
        </div>
      </Container>
    </footer>
  );
}
