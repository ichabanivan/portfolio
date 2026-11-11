import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { media, reducedMotion } from './media';

const print = media.print;

/* ---------- Base ---------- */
globalStyle('*, *::before, *::after', { boxSizing: 'border-box' });

globalStyle('html', {
  WebkitTextSizeAdjust: '100%',
  scrollBehavior: 'smooth',
  scrollPaddingTop: `calc(${vars.space.headerH} + 16px)`,
  '@media': { [reducedMotion]: { scrollBehavior: 'auto' } },
});

globalStyle('body', {
  margin: 0,
  background: vars.color.bg,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: 16,
  lineHeight: 1.65,
  WebkitFontSmoothing: 'antialiased',
  overflowX: 'clip',
});

globalStyle('h1, h2, h3, h4, p, ul, ol, dl, dd, address', { margin: 0 });
globalStyle('ul, ol', { padding: 0, listStyle: 'none' });
globalStyle('address', { fontStyle: 'normal' });
globalStyle('img', { display: 'block', maxWidth: '100%' });
globalStyle('a', { color: 'inherit', textDecoration: 'none' });

globalStyle(':focus-visible', {
  outline: `2px solid ${vars.color.accentText}`,
  outlineOffset: 3,
  borderRadius: 4,
});

globalStyle('::selection', { background: vars.color.accent, color: '#fff' });

/* ---------- Motion: initial states, only while JS animation is active ---------- */
globalStyle('.js [data-reveal], .js [data-hero-item]', { opacity: 0 });
globalStyle('.js [data-stage], .js [data-hero-name], .js [data-split]', { visibility: 'hidden' });

globalStyle('*', {
  '@media': { [reducedMotion]: { transitionDuration: '0.01ms !important' } },
});

/* ---------- Print ---------- */
globalStyle('html, body', {
  '@media': {
    [print]: { background: '#fff', color: '#000', fontSize: '10.5pt', lineHeight: 1.4 },
  },
});

// Undo any animation state
globalStyle(
  '[data-reveal], [data-hero-item], [data-hero-name], [data-hero-name] *, [data-split], [data-split] *',
  {
    '@media': {
      [print]: {
        opacity: '1 !important',
        visibility: 'visible !important' as 'visible',
        transform: 'none !important',
      },
    },
  },
);

globalStyle('*', {
  '@media': {
    [print]: {
      color: '#000 !important',
      boxShadow: 'none !important',
      textShadow: 'none !important',
    },
  },
});

globalStyle('h2, h3', { '@media': { [print]: { breakAfter: 'avoid' } } });
