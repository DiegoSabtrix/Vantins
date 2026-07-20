import type { Metadata } from 'next';
import { LegalPage } from '@/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Vantins',
  description:
    'Review website use, quote, coverage, and communication terms for Vantins.',
};

export default function Page() {
  return <LegalPage type="terms" />;
}
