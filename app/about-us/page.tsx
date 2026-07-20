import type { Metadata } from 'next';
import { AboutUsPage } from '@/about/AboutUsPage';

export const metadata: Metadata = {
  title: 'About Vantins | Smart Insurance, Personal Guidance',
  description:
    'Meet Vantins Insurance Group—licensed advisors helping individuals, families, and businesses find smarter, better-structured coverage.',
};

export default function Page() {
  return <AboutUsPage />;
}
