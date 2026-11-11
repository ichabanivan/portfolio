import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/**
 * The hero keeps the idea of the original site: the portrait is seen through skewed strips whose
 * top and bottom edges slide as the pointer moves vertically. `h` is the pointer position in % of
 * the viewport height; each strip maps it to its own window, using the ratios of the old version.
 */
const WINDOWS: { top: (h: number) => number; bottom: (h: number) => number }[] = [
  { top: (h) => h / 3, bottom: (h) => 30 + h / 3 },
  { top: (h) => h / 7, bottom: (h) => 75 + h / 7 },
  { top: (h) => 10 + h / 10, bottom: (h) => 85 + h / 10 },
  { top: (h) => 10 + h / 15, bottom: (h) => 95 + h / 15 },
  { top: (h) => 20 + h / 8, bottom: (h) => 85 + h / 8 },
  // Thin red accent strip
  { top: (h) => 12 + h / 2.5, bottom: (h) => 52 + h / 2.5 },
];

// Horizontal parallax depth of the photo inside each strip, in % of its width.
const DEPTH = [-1.6, 1.1, -0.7, 1.5, -1.2];

const clamp = gsap.utils.clamp(0, 100);

export function initHero(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const stage = document.querySelector<HTMLElement>('[data-stage]');
  if (!hero || !stage) return;

  const strips = gsap.utils.toArray<HTMLElement>('[data-strip]', stage);
  const images = strips.map((strip) => strip.querySelector('img'));
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const state = { h: 50, drift: 0 };
  const reveal = strips.map(() => ({ r: 0 }));
  let pointerH = 50;
  let scrollProgress = 0;

  const render = () => {
    strips.forEach((strip, i) => {
      const win = WINDOWS[i] ?? WINDOWS[0];
      const h = clamp(state.h + state.drift * (i % 2 ? 1 : -1));
      const top = win.top(h);
      const bottom = Math.min(100, win.bottom(h));
      const r = reveal[i].r;
      // Intro wipe: odd strips grow down from their top edge, even strips grow up from the bottom.
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
  const name = hero.querySelector<HTMLElement>('[data-hero-name]');
  const items = hero.querySelectorAll('[data-hero-item]');
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });

  intro.to(reveal, { r: 1, duration: 1.5, stagger: 0.09 }, 0.1);

  if (name) {
    // Each line is split on its own (splitting the heading as a whole leaves an empty line box).
    // The heading keeps one accessible name while the per-letter boxes stay out of the a11y tree.
    const lines = gsap.utils.toArray<HTMLElement>('.hero__line', name);
    name.setAttribute('aria-label', lines.map((line) => line.textContent?.trim()).join(' '));
    const split = SplitText.create(lines, { type: 'chars', aria: 'none' });
    lines.forEach((line) => line.setAttribute('aria-hidden', 'true'));
    gsap.set(name, { visibility: 'visible' });
    intro.from(split.chars, { yPercent: 115, duration: 1.1, stagger: 0.045 }, 0.25);
  }

  intro.fromTo(
    items,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
    0.9,
  );

  // Gentle idle movement so the strips feel alive without a pointer (stronger on touch screens).
  const amplitude = finePointer ? 4 : 12;
  const drift = gsap.fromTo(
    state,
    { drift: -amplitude },
    { drift: amplitude, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 },
  );

  if (finePointer) {
    const shift = images.map((img) =>
      img ? gsap.quickTo(img, 'xPercent', { duration: 1.1, ease: 'power3.out' }) : null,
    );
    window.addEventListener(
      'pointermove',
      (event) => {
        pointerH = (event.clientY / window.innerHeight) * 100;
        update();
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        shift.forEach((to, i) => to?.(x * DEPTH[i]));
      },
      { passive: true },
    );
  } else {
    pointerH = 30;
    update();
  }

  // Scrolling continues the movement, and rendering stops once the hero is off screen.
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
  new IntersectionObserver(([entry]) => {
    gsap.ticker.remove(render);
    if (entry.isIntersecting) {
      gsap.ticker.add(render);
      drift.play();
    } else {
      drift.pause();
    }
  }).observe(hero);
}
