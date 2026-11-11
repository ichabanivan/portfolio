import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Item {
  src: string;
  caption: string;
  verify: string | null;
  width?: number;
  height?: number;
}

const SELECTOR = 'a[data-lightbox]';

const toItem = (link: HTMLAnchorElement): Item => ({
  src: link.href,
  caption: link.dataset.caption ?? '',
  verify: link.dataset.verify ?? null,
  width: Number(link.dataset.width) || undefined,
  height: Number(link.dataset.height) || undefined,
});

/**
 * Modal viewer for certificate and diploma scans.
 *
 * The thumbnails on the page are ordinary links to the large image (so they work without
 * JavaScript). This component intercepts clicks on them and shows the image in a native <dialog>,
 * which provides Escape-to-close, focus trapping and the backdrop.
 */
export default function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const figure = useRef<HTMLElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const item = index === null ? null : items[index];
  const many = items.length > 1;

  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null ? current : (current + delta + items.length) % items.length,
      ),
    [items.length],
  );

  // Open from any thumbnail on the page
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(SELECTOR);
      if (!link) return;
      event.preventDefault();
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(SELECTOR));
      setItems(links.map(toItem));
      setIndex(links.indexOf(link));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Keep the <dialog> in sync with state
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
  }, [index]);

  // Entrance for each image, skipped when the visitor prefers reduced motion
  useEffect(() => {
    if (index === null || !figure.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(
      figure.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    );
    return () => {
      tween.kill();
    };
  }, [index]);

  // Arrow keys move between documents
  useEffect(() => {
    if (index === null || !many) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, many, step]);

  return (
    <dialog
      className="lightbox"
      ref={dialog}
      aria-label={item?.caption || 'Document'}
      onClose={() => setIndex(null)}
      // A click on the dialog element itself is a click on the backdrop
      onClick={(event) => {
        if (event.target === dialog.current) setIndex(null);
      }}
    >
      {item && (
        <figure className="lightbox__figure" ref={figure}>
          <img
            className="lightbox__image"
            src={item.src}
            width={item.width}
            height={item.height}
            alt={item.caption}
            key={item.src}
          />
          <figcaption className="lightbox__caption">
            <span>{item.caption}</span>
            {item.verify && (
              <a className="link" href={item.verify} target="_blank" rel="noopener">
                Verify certificate
              </a>
            )}
          </figcaption>
        </figure>
      )}
      <button
        className="lightbox__button lightbox__button--close"
        type="button"
        aria-label="Close"
        onClick={() => setIndex(null)}
      >
        ×
      </button>
      {many && (
        <>
          <button
            className="lightbox__button lightbox__button--prev"
            type="button"
            aria-label="Previous document"
            onClick={() => step(-1)}
          >
            ‹
          </button>
          <button
            className="lightbox__button lightbox__button--next"
            type="button"
            aria-label="Next document"
            onClick={() => step(1)}
          >
            ›
          </button>
        </>
      )}
    </dialog>
  );
}
