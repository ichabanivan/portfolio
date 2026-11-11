import Section from './Section';
import { experience, type Role } from '../data/cv';
import type { Logos } from '../lib/documents';

const plural = (count: number, unit: string) => `${count} ${unit}${count === 1 ? '' : 's'}`;

/**
 * Time in a role, counting both the first and the last month (November 2020 to November 2021 is
 * 1 year 1 month, the way LinkedIn shows it). A current role is measured up to the build date.
 */
function tenure(startIso: string, endIso?: string): string {
  const [startYear, startMonth] = startIso.split('-').map(Number);
  const now = new Date();
  const [endYear, endMonth] = endIso
    ? endIso.split('-').map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const months = Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth) + 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && plural(years, 'year'), rest && plural(rest, 'month')].filter(Boolean).join(' ');
}

function RoleCard({ role, logos }: { role: Role; logos: Logos }) {
  const logo = role.logo ? logos[role.logo] : null;
  return (
    <article className="role" data-reveal>
      <div className="role__meta">
        <p className="role__dates">
          <time dateTime={role.start.iso}>{role.start.label}</time>
          {' - '}
          {role.end.iso ? <time dateTime={role.end.iso}>{role.end.label}</time> : role.end.label}
        </p>
        <p className="role__duration">{tenure(role.start.iso, role.end.iso)}</p>
        <p className="role__location">{role.location}</p>
      </div>
      <div className="role__body">
        <div className="role__head">
          <h3 className="role__company">{role.company}</h3>
          {/* Decorative: the company name is already in the heading */}
          {logo && (
            <img
              className="role__logo"
              src={logo.src}
              width={logo.width}
              height={logo.height}
              style={logo.displayHeight ? { height: logo.displayHeight } : undefined}
              alt=""
              loading="lazy"
            />
          )}
        </div>
        <p className="role__title">{role.title}</p>
        {role.summary && <p className="role__summary">{role.summary}</p>}
        {role.tech && (
          <p className="role__tech">
            <strong>Technologies:</strong> {role.tech}
          </p>
        )}
        {role.bullets && (
          <>
            <h4 className="role__label">Responsibilities</h4>
            <ul className="bullets">
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </>
        )}
        {role.projects && (
          <div className="projects">
            {role.projects.map((project) => (
              <div className="project" key={project.name}>
                <h4 className="project__name">{project.name}</h4>
                <p className="project__description">{project.description}</p>
                {project.tech && (
                  <p className="project__meta">
                    <strong>Technologies:</strong> {project.tech}
                  </p>
                )}
                {project.responsibilities && (
                  <p className="project__meta">
                    <strong>Responsibilities:</strong> {project.responsibilities}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Experience({ logos }: { logos: Logos }) {
  return (
    <Section id="experience" index="02" title="Professional Experience">
      <div className="timeline" data-timeline>
        <div className="timeline__line" data-timeline-line aria-hidden />
        {experience.map((role) => (
          <RoleCard role={role} logos={logos} key={`${role.company}-${role.start.iso}`} />
        ))}
      </div>
    </Section>
  );
}
