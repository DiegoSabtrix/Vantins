import type { Metadata } from 'next';
import { ServicesPage } from '@/services/ServicesPage';

export const metadata: Metadata = {
  title: 'Commercial Truck Insurance Services | Cargo, COI & Fleet Coverage | Vantins',
  description:
    'Explore Vantins commercial truck insurance services including cargo insurance, physical damage coverage, COIs, liability, claims support, and fleet protection.',
};

export default function Page() {
  return <ServicesPage />;
}
