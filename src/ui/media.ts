/**
 * Mobile first, Bootstrap-style breakpoints. Base styles are for the smallest screens; each
 * breakpoint applies from its width up, so wider ones are emitted later and win (see box.css.ts).
 * `print` comes last so the paper CV overrides every screen size.
 */
export const media = {
  xs: 'screen and (min-width: 320px)', // smaller phones
  sm: 'screen and (min-width: 480px)', // most phones
  md: 'screen and (min-width: 768px)', // most tablets
  lg: 'screen and (min-width: 992px)', // smaller desktops: the two-column layouts start here
  xl: 'screen and (min-width: 1200px)', // large and wide screens
  print: 'print',
} as const;

export type Breakpoint = keyof typeof media;

export const reducedMotion = '(prefers-reduced-motion: reduce)';
