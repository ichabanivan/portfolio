import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { initScroll } from './scroll';
import { refreshTenures } from '../lib/tenure';
import { media } from '../ui/media';

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setOpen = (open: boolean) => {
    header.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle?.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  header.querySelectorAll('nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  window.matchMedia(media.lg).addEventListener('change', () => setOpen(false));
}

initHeader();
refreshTenures();

// Scroll animations run only when the visitor has not asked for reduced motion.
// The hero animation lives in its React component (src/components/Hero.tsx).
// The inline script in <head> adds the "js" class under the same condition.
if (document.documentElement.classList.contains('js')) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  window.__motionReady = true;

  initScroll();

  // Web fonts change text metrics, so trigger positions are measured again once they load.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
