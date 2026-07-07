import { Container } from '@/components/ui';
import { TRUST_LOGOS } from '@/utils/constants';

/** Infinite marquee of placeholder customer wordmarks. */
export function TrustBar() {
  const items = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <section className="border-y border-ink/10 bg-white py-10" aria-label="Trusted by">
      <Container>
        <p className="text-center text-sm font-medium text-ink-muted">
          Trusted by more than 7 million businesses worldwide
        </p>
      </Container>
      <div className="mask-x-edges mt-6 overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-14">
          {items.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= TRUST_LOGOS.length}
              className="select-none text-xl font-extrabold tracking-tight text-ink/35"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
