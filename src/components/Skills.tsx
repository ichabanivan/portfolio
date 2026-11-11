import Section from './Section';
import { skills } from '../data/cv';

export default function Skills() {
  return (
    <Section id="skills" index="03" title="Technical Skills">
      <div className="skills">
        {skills.map((skill) => (
          <div className="skill" data-reveal key={skill.group}>
            <h3 className="skill__group">{skill.group}</h3>
            <ul className="chips">
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
