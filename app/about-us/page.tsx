import type { Metadata } from 'next';
import { AboutUsPage } from '@/about/AboutUsPage';

export const metadata: Metadata = {
  title: 'About Vantins | Trucking Insurance Advisors',
  description:
    'Meet Vantins, licensed insurance advisors helping truckers, owner-operators, fleets, businesses, and families compare smarter coverage options.',
};

export default function Page() {
  return <AboutUsPage />;
}
