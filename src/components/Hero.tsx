import { useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { profile } from '../data/cv';
import { Box, Button, PrintOnly, Text, vars, type BoxProps } from '../ui';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export interface HeroPhoto {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

interface Props {
  photo: HeroPhoto;
  cvHref: string | null;
}

const STRIPS = [
  { l: 14.4, w: 10.6, t: 16.7, b: 46.7 },
  { l: 28, w: 18.9, t: 7.1, b: 82.1 },
  { l: 47.2, w: 12.9, t: 15, b: 90 },
  { l: 60.4, w: 18.9, t: 13.3, b: 98.3 },
  { l: 79.7, w: 6.1, t: 26.3, b: 91.3 },
];
const ACCENT_STRIP = { l: 89.5, w: 1, t: 30, b: 74 };

const WINDOWS: { top: (h: number) => number; bottom: (h: number) => number }[] = [
  { top: (h) => h / 3, bottom: (h) => 30 + h / 3 },
  { top: (h) => h / 7, bottom: (h) => 75 + h / 7 },
  { top: (h) => 10 + h / 10, bottom: (h) => 85 + h / 10 },
  { top: (h) => 10 + h / 15, bottom: (h) => 95 + h / 15 },
  { top: (h) => 20 + h / 8, bottom: (h) => 85 + h / 8 },
  { top: (h) => 12 + h / 2.5, bottom: (h) => 52 + h / 2.5 },
];

const clamp = gsap.utils.clamp(0, 100);

const stripStyle = (s: typeof ACCENT_STRIP) =>
  ({ '--l': s.l, '--w': s.w, '--t': s.t, '--b': s.b }) as CSSProperties;

export default function Hero({ photo, cvHref }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = root.current;
      if (!hero || !document.documentElement.classList.contains('js')) return;

      const stage = hero.querySelector<HTMLElement>('[data-stage]');
      if (!stage) return;

      const strips = gsap.utils.toArray<HTMLElement>('[data-strip]', stage);
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      const state = { h: 50 };
      const reveal = strips.map(() => ({ r: 0 }));
      let pointerH = finePointer ? 50 : 30;
      let scrollProgress = 0;

      const render = () => {
        strips.forEach((strip, i) => {
          const win = WINDOWS[i] ?? WINDOWS[0];
          const top = win.top(state.h);
          const bottom = Math.min(100, win.bottom(state.h));
          const r = reveal[i].r;
          const t = i % 2 ? top : bottom - (bottom - top) * r;
          const b = i % 2 ? top + (bottom - top) * r : bottom;
          strip.style.setProperty('--t', t.toFixed(2));
          strip.style.setProperty('--b', b.toFixed(2));
        });
      };

      const moveTo = gsap.quickTo(state, 'h', { duration: 0.9, ease: 'power3.out' });
      const update = () => moveTo(clamp(pointerH + scrollProgress * 60));

      render();
      gsap.set(stage, { visibility: 'visible' });

      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      intro.to(reveal, { r: 1, duration: 1.5, stagger: 0.09 }, 0.1);

      const name = hero.querySelector<HTMLElement>('[data-hero-name]');
      if (name) {
        const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]', name);
        const split = SplitText.create(lines, { type: 'chars', aria: 'none' });
        lines.forEach((line) => line.setAttribute('aria-hidden', 'true'));
        gsap.set(name, { visibility: 'visible' });
        intro.from(split.chars, { yPercent: 115, duration: 1.1, stagger: 0.045 }, 0.25);
      }

      intro.fromTo(
        '[data-hero-item]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
        0.9,
      );

      const onPointerMove = (event: PointerEvent) => {
        pointerH = (event.clientY / window.innerHeight) * 100;
        update();
      };
      if (finePointer) window.addEventListener('pointermove', onPointerMove, { passive: true });
      else update();

      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          scrollProgress = self.progress;
          update();
        },
      });

      gsap.ticker.add(render);
      const observer = new IntersectionObserver(([entry]) => {
        gsap.ticker.remove(render);
        if (entry.isIntersecting) gsap.ticker.add(render);
      });
      observer.observe(hero);

      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        gsap.ticker.remove(render);
        observer.disconnect();
      };
    },
    { scope: root },
  );

  const gutter = vars.space.gutter;

  return (
    <Box
      as="section"
      id="top"
      ref={root}
      position="relative"
      display={{ default: 'grid', print: 'block' }}
      gridTemplateColumns={{ default: 'minmax(0, 1fr)', lg: 'repeat(12, minmax(0, 1fr))' }}
      alignItems={{ default: 'start', lg: 'center' }}
      minHeight={{ default: 0, lg: '100svh', print: 0 }}
      padding={{
        default: `${vars.space.headerH} 0 6`,
        lg: `${vars.space.headerH} 0 0`,
        print: '0',
      }}
      overflow="hidden"
    >
      <Box
        position="relative"
        zIndex={2}
        gridColumn={{ default: '1', lg: '1 / 9' }}
        gridRow={{ default: 2, lg: 1 }}
        marginTop={{ default: '-19vw', lg: '0', print: '0' }}
        padding={{ default: `0 ${gutter}`, lg: `8 0 8 ${gutter}`, print: '0' }}
      >
        <Box
          as="h1"
          data-hero-name
          aria-label={profile.name}
          fontFamily={vars.font.display}
          fontSize={{
            default: 'clamp(72px, 26vw, 190px)',
            lg: 'clamp(96px, 15.5vw, 236px)',
            print: '30pt',
          }}
          fontWeight={700}
          lineHeight={{ default: 0.8, print: 1 }}
          letterSpacing="0.04em"
          textTransform="uppercase"
          color={vars.color.accent}
        >
          <NameLine>{profile.firstName}</NameLine>{' '}
          <NameLine paddingLeft={{ default: '0.5em', lg: '0.85em', print: '0' }}>
            {profile.lastName}
          </NameLine>
        </Box>
        <Text
          data-hero-item
          marginTop={{ default: 'clamp(20px, 3vw, 40px)', print: '1' }}
          fontSize={{ default: 'clamp(18px, 2.2vw, 30px)', print: '12pt' }}
          fontWeight={300}
          letterSpacing={{ default: '0.16em', lg: '0.22em', print: '0.05em' }}
          textTransform="uppercase"
          color={vars.color.white}
        >
          {profile.title}
        </Text>
        <Box
          as="address"
          data-hero-item
          display="flex"
          flexWrap="wrap"
          gap="1 5"
          marginTop={{ default: '4', print: '1' }}
          fontSize={{ default: 15, print: '10pt' }}
          color={vars.color.muted}
        >
          <span>{profile.location}</span>{' '}
          <ContactLink href={`mailto:${profile.email}`}>{profile.email}</ContactLink>{' '}
          {profile.phone && (
            <>
              <ContactLink href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                {profile.phone}
              </ContactLink>{' '}
            </>
          )}
          <ContactLink href={profile.linkedin} target="_blank" rel="me noopener noreferrer">
            LinkedIn
            <PrintOnly> ({profile.linkedin})</PrintOnly>
          </ContactLink>
        </Box>
        <Box
          data-hero-item
          display={{ default: 'flex', print: 'none' }}
          flexWrap="wrap"
          gap="3"
          marginTop="clamp(28px, 4vw, 48px)"
        >
          <Button variant="primary" href="#experience">
            View experience
          </Button>{' '}
          <Button href={`mailto:${profile.email}`}>Get in touch</Button>{' '}
          {cvHref && (
            <Button href={cvHref} target="_blank" rel="noopener" download>
              Download CV
            </Button>
          )}
        </Box>
      </Box>

      <Box
        data-stage
        position="relative"
        gridColumn={{ default: '1', lg: '6 / 13' }}
        gridRow={1}
        justifySelf={{ default: 'center', lg: 'end' }}
        width={{ default: 'min(100%, 70svh)', lg: 'min(100%, 94svh)' }}
        aspectRatio={1}
        display={{ print: 'none' }}
        style={{ '--k': 32.5 } as CSSProperties}
      >
        {STRIPS.map((strip, i) => (
          <Strip style={stripStyle(strip)} aria-hidden={i === 0 ? undefined : true} key={strip.l}>
            <Box
              as="img"
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(min-width: 992px) 58vw, 100vw"
              htmlWidth={photo.width}
              htmlHeight={photo.height}
              alt={i === 0 ? `Portrait of ${profile.name}` : ''}
              loading="eager"
              decoding="async"
              fetchPriority={i === 0 ? 'high' : undefined}
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="50% 28%"
            />
          </Strip>
        ))}
        <Strip style={stripStyle(ACCENT_STRIP)} background={vars.color.accent} aria-hidden />
        <Box
          aria-hidden
          position="absolute"
          inset="70% 0 0 0"
          background={`linear-gradient(to bottom, transparent, ${vars.color.bg})`}
          pointerEvents="none"
        />
      </Box>
    </Box>
  );
}

function NameLine(props: BoxProps<'span'>) {
  return (
    <Box
      as="span"
      data-hero-line
      display={{ default: 'block', print: 'inline' }}
      paddingTop={{ default: '0.06em', print: '0' }}
      overflow="hidden"
      {...props}
    />
  );
}

function ContactLink(props: BoxProps<'a'>) {
  return <Box as="a" color={{ hover: vars.color.white }} {...props} />;
}

const STRIP_CLIP = `polygon(
  calc((var(--l) + var(--k) * (50 - var(--t)) / 100) * 1%) calc(var(--t) * 1%),
  calc((var(--l) + var(--w) + var(--k) * (50 - var(--t)) / 100) * 1%) calc(var(--t) * 1%),
  calc((var(--l) + var(--w) + var(--k) * (50 - var(--b)) / 100) * 1%) calc(var(--b) * 1%),
  calc((var(--l) + var(--k) * (50 - var(--b)) / 100) * 1%) calc(var(--b) * 1%)
)`;

function Strip(props: BoxProps<'div'>) {
  return (
    <Box
      data-strip
      position="absolute"
      inset={0}
      overflow="hidden"
      clipPath={STRIP_CLIP}
      willChange="clip-path"
      {...props}
    />
  );
}
