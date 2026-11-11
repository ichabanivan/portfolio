import { createGlobalTheme, globalFontFace, globalStyle } from '@vanilla-extract/css';
import { media } from './media';

const print = media.print;

const bebas = 'Bebas Neue';

globalFontFace(bebas, {
  src: "url('../assets/fonts/bebas-neue-bold.woff2') format('woff2')",
  fontWeight: 700,
  fontStyle: 'normal',
  fontDisplay: 'swap',
});

export const vars = createGlobalTheme(':root', {
  color: {
    bg: '#0b0b0c',
    surface: '#131315',
    surface2: '#1b1b1e',
    line: 'rgba(255, 255, 255, 0.1)',
    text: '#ececee',
    muted: '#a1a1aa',
    accent: '#cd0d2e',
    // Lighter red for small text on dark, passes 4.5:1
    accentText: '#ff4d67',
  },
  font: {
    display: `'${bebas}', 'Arial Narrow', Impact, sans-serif`,
    body: "'Inter Variable', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  space: {
    gutter: 'clamp(20px, 5vw, 64px)',
    wrap: '1240px',
    section: 'clamp(88px, 12vw, 168px)',
    headerH: '64px',
  },
  radius: '14px',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
});

// Printing the page produces a plain single-column CV on white paper.
globalStyle(':root', {
  '@media': {
    [print]: {
      // The site is dark-only on screen; without this the page margins print dark too
      colorScheme: 'light',
      vars: {
        [vars.color.bg]: '#fff',
        [vars.color.surface]: '#fff',
        [vars.color.surface2]: '#fff',
        [vars.color.line]: '#ccc',
        [vars.color.text]: '#000',
        [vars.color.muted]: '#222',
        [vars.color.accent]: '#000',
        [vars.color.accentText]: '#000',
        [vars.space.section]: '20px',
      },
    },
  },
});
