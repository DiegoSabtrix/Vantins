import type { ComponentType, ReactNode, SVGProps } from 'react';

/** A minimal icon contract satisfied by all local SVG icon components. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  /** Optional mega-menu columns rendered on hover/focus. */
  menu?: NavMenuColumn[];
}

export interface NavMenuColumn {
  heading: string;
  links: NavLink[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconComponent;
}

export interface ProductHighlight {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  /** Which visual mock to render alongside the copy. */
  visual: 'invoice' | 'reports' | 'expenses';
  /** Places the visual on the left or right on desktop. */
  align: 'left' | 'right';
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  /** Standard monthly price in USD. */
  price: number;
  /** Discounted monthly price shown during a promo. */
  promoPrice: number;
  features: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Initials rendered inside the avatar placeholder. */
  initials: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

/** Shared prop for components that accept arbitrary children. */
export interface WithChildren {
  children?: ReactNode;
}
