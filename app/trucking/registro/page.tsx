import type { Metadata } from 'next';
import { TruckingRegistrationPage } from '@/trucking/TruckingRegistrationPage';

export const metadata: Metadata = {
  title: 'Obtén tu seguro de camión | Atención personalizada | Vantins',
  description: 'Cuéntanos sobre tu operación de transporte. Un asesor de Vantins revisará tus necesidades de cobertura y los próximos pasos para solicitar una cotización.',
};

export default function Page() {
  return <TruckingRegistrationPage />;
}
