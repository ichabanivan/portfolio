/**
 * Spacing scale. Every margin, padding and gap is a multiple of 4px, written as a token:
 * '1' = 4px, '4' = 16px, '-3' = -12px. Shorthands combine tokens: padding="0 6" is `0 24px`.
 */
export const SPACE_UNIT = 4;

export const space = {
  '0': 0, '1': 4, '2': 8, '3': 12, '4': 16, '5': 20, '6': 24, '7': 28, '8': 32, '9': 36,
  '10': 40, '11': 44, '12': 48, '14': 56, '16': 64, '18': 72, '20': 80, '22': 88, '24': 96,
  '28': 112, '32': 128,
} as const;

export type SpaceToken = keyof typeof space | `-${Exclude<keyof typeof space, '0'>}`;

/**
 * Anything else a spacing prop accepts: 'auto', a theme variable, a fluid clamp()/calc() whose
 * px values are all on the 4px grid, or ems for spacing that should scale with the text.
 */
export type SpaceValue = SpaceToken | 'auto' | (string & {});

const TOKEN = /^-?\d+$/;

/** Splits a shorthand on spaces that are not inside parentheses */
function parts(value: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of value.trim()) {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (/\s/.test(char) && depth === 0) {
      if (current) out.push(current);
      current = '';
    } else current += char;
  }
  if (current) out.push(current);
  return out;
}

/** Turns tokens into px and rejects anything off the 4px grid. Runs at build time (SSR). */
export function resolveSpace(prop: string, value: string | number): string {
  if (typeof value === 'number') {
    throw new Error(`${prop}={${value}}: spacing takes a token string, e.g. ${prop}="${value / SPACE_UNIT}"`);
  }
  return parts(value)
    .map((part) => {
      if (TOKEN.test(part)) {
        const negative = part.startsWith('-');
        const px = space[part.replace('-', '') as keyof typeof space];
        if (px === undefined) throw new Error(`${prop}: "${part}" is not on the spacing scale`);
        return px === 0 ? '0' : `${negative ? -px : px}px`;
      }
      if (/\d(pt|rem)\b/.test(part)) {
        throw new Error(`${prop}: "${part}" - use a spacing token instead of pt/rem`);
      }
      for (const [, px] of part.matchAll(/(-?\d*\.?\d+)px/g)) {
        if (Number(px) % SPACE_UNIT !== 0) {
          throw new Error(`${prop}: ${px}px is not a multiple of ${SPACE_UNIT}px`);
        }
      }
      return part;
    })
    .join(' ');
}
