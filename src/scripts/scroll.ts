import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export function initScroll(): void {
  // Reading progress bar in the header
  gsap.to('[data-progress]', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  // Section headings: letters rise in
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((heading) => {
    const split = SplitText.create(heading, { type: 'words,chars' });
    gsap.set(heading, { visibility: 'visible' });
    gsap.from(split.chars, {
      yPercent: 70,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.022,
      scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
    });
  });

  // Blocks fade up, staggered when several enter together
  gsap.set('[data-reveal]', { y: 32 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
      }),
  });

  // Stat counters
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const counter = { value: 0 };
    el.textContent = '0';
    gsap.to(counter, {
      value: target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = String(Math.round(counter.value));
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Technology marquee moves with the scroll, rows in opposite directions
  gsap.utils.toArray<HTMLElement>('[data-marquee-track]').forEach((track) => {
    const direction = Number(track.dataset.marqueeTrack);
    gsap.fromTo(
      track,
      { xPercent: direction < 0 ? 0 : -22 },
      {
        xPercent: direction < 0 ? -22 : 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-marquee]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    );
  });

  // Experience timeline line draws as you read
  const timeline = document.querySelector('[data-timeline]');
  if (timeline) {
    gsap.from('[data-timeline-line]', {
      scaleY: 0,
      ease: 'none',
      scrollTrigger: { trigger: timeline, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
    });
  }

  // Highlight the current section in the navigation
  const links = gsap.utils.toArray<HTMLAnchorElement>('[data-nav-link]');
  const setCurrent = (id: string | null) => {
    links.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  gsap.utils.toArray<HTMLElement>('[data-section]').forEach((section) => {
    // "Additional information" belongs to the Education nav item
    const id = section.id === 'additional' ? 'education' : section.id;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) setCurrent(id);
      },
      onLeaveBack: () => {
        if (section.id === 'about') setCurrent(null);
      },
    });
  });
}
