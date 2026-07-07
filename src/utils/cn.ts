export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>
  | ClassValue[];

/**
 * Tiny, dependency-free class name combiner.
 * Accepts strings, arrays, and `{ 'class': condition }` objects,
 * filtering out falsy values and de-duplicating whitespace.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue): void => {
    if (!value) return;

    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    if (typeof value === 'object') {
      for (const [key, active] of Object.entries(value)) {
        if (active) out.push(key);
      }
    }
  };

  inputs.forEach(walk);
  return out.join(' ').replace(/\s+/g, ' ').trim();
}
