import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { media } from './media';

/*
 * The few rules that cannot be expressed as <Box> props: pseudo-elements, attribute and
 * open/closed states set by scripts, and generated content. Everything else is a prop.
 */

/**
 * Blurred header bar. A pseudo-element, because a backdrop-filter on the header itself would make
 * it the containing block for the fixed mobile menu. `is-scrolled` / `is-open` come from main.ts.
 */
export const headerBar = style({
  selectors: {
    '&::before': {
      content: "''",
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      background: 'rgba(11, 11, 12, 0.78)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      opacity: 0,
      transition: 'opacity 0.4s',
    },
    '&.is-scrolled::before, &.is-open::before': { opacity: 1 },
  },
});

/**
 * Below `lg` the menu is a full-screen panel, shown while the header has `is-open`.
 * From `lg` up it is an ordinary inline nav.
 */
export const navMenu = style({
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-12px)',
  transition: `opacity 0.3s, transform 0.4s ${vars.ease}, visibility 0.3s`,
  selectors: { '.is-open &': { opacity: 1, visibility: 'visible', transform: 'none' } },
  '@media': {
    [media.lg]: { opacity: 1, visibility: 'visible', transform: 'none', transition: 'none' },
  },
});

/** Underline for the section that is in view (aria-current is set by scroll.ts). */
export const navLink = style({
  selectors: {
    '&::after': {
      content: "''",
      display: 'none',
      position: 'absolute',
      inset: 'auto 0 2px 0',
      height: 2,
      background: vars.color.accent,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: `transform 0.4s ${vars.ease}`,
    },
    "&[aria-current='true']": { color: '#fff' },
    "&[aria-current='true']::after": { transform: 'scaleX(1)' },
  },
  '@media': { [media.lg]: { selectors: { '&::after': { display: 'block' } } } },
});

/** The two menu bars turn into a cross while the menu is open. */
export const menuBar = style({
  selectors: {
    '.is-open &:first-child': { transform: 'translateY(5px) rotate(45deg)' },
    '.is-open &:last-child': { transform: 'translateY(-5px) rotate(-45deg)' },
  },
});

/**
 * Marquee words are generated content read from data-word: generated content cannot be selected,
 * so the outlined letters stay visible when page text is selected.
 */
export const marqueeWord = style({
  selectors: {
    '&::before': { content: 'attr(data-word)' },
    '&::after': {
      content: "'/'",
      marginLeft: '0.25em',
      color: vars.color.accent,
      WebkitTextStroke: 0,
    },
  },
});

/** Native <dialog>: laid out only while open, with a dimmed backdrop. */
export const dialog = style({
  selectors: {
    '&[open]': { display: 'grid', placeItems: 'center' },
    '&::backdrop': { background: 'rgba(0, 0, 0, 0.6)' },
  },
});

// Outlined marquee text has no Box prop
globalStyle(`[data-marquee-track]`, { WebkitTextStroke: '1px rgba(255, 255, 255, 0.36)' });
