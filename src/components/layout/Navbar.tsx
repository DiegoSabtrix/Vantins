import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Logo, Button, LinkButton } from '@/components/ui';
import { IconChevronDown, IconMenu } from '@/components/icons';
import { NAV_ITEMS } from '@/utils/constants';
import { useScrolled } from '@/hooks';
import type { NavItem } from '@/types';
import { cn } from '@/utils/cn';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const scrolled = useScrolled(8);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-shadow duration-300',
        scrolled
          ? 'border-b border-ink/10 bg-white/90 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-white',
      )}
    >
      <Container>
        <nav
          className="flex h-16 items-center justify-between gap-4 lg:h-[72px]"
          aria-label="Primary"
        >
          <a href="#top" className="shrink-0" aria-label="QuickBooks home">
            <Logo />
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavBarItem
                key={item.label}
                item={item}
                isOpen={openMenu === item.label}
                onOpen={() => setOpenMenu(item.label)}
                onClose={() => setOpenMenu((cur) => (cur === item.label ? null : cur))}
              />
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <LinkButton href="#" variant="ghost" size="sm">
              Sign in
            </LinkButton>
            <LinkButton href="#pricing" variant="primary" size="sm">
              Start free trial
            </LinkButton>
          </div>

          {/* Mobile trigger */}
          <Button
            variant="ghost"
            size="sm"
            className="!px-2 lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <IconMenu className="h-6 w-6" />
          </Button>
        </nav>
      </Container>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

interface NavBarItemProps {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function NavBarItem({ item, isOpen, onOpen, onClose }: NavBarItemProps) {
  if (!item.menu) {
    return (
      <li>
        <a
          href={item.href}
          className="inline-flex items-center rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:bg-ink/5"
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:bg-ink/5"
        aria-expanded={isOpen}
        onFocus={onOpen}
      >
        {item.label}
        <IconChevronDown
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full pt-3"
          >
            <div className="grid w-max min-w-[22rem] grid-cols-2 gap-x-8 gap-y-2 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
              {item.menu.map((col) => (
                <div key={col.heading}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    {col.heading}
                  </p>
                  <ul className="space-y-1">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="block rounded-lg px-2 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-subtle hover:text-ink"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
