import { createVar, style, type StyleRule } from '@vanilla-extract/css';
import { media } from './media';

/**
 * Atomic styles behind <Box>. Every style prop gets one class per condition, and that class reads
 * its value from a CSS variable that Box sets inline. So any value works (tokens, clamp(), calc())
 * while the CSS stays a fixed, small set of rules generated once at build time.
 */
export const STYLE_PROPS = [
  // Layout
  'display', 'position', 'inset', 'top', 'right', 'bottom', 'left', 'zIndex',
  'overflow', 'overflowX', 'visibility', 'boxSizing',
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'aspectRatio',
  // Flex and grid
  'flex', 'flexDirection', 'flexWrap', 'alignItems', 'alignSelf', 'alignContent',
  'justifyContent', 'justifyItems', 'justifySelf', 'placeItems', 'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridColumn', 'gridRow', 'order',
  // Spacing
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginInline', 'marginBlock',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingInline',
  'paddingBlock',
  // Surface
  'border', 'borderTop', 'borderBottom', 'borderLeft', 'borderColor', 'borderRadius',
  'background', 'backgroundSize', 'color', 'opacity', 'transform', 'transformOrigin', 'translate', 'transition',
  'cursor', 'pointerEvents', 'userSelect', 'objectFit', 'objectPosition', 'clipPath', 'willChange',
  'backdropFilter', 'breakInside',
  // Typography
  'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing',
  'textTransform', 'textAlign', 'whiteSpace', 'overflowWrap', 'listStyle',
] as const;

/**
 * Props that can also change on hover (of the element itself or of a `group` ancestor). Keyboard
 * focus counts as hover, so focused controls get the same feedback.
 */
export const STATE_PROPS = [
  'color', 'background', 'backgroundSize', 'borderColor', 'opacity', 'transform',
] as const;

/** Spacing props take tokens from the 4px scale (see space.ts) */
export const SPACE_PROPS = [
  'gap', 'rowGap', 'columnGap',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginInline', 'marginBlock',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingInline',
  'paddingBlock',
] as const satisfies readonly (typeof STYLE_PROPS)[number][];

export type StyleProp = (typeof STYLE_PROPS)[number];
export type SpaceProp = (typeof SPACE_PROPS)[number];
export type StateProp = (typeof STATE_PROPS)[number];

export const CONDITIONS = ['default', 'hover', 'groupHover', ...(Object.keys(media) as (keyof typeof media)[])] as const;
export type Condition = (typeof CONDITIONS)[number];

export interface Atom {
  className: string;
  /** Custom property name, without var() */
  variable: string;
}

const wrap = (condition: Condition, rule: StyleRule): StyleRule => {
  if (condition === 'default') return rule;
  if (condition === 'hover') return { selectors: { '&:hover, &:focus-visible': rule } } as StyleRule;
  if (condition === 'groupHover') {
    return {
      selectors: { '[data-group]:hover &, [data-group]:focus-visible &': rule },
    } as StyleRule;
  }
  return { '@media': { [media[condition]]: rule } };
};

// Emitted condition by condition, so a narrower breakpoint (and print) always comes later in the
// stylesheet than the ones it overrides.
export const atoms = {} as Record<Condition, Partial<Record<StyleProp, Atom>>>;

for (const condition of CONDITIONS) {
  atoms[condition] = {};
  const props: readonly StyleProp[] =
    condition === 'hover' || condition === 'groupHover' ? STATE_PROPS : STYLE_PROPS;
  for (const prop of props) {
    const value = createVar(`${prop}-${condition}`);
    atoms[condition][prop] = {
      className: style(wrap(condition, { [prop]: value } as StyleRule), `${prop}_${condition}`),
      variable: value.slice(4, -1),
    };
  }
}
