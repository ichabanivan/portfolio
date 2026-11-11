import Section from './Section';
import { profile } from '../data/cv';

export default function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="about">
        {profile.summary.map((paragraph) => (
          <p data-reveal key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
