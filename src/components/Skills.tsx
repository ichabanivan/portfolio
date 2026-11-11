import Section from './Section';
import { skills } from '../data/cv';
import { Box, Card, Text, vars } from '../ui';

// The first two groups share a row and the third takes a full row; the rest go three to a row
// on wide screens, two on tablets and one on phones.
const span = (i: number) =>
  i === 2
    ? 'span 12'
    : i < 2
      ? { default: 'span 12', md: 'span 6' }
      : { default: 'span 12', md: 'span 6', xl: 'span 4' };

const PrintOnly = ({ children }: { children: string }) => (
  <Box as="span" display={{ default: 'none', print: 'inline' }}>
    {children}
  </Box>
);

export default function Skills() {
  return (
    <Section id="skills" index="03" title="Technical Skills">
      <Box
        display={{ default: 'grid', print: 'block' }}
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        gap="4"
      >
        {skills.map((skill, i) => (
          <Card
            data-reveal
            key={skill.group}
            gridColumn={span(i)}
            borderColor={{ hover: 'rgba(205, 13, 46, 0.6)' }}
            background={{ default: vars.color.surface, hover: vars.color.surface2, print: 'none' }}
            transition="border-color 0.4s, background-color 0.4s"
            marginBottom={{ print: '1' }}
            breakInside={{ print: 'avoid' }}
          >
            <Text as="h3" variant="eyebrow" display={{ print: 'inline' }}>
              {skill.group}
              <PrintOnly>: </PrintOnly>
            </Text>
            <Box
              as="ul"
              display={{ default: 'flex', print: 'inline' }}
              flexWrap="wrap"
              gap="2"
              marginTop={{ default: '4', print: '0' }}
            >
              {skill.items.map((item, j) => (
                  <Box
                    as="li"
                    key={item}
                    display={{ print: 'inline' }}
                    padding={{ default: '2 3', print: '0' }}
                    border={{ default: `1px solid ${vars.color.line}`, print: 0 }}
                    borderRadius={999}
                    fontSize={{ default: 14, print: '10.5pt' }}
                    lineHeight={1.3}
                    color={vars.color.text}
                  >
                    {item}
                    {j < skill.items.length - 1 && <PrintOnly>, </PrintOnly>}
                  </Box>
              ))}
            </Box>
          </Card>
        ))}
      </Box>
    </Section>
  );
}
