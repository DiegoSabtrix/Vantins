import { useEffect, useState } from 'react';
import { Logo, LinkButton, Button } from '@/components/ui';
import { IconChevronDown, IconClose } from '@/components/icons';
import { useLockBodyScroll } from '@/hooks';
import { useT } from '@/i18n';
import { LanguageToggle } from './LanguageToggle';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Static, full-height navigation for small screens. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useT();
  const [expanded, setExpanded] = useState<string | null>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) {
      setExpanded(null);
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const links = t.nav.filter((item) => !item.cta);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-black/60 xl:hidden"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed inset-0 z-[71] flex h-dvh w-full max-w-sm flex-col overflow-hidden border-l border-white/10 bg-black text-white shadow-float xl:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
          <Logo invert />
          <Button
            variant="ghost"
            size="sm"
            className="!px-2 text-white hover:!bg-white/10"
            aria-label="Close menu"
            onClick={onClose}
          >
            <IconClose className="h-6 w-6" />
          </Button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((item) => (
              <li key={item.label}>
                {item.menu ? (
                  <button
                    type="button"
                    onClick={() => setExpanded((current) => current === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-white transition-colors hover:bg-white/10"
                    aria-expanded={expanded === item.label}
                  >
                    {item.label}
                    <IconChevronDown className={`h-4 w-4 ${expanded === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                )}
                {item.menu && expanded === item.label && (
                  <ul className="mb-1 ml-3 border-l border-white/10 pl-4">
                    {item.menu.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-white/10 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="flex justify-center">
            <LanguageToggle />
          </div>
          <LinkButton href="/get-quote" variant="primary" fullWidth onClick={onClose}>
            {t.promo.cta}
          </LinkButton>
        </div>
      </aside>
    </>
  );
}
