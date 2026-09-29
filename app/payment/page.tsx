import type { Metadata } from 'next';
import { PaymentPage } from '@/payment/PaymentPage';

export const metadata: Metadata = {
  title: 'Secure Payment | Vantins',
  description: 'Submit a down payment, invoice payment, or policy payment securely with Vantins.',
  robots: { index: false, follow: false },
};

export default function Page() { return <PaymentPage />; }
