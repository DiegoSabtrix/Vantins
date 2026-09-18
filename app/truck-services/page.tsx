import type { Metadata } from 'next';
import { TruckServicesPage } from '@/truck-services/TruckServicesPage';

export const metadata: Metadata = {
  title: 'Truck Services: USDOT, MC, BOC-3, UCR & Registration | Vantins',
  description:
    'Get guidance with USDOT and MC Numbers, BOC-3, UCR, Motus updates, vehicle registration, commercial insurance and other services for truckers.',
  alternates: {
    canonical: '/truck-services',
  },
};

export default function Page() {
  return <TruckServicesPage />;
}
