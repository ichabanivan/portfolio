import type { CSSProperties, ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import {
  atoms,
  CONDITIONS,
  SPACE_PROPS,
  type Condition,
  type SpaceProp,
  type StateProp,
  type StyleProp,
} from './box.css';
import { resolveSpace, type SpaceValue } from './space';

type Value = string | number;

/** A value for every screen, or one per breakpoint, mobile first: `{ default: '4', lg: '8', print: '0' }` */
export type Responsive<T = Value> = T | Partial<Record<Exclude<Condition, 'hover' | 'groupHover'>, T>>;
type Stateful<T = Value> = T | Partial<Record<Condition, T>>;

export type StyleProps = {
  [P in StyleProp]?: P extends SpaceProp
    ? Responsive<SpaceValue>
    : P extends StateProp
      ? Stateful
      : Responsive;
};

export type BoxProps<E extends ElementType = 'div'> = StyleProps & {
  as?: E;
  /** Marks a hover group: descendants' `groupHover` values apply while this element is hovered */
  group?: boolean;
  /** Passed through as the HTML width/height attributes (e.g. images, to reserve space) */
  htmlWidth?: number;
  htmlHeight?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<ComponentPropsWithRef<E>, StyleProp | 'as' | 'width' | 'height'>;

// Numbers become px, except for properties where a bare number means something else
const UNITLESS = new Set<string>([
  'zIndex', 'opacity', 'lineHeight', 'fontWeight', 'flex', 'order', 'aspectRatio', 'gridRow', 'gridColumn',
]);

const SPACE = new Set<string>(SPACE_PROPS);

const isCondition = (key: string): key is Condition => (CONDITIONS as readonly string[]).includes(key);

/** Splits style props from everything else and turns them into atomic classes plus inline vars. */
export function resolveStyleProps(props: Record<string, unknown>) {
  const classNames: string[] = [];
  const variables: Record<string, string> = {};
  const rest: Record<string, unknown> = {};

  for (const [key, raw] of Object.entries(props)) {
    if (!(key in atoms.default)) {
      rest[key] = raw;
      continue;
    }
    if (raw == null || raw === false) continue;
    const byCondition =
      typeof raw === 'object' ? (raw as Record<string, Value>) : { default: raw as Value };
    for (const [condition, value] of Object.entries(byCondition)) {
      if (value == null || !isCondition(condition)) continue;
      const atom = atoms[condition][key as StyleProp];
      if (!atom) throw new Error(`<Box ${key}> does not support the "${condition}" condition`);
      classNames.push(atom.className);
      variables[atom.variable] = SPACE.has(key)
        ? resolveSpace(key, value)
        : typeof value === 'number' && !UNITLESS.has(key)
          ? `${value}px`
          : String(value);
    }
  }
  return { classNames, variables, rest };
}

/**
 * The one styling primitive. Every visual property is a prop; the page components never write
 * CSS. Any element can be rendered with `as`.
 */
export function Box<E extends ElementType = 'div'>({
  as,
  group,
  htmlWidth,
  htmlHeight,
  className,
  style,
  ...props
}: BoxProps<E>) {
  const Element: ElementType = as ?? 'div';
  const { classNames, variables, rest } = resolveStyleProps(props);
  const classes = [...classNames, className].filter(Boolean).join(' ');
  return (
    <Element
      className={classes || undefined}
      style={Object.keys(variables).length || style ? { ...variables, ...style } : undefined}
      width={htmlWidth}
      height={htmlHeight}
      data-group={group || undefined}
      {...rest}
    />
  );
}
