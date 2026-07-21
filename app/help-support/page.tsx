import type { Metadata } from 'next';
import { HelpSupportPage } from '@/support/HelpSupportPage';

export const metadata: Metadata = {
  title: 'Commercial Truck Insurance Help & Support | Vantins',
  description:
    'Contact Vantins for trucking insurance quotes, policy support, certificates of insurance, COI requests, claims guidance, and bilingual assistance.',
};

export default function Page() {
  return <HelpSupportPage />;
}
