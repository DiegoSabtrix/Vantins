import type { Metadata } from 'next';
import { ServicesPage } from '@/services/ServicesPage';

export const metadata: Metadata = {
  title: 'Commercial Truck Insurance Services | Vantins',
  description:
    'Commercial truck insurance, cargo coverage, COIs, claims support, and fleet protection from experienced Vantins advisors.',
};

export default function Page() {
  return <ServicesPage />;
}
