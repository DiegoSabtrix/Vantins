import type { Metadata } from 'next';
import { PaymentResult } from '@/payment/PaymentResult';

export const metadata: Metadata = { title: 'Payment Status | Vantins', robots: { index: false, follow: false } };
export default function Page() { return <PaymentResult />; }
