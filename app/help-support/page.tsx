import type { Metadata } from 'next';
import { HelpSupportPage } from '@/support/HelpSupportPage';

export const metadata: Metadata = {
  title: 'Help & Support | Vantins Insurance Group',
  description:
    'Contact Vantins for insurance quotes, policy support, certificates of insurance, claims guidance, and bilingual assistance.',
};

export default function Page() {
  return <HelpSupportPage />;
}
