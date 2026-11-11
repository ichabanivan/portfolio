import Section from './Section';
import { profile } from '../data/cv';

interface Props {
  cvHref: string | null;
  year: number;
}

export default function Contact({ cvHref, year }: Props) {
  return (
    <>
      <Section id="contact" index="06" title="Contact" className="contact">
        <p className="contact__lead" data-reveal>
          Open to senior and lead engineering roles. The fastest way to reach me is email.
        </p>
        <a className="contact__email" href={`mailto:${profile.email}`} data-reveal>
          {profile.email}
        </a>
        <div className="contact__links" data-reveal>
          <a className="btn" href={profile.linkedin} rel="me noopener">
            LinkedIn
          </a>{' '}
          <a className="btn" href={profile.github} rel="me noopener">
            GitHub
          </a>{' '}
          {cvHref && (
            <a className="btn btn--primary" href={cvHref} download>
              Download CV
            </a>
          )}
        </div>
      </Section>
      <footer className="footer">
        <p>
          © {year} {profile.name}
        </p>
        <p>{profile.location}</p>
      </footer>
    </>
  );
}
