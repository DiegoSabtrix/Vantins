import type { Metadata } from 'next';
import { ServicesPage } from '@/services/ServicesPage';

export const metadata: Metadata = {
  title: 'Commercial Truck Insurance Services | Cargo, COI & Fleet Coverage | Vantins',
  description:
    'Explore Vantins commercial truck insurance services including cargo insurance, physical damage coverage, COIs, liability, claims support, and fleet protection.',
  keywords: [
    'Vantins commercial truck insurance',
    'owner-operator truck insurance',
    'fleet truck insurance',
    'motor truck cargo insurance',
    'physical damage truck insurance',
    'commercial auto general liability insurance',
    'workers compensation trucking insurance',
    'commercial trucking insurance quote',
    'seguro para owner-operators',
    'seguro de flotas',
    'seguro de carga para camiones',
    'daño físico para camiones',
    'responsabilidad civil general para transporte',
    'compensación laboral para trucking',
    'cotización de seguro para camión',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Commercial Truck Insurance Services | Vantins',
    description:
      'Compare owner-operator, fleet, cargo, physical damage, liability, and workers compensation coverage with Vantins.',
    url: '/services',
    siteName: 'Vantins',
    type: 'website',
    images: [
      {
        url: '/assets/vantins-owner-operator-truck-insurance.webp',
        width: 1600,
        height: 1066,
        alt: 'Vantins owner-operator truck insurance coverage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Truck Insurance Services | Vantins',
    description:
      'Commercial truck, cargo, fleet, physical damage, liability, and workers compensation coverage guidance from Vantins.',
    images: ['/assets/vantins-owner-operator-truck-insurance.webp'],
  },
};

export default function Page() {
  return <ServicesPage />;
}
