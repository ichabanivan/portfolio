import Section from './Section';
import { profile } from '../data/cv';
import { Box, Text, vars } from '../ui';

export default function About() {
  return (
    <Section id="about" index="01" title="About">
      <Box
        display={{ default: 'grid', print: 'block' }}
        gap="6"
        maxWidth={{ default: '62ch', print: 'none' }}
        lineHeight={1.5}
      >
        {profile.summary.map((paragraph, i) => (
          <Text
            variant="lead"
            data-reveal
            key={paragraph}
            fontWeight={{ default: 300, print: 400 }}
            color={i === 0 ? vars.color.white : vars.color.muted}
            marginTop={i === 0 ? undefined : { print: '1' }}
          >
            {paragraph}
          </Text>
        ))}
      </Box>
    </Section>
  );
}
