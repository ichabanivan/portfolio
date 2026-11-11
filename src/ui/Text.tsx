import type { ElementType } from 'react';
import { Box, type BoxProps, type StyleProps } from './Box';
import { vars } from './theme.css';

/** Typographic presets. Any style prop passed alongside a variant overrides it. */
export const textVariants = {
  body: {},
  /** Bebas, uppercase: names, section and company titles */
  display: {
    fontFamily: vars.font.display,
    lineHeight: 1,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    color: '#fff',
  },
  /** Small uppercase label in the accent colour */
  eyebrow: {
    fontSize: { default: 13, print: '10.5pt' },
    fontWeight: 600,
    letterSpacing: { default: '0.1em', print: 0 },
    textTransform: { default: 'uppercase', print: 'none' },
    color: vars.color.accentText,
  },
  /** Large light intro text */
  lead: { fontSize: { default: 'clamp(18px, 1.9vw, 25px)', print: '10.5pt' }, fontWeight: 300 },
  /** Secondary detail line */
  meta: { fontSize: 14, color: vars.color.muted },
  /** Item title inside a card */
  title: { fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: '#fff' },
} satisfies Record<string, StyleProps>;

export type TextProps<E extends ElementType = 'p'> = BoxProps<E> & {
  variant?: keyof typeof textVariants;
};

export function Text<E extends ElementType = 'p'>({ variant = 'body', as, ...props }: TextProps<E>) {
  const merged = { as: as ?? 'p', ...textVariants[variant], ...props } as BoxProps;
  return <Box {...merged} />;
}
