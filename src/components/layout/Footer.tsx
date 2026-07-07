import { Container, Logo } from '@/components/ui';
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from '@/utils/constants';

const SOCIALS = ['X', 'in', 'f', 'IG'];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-surface-sand">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Smart tools to run your business — accounting, invoicing, payments,
              and payroll, together in one place.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={`QuickBooks on ${s}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-xs font-bold text-ink-soft transition-colors hover:border-brand-500 hover:text-brand-600"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-semibold text-ink">{col.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-muted">
            © {year} QuickBooks UI recreation. Built for educational purposes — not
            affiliated with or endorsed by Intuit Inc.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
