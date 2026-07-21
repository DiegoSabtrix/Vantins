import type { Metadata } from 'next';
import { GetQuotePage } from '@/quote/GetQuotePage';

export const metadata: Metadata = {
  title: 'Get a Free Commercial Truck Insurance Quote | Vantins',
  description:
    'Request a free Vantins quote for owner-operator insurance, fleet insurance, cargo coverage, physical damage, liability, workers comp, health, or life insurance.',
};

export default function Page() {
  return <GetQuotePage />;
}
