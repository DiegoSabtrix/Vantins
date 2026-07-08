import { AnimatePresence, motion } from 'framer-motion';
import { Logo, LinkButton, Button } from '@/components/ui';
import { IconClose } from '@/components/icons';
import { useLockBodyScroll } from '@/hooks';
import { useT } from '@/i18n';
import { LanguageToggle } from './LanguageToggle';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-height slide-in navigation for small screens. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useT();
  useLockBodyScroll(open);

  const links = t.nav.filter((item) => !item.cta);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-black text-white shadow-float xl:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
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

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              <ul className="space-y-1">
                {links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-xl px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                    {item.menu && (
                      <ul className="mb-1 ml-3 border-l border-white/10 pl-4">
                        {item.menu.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              onClick={onClose}
                              className="block rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:text-white"
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

            <div className="space-y-3 border-t border-white/10 p-5">
              <div className="flex justify-center">
                <LanguageToggle />
              </div>
              <LinkButton href="#pricing" variant="primary" fullWidth onClick={onClose}>
                {t.promo.cta}
              </LinkButton>
              <LinkButton
                href="#"
                variant="outline"
                fullWidth
                onClick={onClose}
                className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10"
              >
                {t.common.signIn}
              </LinkButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
