import { marquee } from '../data/cv';

// Decorative only: the same technologies are listed as text in the skills section.
// The words are drawn by CSS (::before reads data-word) instead of being real text. Generated
// content cannot be selected, so the outlined letters stay visible when page text is selected;
// a browser stops drawing the text outline of real text while it is selected.
const ROW = [...marquee, ...marquee];

function Track({ words, direction }: { words: string[]; direction: 1 | -1 }) {
  return (
    <div className="marquee__track" data-marquee-track={direction}>
      {words.map((word, i) => (
        <span data-word={word} key={i} />
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden data-marquee>
      <Track words={ROW} direction={-1} />
      <Track words={[...ROW].reverse()} direction={1} />
    </div>
  );
}
