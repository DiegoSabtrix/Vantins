import type { Metadata } from 'next';
import { GetQuotePage } from '@/quote/GetQuotePage';

export const metadata: Metadata = {
  title: 'Get a Free Insurance Quote | Vantins',
  description:
    'Compare commercial truck, health, and life insurance options with an experienced Vantins advisor.',
};

export default function Page() {
  return <GetQuotePage />;
}
