import { motion } from 'framer-motion';
import type { ProductHighlight } from '@/types';
import { IconCheck, IconReceipt } from '@/components/icons';
import { EASE_OUT_EXPO } from '@/utils/motion';

/** Renders the right illustrative mock for a product highlight section. */
export function ProductVisual({ visual }: { visual: ProductHighlight['visual'] }) {
  switch (visual) {
    case 'invoice':
      return <InvoiceVisual />;
    case 'reports':
      return <ReportsVisual />;
    case 'expenses':
      return <ExpensesVisual />;
    default:
      return null;
  }
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-ink/10 bg-white p-5 shadow-card sm:p-6">
      {children}
    </div>
  );
}

function InvoiceVisual() {
  return (
    <CardShell>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Invoice
          </p>
          <p className="text-2xl font-bold text-ink">#1042</p>
        </div>
        <span className="rounded-full bg-accent-mint px-3 py-1 text-xs font-semibold text-brand-700">
          Paid
        </span>
      </div>
      <div className="my-5 h-px bg-ink/10" />
      <div className="space-y-3">
        {[
          { label: 'Brand design package', amount: '$2,400.00' },
          { label: 'Website landing page', amount: '$1,800.00' },
          { label: 'Photography', amount: '$650.00' },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">{row.label}</span>
            <span className="font-semibold text-ink">{row.amount}</span>
          </div>
        ))}
      </div>
      <div className="my-5 h-px bg-ink/10" />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-soft">Total due</span>
        <span className="text-xl font-bold text-brand-600">$4,850.00</span>
      </div>
      <motion.div
        className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand-500 py-3 text-sm font-semibold text-white"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.2 }}
      >
        <IconCheck className="h-4 w-4" /> Payment received
      </motion.div>
    </CardShell>
  );
}

function ReportsVisual() {
  const series = [
    { label: 'Jan', a: 40, b: 26 },
    { label: 'Feb', a: 55, b: 34 },
    { label: 'Mar', a: 48, b: 30 },
    { label: 'Apr', a: 72, b: 45 },
    { label: 'May', a: 64, b: 40 },
    { label: 'Jun', a: 90, b: 58 },
  ];
  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Profit & loss</p>
          <p className="text-xs text-ink-muted">First half, 2026</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-ink-soft">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> Income
          </span>
          <span className="flex items-center gap-1.5 text-ink-soft">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/25" /> Expenses
          </span>
        </div>
      </div>
      <div className="mt-6 flex h-40 items-end justify-between gap-3">
        {series.map((s, i) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-full w-full items-end justify-center gap-1">
              <motion.div
                className="w-1/2 rounded-t bg-brand-500"
                initial={{ height: 0 }}
                whileInView={{ height: `${s.a}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
              />
              <motion.div
                className="w-1/2 rounded-t bg-ink/20"
                initial={{ height: 0 }}
                whileInView={{ height: `${s.b}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: EASE_OUT_EXPO,
                  delay: 0.08 + i * 0.08,
                }}
              />
            </div>
            <span className="text-[10px] font-medium text-ink-muted">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-surface-subtle p-3.5">
        <p className="text-xs text-ink-muted">Net profit this period</p>
        <p className="text-lg font-bold text-brand-600">$142,900 ▲ 24%</p>
      </div>
    </CardShell>
  );
}

function ExpensesVisual() {
  const rows = [
    { vendor: 'Cloud Hosting', cat: 'Software', amount: '-$120.00' },
    { vendor: 'Meadowbrook Cafe', cat: 'Meals', amount: '-$38.50' },
    { vendor: 'Trailhead Supplies', cat: 'Materials', amount: '-$264.10' },
    { vendor: 'Lumen Transit', cat: 'Travel', amount: '-$92.75' },
  ];
  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Recent expenses</p>
          <p className="text-xs text-ink-muted">Auto-categorized</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-mint text-brand-600">
          <IconReceipt className="h-4 w-4" />
        </span>
      </div>
      <ul className="mt-4 divide-y divide-ink/10">
        {rows.map((row, i) => (
          <motion.li
            key={row.vendor}
            className="flex items-center justify-between py-3"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-subtle text-xs font-bold text-ink-soft">
                {row.vendor.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{row.vendor}</p>
                <span className="rounded-full bg-surface-subtle px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                  {row.cat}
                </span>
              </div>
            </div>
            <span className="text-sm font-semibold text-ink">{row.amount}</span>
          </motion.li>
        ))}
      </ul>
    </CardShell>
  );
}
