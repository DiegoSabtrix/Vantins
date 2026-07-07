import { motion } from 'framer-motion';
import { IconArrowRight, IconChart, IconInvoice } from '@/components/icons';
import { EASE_OUT_EXPO } from '@/utils/motion';

const BARS = [42, 60, 38, 74, 55, 88, 66];
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/**
 * Placeholder product dashboard shown inside the hero browser frame.
 * All numbers are illustrative; bars animate up on mount.
 */
export function DashboardMock() {
  return (
    <div className="grid gap-4 p-4 sm:p-6">
      {/* Top KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: 'Income', value: '$48,250', tint: 'text-brand-600' },
          { label: 'Expenses', value: '$21,940', tint: 'text-ink' },
          { label: 'Profit', value: '$26,310', tint: 'text-brand-600' },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-ink/10 bg-white p-3.5 shadow-sm"
          >
            <p className="text-xs font-medium text-ink-muted">{kpi.label}</p>
            <p className={`mt-1 text-lg font-bold ${kpi.tint}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Chart card */}
      <div className="rounded-xl border border-ink/10 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-mint text-brand-600">
              <IconChart className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Cash flow</p>
              <p className="text-xs text-ink-muted">Last 7 days</p>
            </div>
          </div>
          <span className="rounded-full bg-accent-mint px-2.5 py-1 text-xs font-semibold text-brand-700">
            +18%
          </span>
        </div>
        <div className="flex h-28 items-end justify-between gap-2">
          {BARS.map((height, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <motion.div
                className="w-full rounded-md bg-brand-500/85"
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                  delay: 0.2 + i * 0.07,
                }}
              />
              <span className="text-[10px] font-medium text-ink-muted">
                {DAYS[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice row */}
      <div className="flex items-center justify-between rounded-xl border border-ink/10 bg-white p-3.5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-sky text-blue-600">
            <IconInvoice className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Invoice #1042</p>
            <p className="text-xs text-ink-muted">Fernleaf Studio</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-700">
            Paid
          </span>
          <IconArrowRight className="h-4 w-4 text-ink-muted" />
        </div>
      </div>
    </div>
  );
}
