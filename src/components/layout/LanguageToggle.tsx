import { motion } from 'framer-motion';
import { IconGlobe } from '@/components/icons';
import { useLang } from '@/i18n';
import { cn } from '@/utils/cn';

/** Modern EN/ES language switch showing the currently active language. */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle, t } = useLang();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.common.switchLanguageLabel}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 py-1 pl-2.5 pr-1 text-xs font-semibold text-white transition-colors hover:border-brand-400 hover:bg-white/10',
        className,
      )}
    >
      <IconGlobe className="h-4 w-4 text-brand-400" />
      <span>{t.common.languageName}</span>
      <span
        className="relative grid h-5 w-9 place-items-center rounded-full bg-white/15"
        aria-hidden
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 34 }}
          className={cn(
            'absolute top-0.5 h-4 w-4 rounded-full bg-brand-500',
            lang === 'en' ? 'left-0.5' : 'left-[1.125rem]',
          )}
        />
        <span className="relative z-10 text-[10px] font-bold uppercase tracking-wide">
          {t.common.languageCode}
        </span>
      </span>
    </button>
  );
}
