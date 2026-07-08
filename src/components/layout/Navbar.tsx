import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Logo, Button } from '@/components/ui';
import { IconChevronDown, IconMenu } from '@/components/icons';
import { NAV_ITEMS, SALES_PHONE } from '@/utils/constants';
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
        'sticky top-0 z-50 bg-black transition-shadow duration-300',
        scrolled
          ? 'border-b border-white/10 bg-black/90 shadow-sm backdrop-blur-md'
          : 'border-b border-white/10',
      )}
    >
      <Container>
        <nav
          className="flex h-16 items-center justify-between gap-4 lg:h-[72px]"
          aria-label="Primary"
        >
          <a href="#top" className="shrink-0" aria-label="Vantins home">
            <Logo invert />
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-0.5 lg:flex">
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

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${SALES_PHONE}`}
              className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-white transition-colors hover:text-brand-300"
            >
              Sales: {SALES_PHONE}
              <IconChevronDown className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-white transition-colors hover:text-brand-300"
            >
              Sign in
              <IconChevronDown className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile trigger */}
          <Button
            variant="ghost"
            size="sm"
            className="!px-2 text-white hover:!bg-white/10 lg:hidden"
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
          className="inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
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
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
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
            <div className="grid w-max min-w-[22rem] grid-cols-2 gap-x-8 gap-y-2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 shadow-float">
              {item.menu.map((col) => (
                <div key={col.heading}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/45">
                    {col.heading}
                  </p>
                  <ul className="space-y-1">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="block rounded-lg px-2 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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
