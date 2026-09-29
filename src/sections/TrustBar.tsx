import { Container, LinkButton } from '@/components/ui';
import { TRUST_LOGOS } from '@/utils/constants';
import { useT } from '@/i18n';

/** Trusted carriers — continuous marquee of the original supplied logos. */
export function TrustBar() {
  const t = useT();

  return (
    <section
      className="border-y border-ink/10 bg-white py-14"
      aria-label="Carriers"
    >
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-display-md text-balance text-ink">
          {t.carriers.title}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
          {t.carriers.description}
        </p>
        <LinkButton href="#pricing" variant="outline" size="sm">
          {t.carriers.cta}
        </LinkButton>
      </Container>
      <div className="mask-x-edges mt-10 overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-7 pr-7">
              {TRUST_LOGOS.map((logo) => (
                <li key={logo.name} className="flex h-[72px] w-[190px] shrink-0 items-center justify-center sm:w-[220px]">
                  <svg viewBox={logo.viewBox} className="h-[60px] w-[190px] sm:w-[200px]" role="img" aria-label={copy === 0 ? logo.name : undefined}>
                    <image href={logo.src} width={logo.width} height={logo.height} />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
