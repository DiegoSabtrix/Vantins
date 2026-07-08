import { Container, LinkButton } from '@/components/ui';
import { TRUST_LOGOS } from '@/utils/constants';

/** "Over 800 integrations" — infinite marquee of placeholder partner wordmarks. */
export function TrustBar() {
  const items = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <section
      className="border-y border-ink/10 bg-white py-14"
      aria-label="Integrations"
    >
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-display-md text-balance text-ink">
          Trusted Insurance Carriers
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
          We work with leading insurance companies so you can compare coverage,
          pricing, and protection — all through one trusted agency.
        </p>
        <LinkButton href="#pricing" variant="outline" size="sm">
          See all carriers
        </LinkButton>
      </Container>
      <div className="mask-x-edges mt-10 overflow-hidden">
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
