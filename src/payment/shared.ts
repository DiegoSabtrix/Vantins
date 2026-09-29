export type Payer = {
  fullName: string; email: string; phone: string; reference: string;
  paymentType: string; amount: string; notes?: string; link?: string; consent?: boolean;
};

export const PAYMENT_TYPES = ['Down Payment', 'Invoice Payment', 'Policy Payment', 'Other'];
export const money = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
