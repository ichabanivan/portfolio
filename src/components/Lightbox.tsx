import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import gsap from 'gsap';
import { Box, TextLink, effects, vars, type BoxProps, type StyleProps } from '../ui';

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

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
  }, [index]);

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
    <Box
      as="dialog"
      ref={dialog}
      className={effects.dialog}
      aria-label={item?.caption || 'Document'}
      onClose={() => setIndex(null)}
      onClick={(event: ReactMouseEvent<HTMLDialogElement>) => {
        if (event.target === dialog.current) setIndex(null);
      }}
      width="100vw"
      maxWidth="none"
      height="100dvh"
      maxHeight="none"
      margin="0"
      padding="clamp(56px, 7vw, 72px) clamp(12px, 6vw, 88px) clamp(16px, 3vw, 32px)"
      border={0}
      background="rgba(8, 8, 9, 0.94)"
      color={vars.color.text}
      overflow="auto"
    >
      {item && (
        <Box
          as="figure"
          ref={figure}
          display="grid"
          gap="4"
          justifyItems="center"
          margin="0"
          maxWidth="100%"
        >
          <Box
            as="img"
            src={item.src}
            htmlWidth={item.width}
            htmlHeight={item.height}
            alt={item.caption}
            key={item.src}
            width="auto"
            maxWidth="100%"
            height="auto"
            maxHeight="calc(100dvh - 190px)"
            borderRadius={8}
            background={vars.color.paper}
          />
          <Box
            as="figcaption"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap="2 5"
            fontSize={15}
            textAlign="center"
            color={vars.color.muted}
          >
            <span>{item.caption}</span>
            {item.verify && (
              <TextLink href={item.verify} target="_blank" rel="noopener">
                Verify certificate
              </TextLink>
            )}
          </Box>
        </Box>
      )}
      <RoundButton aria-label="Close" onClick={() => setIndex(null)} top={12} right={12}>
        ×
      </RoundButton>
      {many && (
        <>
          <RoundButton aria-label="Previous document" onClick={() => step(-1)} left={12} {...SIDE}>
            ‹
          </RoundButton>
          <RoundButton aria-label="Next document" onClick={() => step(1)} right={12} {...SIDE}>
            ›
          </RoundButton>
        </>
      )}
    </Box>
  );
}

const SIDE = {
  top: { default: 'auto', lg: '50%' },
  bottom: { default: 12, lg: 'auto' },
  translate: { default: 'none', lg: '0 -50%' },
} satisfies StyleProps;

function RoundButton(props: BoxProps<'button'>) {
  return (
    <Box
      as="button"
      type="button"
      position="fixed"
      display="grid"
      placeItems="center"
      width={44}
      height={44}
      padding="0 0 1"
      border="1px solid"
      borderColor={{ default: vars.color.line, hover: vars.color.accent }}
      borderRadius="50%"
      background={{ default: 'rgba(20, 20, 22, 0.9)', hover: vars.color.accent }}
      color={vars.color.white}
      fontSize={26}
      lineHeight={1}
      cursor="pointer"
      transition="background-color 0.3s, border-color 0.3s"
      {...props}
    />
  );
}
