import type { ReactNode } from 'react';
import { Box, Container, Text, vars, type StyleProps } from '../ui';

type Props = StyleProps & {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
};

/** A page section with its numbered heading. Heading text matches standard CV section names. */
export default function Section({ id, index, title, children, ...style }: Props) {
  const titleId = `${id}-title`;
  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={titleId}
      data-section
      paddingBlock={vars.space.section}
      {...style}
    >
      <Container>
        <Box
          as="header"
          display="flex"
          alignItems="baseline"
          gap="4"
          marginBottom={{ default: 'clamp(36px, 6vw, 72px)', print: '2' }}
          borderBottom={{ print: '1px solid #000' }}
        >
          <Box
            as="span"
            aria-hidden
            fontSize={14}
            fontWeight={600}
            letterSpacing="0.12em"
            color={vars.color.accentText}
            display={{ print: 'none' }}
          >
            {index}
          </Box>{' '}
          <Text
            as="h2"
            variant="display"
            id={titleId}
            data-split
            fontSize={{ default: 'clamp(46px, 7.4vw, 104px)', print: '15pt' }}
            fontWeight={700}
            lineHeight={{ default: 0.95, print: 1.3 }}
          >
            {title}
          </Text>
        </Box>
        {children}
      </Container>
    </Box>
  );
}
