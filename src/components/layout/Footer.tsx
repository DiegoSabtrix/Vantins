import { Container, Logo } from '@/components/ui';
import { useT } from '@/i18n';

const SOCIALS = ['X', 'in', 'f', 'IG'];

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo invert />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={`Vantins on ${s}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-xs font-bold text-white/70 transition-colors hover:border-brand-400 hover:text-brand-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {t.footer.columns.map((col) => (
              <div key={col.heading}>
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
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-white/45">
            {t.footer.copyright.replace('{year}', String(year))}
          </p>
        </div>
      </Container>
    </footer>
  );
}
