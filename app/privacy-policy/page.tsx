import type { Metadata } from 'next';
import { LegalPage } from '@/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vantins',
  description:
    'Learn how Vantins handles personal information shared through quote requests, support channels, and policy communications.',
};

export default function Page() {
  return <LegalPage type="privacy" />;
}
