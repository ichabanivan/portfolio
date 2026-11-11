import { useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { profile } from '../data/cv';

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

/**
 * Strip geometry carried over from the original design: left offset and width in % of the stage,
 * plus the top and bottom edges at rest. The photo itself never moves; the animation slides the
 * strip edges up and down, following the pointer and the scroll position.
 */
const STRIPS = [
  { l: 14.4, w: 10.6, t: 16.7, b: 46.7 },
  { l: 28, w: 18.9, t: 7.1, b: 82.1 },
  { l: 47.2, w: 12.9, t: 15, b: 90 },
  { l: 60.4, w: 18.9, t: 13.3, b: 98.3 },
  { l: 79.7, w: 6.1, t: 26.3, b: 91.3 },
];
const ACCENT_STRIP = { l: 89.5, w: 1, t: 30, b: 74 };

/**
 * `h` is the pointer position in % of the viewport height. Each strip maps it to its own visible
 * window, using the ratios of the old version of the site. The last entry is the red accent strip.
 */
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
      // The "js" class is set in <head> only when motion is allowed; without it the hero stays
      // in its server-rendered resting state.
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
          // Intro wipe: odd strips grow down from their top edge, even ones grow up from the bottom.
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

      // Intro
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      intro.to(reveal, { r: 1, duration: 1.5, stagger: 0.09 }, 0.1);

      const name = hero.querySelector<HTMLElement>('[data-hero-name]');
      if (name) {
        // Each line is split on its own. The heading keeps one accessible name while the
        // per-letter boxes stay out of the accessibility tree.
        const lines = gsap.utils.toArray<HTMLElement>('.hero__line', name);
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

      // Scrolling continues the movement (and is the only driver on touch screens)
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          scrollProgress = self.progress;
          update();
        },
      });

      // Rendering stops once the hero is off screen
      gsap.ticker.add(render);
      const observer = new IntersectionObserver(([entry]) => {
        gsap.ticker.remove(render);
        if (entry.isIntersecting) gsap.ticker.add(render);
      });
      observer.observe(hero);

      // Tweens, the ScrollTrigger and SplitText are reverted by useGSAP; the rest is cleaned here.
      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        gsap.ticker.remove(render);
        observer.disconnect();
      };
    },
    { scope: root },
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__text">
        <h1 className="hero__name" data-hero-name aria-label={profile.name}>
          <span className="hero__line">{profile.firstName}</span>{' '}
          <span className="hero__line">{profile.lastName}</span>
        </h1>
        <p className="hero__title" data-hero-item>
          {profile.title}
        </p>
        <address className="hero__contact" data-hero-item>
          <span>{profile.location}</span>{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>{' '}
          {profile.phone && (
            <>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>{' '}
            </>
          )}
          <a href={profile.linkedin} rel="me noopener">
            LinkedIn
          </a>
        </address>
        <div className="hero__actions" data-hero-item>
          <a className="btn btn--primary" href="#experience">
            View experience
          </a>{' '}
          <a className="btn" href={`mailto:${profile.email}`}>
            Get in touch
          </a>{' '}
          {cvHref && (
            <a className="btn" href={cvHref} download>
              Download CV
            </a>
          )}
        </div>
      </div>

      <div className="stage" data-stage>
        {STRIPS.map((strip, i) => (
          <div
            className="strip"
            style={stripStyle(strip)}
            data-strip
            aria-hidden={i === 0 ? undefined : true}
            key={strip.l}
          >
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(max-width: 899px) 100vw, 58vw"
              width={photo.width}
              height={photo.height}
              alt={i === 0 ? `Portrait of ${profile.name}` : ''}
              loading="eager"
              decoding="async"
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          </div>
        ))}
        <div
          className="strip strip--accent"
          style={stripStyle(ACCENT_STRIP)}
          data-strip
          aria-hidden
        />
      </div>
    </section>
  );
}
