import type { ReactNode } from 'react';

interface Props {
  id: string;
  index: string;
  title: string;
  className?: string;
  children: ReactNode;
}

/** A page section with its numbered heading. Heading text matches standard CV section names. */
export default function Section({ id, index, title, className, children }: Props) {
  const titleId = `${id}-title`;
  return (
    <section
      className={['section', className].filter(Boolean).join(' ')}
      id={id}
      aria-labelledby={titleId}
      data-section
    >
      <div className="wrap">
        <header className="section__head">
          <span className="section__index" aria-hidden>
            {index}
          </span>{' '}
          <h2 className="section__title" id={titleId} data-split>
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
