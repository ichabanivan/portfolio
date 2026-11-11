import Section from './Section';
import {
  education,
  certifications,
  volunteering,
  languages,
  type Certification,
} from '../data/cv';
import type { DocumentImage, DocumentImages } from '../lib/documents';

interface ThumbProps {
  image: DocumentImage;
  caption: string;
  verify?: string;
  className?: string;
}

/**
 * A scan preview. It is a plain link to the large image; Lightbox.tsx upgrades the click to a
 * modal when JavaScript is available.
 */
function DocumentThumb({ image, caption, verify, className }: ThumbProps) {
  return (
    <a
      className={['doc', className].filter(Boolean).join(' ')}
      href={image.full}
      data-lightbox
      data-caption={caption}
      data-verify={verify}
      data-width={image.width}
      data-height={image.height}
      aria-label={`View document: ${caption}`}
    >
      <img src={image.thumb} alt="" loading="lazy" decoding="async" />
    </a>
  );
}

const certificateMeta = (certificate: Certification) =>
  [certificate.issuer, certificate.year].filter(Boolean).join(', ');

export function Education({ documents }: { documents: DocumentImages }) {
  return (
    <Section id="education" index="04" title="Education">
      <div className="schools">
        {education.map((school) => (
          <article className="school" data-reveal key={`${school.school}-${school.start.iso}`}>
            <div className="role__meta">
              <p className="role__dates">
                <time dateTime={school.start.iso}>{school.start.label}</time>
                {' - '}
                <time dateTime={school.end.iso}>{school.end.label}</time>
              </p>
              <p className="role__location">{school.location}</p>
            </div>
            <div>
              <h3 className="school__name">{school.school}</h3>
              <p className="school__degree">{school.degree}</p>
              <ul className="school__details">
                {school.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <DocumentThumb
              className="school__diploma"
              image={documents[school.diploma]}
              caption={`${school.degree}. ${school.school}`}
            />
          </article>
        ))}
      </div>

      <h3 className="subhead" data-reveal>
        Certifications
      </h3>
      <ul className="certs">
        {certifications.map((certificate) => (
          <li className="cert" data-reveal key={certificate.title}>
            {certificate.image && (
              <DocumentThumb
                image={documents[certificate.image]}
                caption={`${certificate.title}. ${certificateMeta(certificate)}`}
                verify={certificate.url}
              />
            )}
            <div className="cert__body">
              <h4 className="cert__title">{certificate.title}</h4>
              <p className="cert__meta">{certificateMeta(certificate)}</p>
              {certificate.url && (
                <a className="cert__verify link" href={certificate.url} target="_blank" rel="noopener">
                  Verify
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function AdditionalInformation() {
  return (
    <Section id="additional" index="05" title="Additional Information">
      <div className="extras">
        <div className="extra" data-reveal>
          <h3 className="extra__title">Languages</h3>
          <ul className="extra__list">
            {languages.map((language) => (
              <li key={language.name}>
                {language.name} <span>({language.level})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="extra" data-reveal>
          <h3 className="extra__title">Volunteering</h3>
          <ul className="extra__list">
            {volunteering.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
