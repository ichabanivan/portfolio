import { profile } from '../data/cv';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

// Rendered to static HTML; the menu toggle and scroll state are wired up in src/scripts/main.ts.
export default function Header() {
  return (
    <header className="header" data-header>
      <div className="header__inner">
        <a className="header__logo" href="#top" aria-label={`${profile.name}, back to top`}>
          I<span>/</span>C
        </a>
        <button
          className="nav__toggle"
          type="button"
          aria-label="Menu"
          aria-expanded="false"
          aria-controls="site-nav"
          data-nav-toggle
        >
          <span />
          <span />
        </button>
        <nav className="nav" id="site-nav" aria-label="Sections">
          <ul className="nav__list">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a className="nav__link" href={link.href} data-nav-link>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn--small btn--primary"
            href={profile.cvDoc}
            target="_blank"
            rel="noopener"
          >
            CV
          </a>
        </nav>
      </div>
      <div className="progress" data-progress aria-hidden />
    </header>
  );
}
