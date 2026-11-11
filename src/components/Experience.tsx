import type { ReactNode } from 'react';
import Section from './Section';
import Period from './Period';
import { experience, type Role } from '../data/cv';
import type { Logos } from '../lib/documents';
import { tenure } from '../lib/tenure';
import { Box, Card, Text, vars } from '../ui';

// The dates column and the gap after it place the timeline line and its dots
const META_WIDTH = '260px';
const COLUMN_GAP = 'clamp(24px, 4vw, 56px)';
const LINE_LEFT = `calc(${META_WIDTH} + ${COLUMN_GAP} / 2)`;

const Strong = ({ children }: { children: ReactNode }) => (
  <Box as="strong" color={vars.color.text} fontWeight={600}>
    {children}
  </Box>
);

function RoleCard({ role, logos, last }: { role: Role; logos: Logos; last: boolean }) {
  const logo = role.logo ? logos[role.logo] : null;
  return (
    <Box
      as="article"
      data-reveal
      group
      position="relative"
      display={{ default: 'grid', print: 'block' }}
      gridTemplateColumns={{ default: 'minmax(0, 1fr)', lg: `${META_WIDTH} minmax(0, 1fr)` }}
      gap={{ default: '4', lg: COLUMN_GAP }}
      paddingLeft={{ default: '8', lg: '0', print: '0' }}
      paddingBottom={{ default: last ? '0' : 'clamp(48px, 7vw, 96px)', print: '3' }}
    >
      {/* Timeline dot */}
      <Box
        aria-hidden
        position="absolute"
        top={8}
        left={{ default: 0, lg: `calc(${LINE_LEFT} - 5px)` }}
        width={11}
        height={11}
        borderRadius="50%"
        background={vars.color.bg}
        border={`2px solid ${vars.color.accent}`}
        display={{ print: 'none' }}
      />
      <Period
        dates={
          <>
            <time dateTime={role.start.iso}>{role.start.label}</time>
            {' - '}
            {role.end.iso ? <time dateTime={role.end.iso}>{role.end.label}</time> : role.end.label}
          </>
        }
        duration={tenure(role.start.iso, role.end.iso)}
        tenure={{ start: role.start.iso, end: role.end.iso }}
        location={role.location}
      />
      <div>
        {/* Company name on the left, its logo on the right. The logo files are dark-page versions
            (light lettering), so they sit directly on the background with no tile. */}
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          gap="3 6"
        >
          <Text
            as="h3"
            variant="display"
            fontSize={{ default: 'clamp(34px, 4vw, 52px)', print: '13pt' }}
          >
            {role.company}
          </Text>
          {/* Decorative: the company name is already in the heading */}
          {logo && (
            <Box
              as="img"
              src={logo.src}
              htmlWidth={logo.width}
              htmlHeight={logo.height}
              alt=""
              loading="lazy"
              flex="none"
              width="auto"
              height={logo.displayHeight ?? 22}
              maxWidth={150}
              objectFit="contain"
              opacity={{ default: 0.75, groupHover: 1 }}
              transition="opacity 0.4s"
              display={{ print: 'none' }}
            />
          )}
        </Box>
        <Text
          marginTop={{ default: '2', print: '0' }}
          fontSize={{ default: 18, print: '11pt' }}
          fontWeight={600}
          color={vars.color.text}
        >
          {role.title}
        </Text>
        {role.summary && (
          <Text marginTop={{ default: '5', print: '1' }} color={vars.color.muted}>
            {role.summary}
          </Text>
        )}
        {role.tech && (
          <Text
            marginTop={{ default: '4', print: '1' }}
            padding={{ default: '4', print: '0' }}
            borderLeft={{ default: `2px solid ${vars.color.accent}`, print: 0 }}
            borderRadius="0 10px 10px 0"
            background={{ default: vars.color.surface, print: 'none' }}
            fontSize={14}
            color={vars.color.muted}
          >
            <Strong>Technologies:</Strong> {role.tech}
          </Text>
        )}
        {role.bullets && (
          <>
            <Text
              as="h4"
              marginTop={{ default: '6', print: '1' }}
              fontSize={13}
              fontWeight={600}
              letterSpacing="0.1em"
              textTransform="uppercase"
              color={vars.color.muted}
            >
              Responsibilities
            </Text>
            <BulletList items={role.bullets} />
          </>
        )}
        {role.projects && (
          <Box display="grid" gap="4" marginTop={{ default: '5', print: '1' }}>
            {role.projects.map((project) => (
              <Card
                key={project.name}
                padding={{ default: '5', print: '0' }}
                breakInside={{ print: 'avoid-page' }}
              >
                <Text as="h4" fontSize={17} fontWeight={600} color="#fff">
                  {project.name}
                </Text>
                <Text marginTop="2" color={vars.color.muted}>
                  {project.description}
                </Text>
                {project.tech && (
                  <Text marginTop="2" fontSize={14} color={vars.color.muted}>
                    <Strong>Technologies:</Strong> {project.tech}
                  </Text>
                )}
                {project.responsibilities && (
                  <Text marginTop="2" fontSize={14} color={vars.color.muted}>
                    <Strong>Responsibilities:</Strong> {project.responsibilities}
                  </Text>
                )}
              </Card>
            ))}
          </Box>
        )}
      </div>
    </Box>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <Box
      as="ul"
      display="grid"
      gap={{ default: '3', print: '1' }}
      marginTop={{ default: '3', print: '1' }}
    >
      {items.map((item) => (
        <Box
          as="li"
          key={item}
          position="relative"
          paddingLeft={{ default: '6', print: '4' }}
          breakInside={{ print: 'avoid-page' }}
        >
          <Box
            as="span"
            aria-hidden
            position="absolute"
            top="0.7em"
            left={0}
            width={{ default: 10, print: '4pt' }}
            height={{ default: 2, print: 1 }}
            background={vars.color.accent}
          />
          {item}
        </Box>
      ))}
    </Box>
  );
}

export default function Experience({ logos }: { logos: Logos }) {
  return (
    <Section id="experience" index="02" title="Professional Experience">
      <Box data-timeline position="relative">
        <Box
          data-timeline-line
          aria-hidden
          position="absolute"
          top={8}
          bottom={0}
          left={{ default: 5, lg: LINE_LEFT }}
          width={1}
          background={`linear-gradient(to bottom, ${vars.color.accent}, rgba(205, 13, 46, 0.15))`}
          transformOrigin="top"
          display={{ print: 'none' }}
        />
        {experience.map((role, i) => (
          <RoleCard
            role={role}
            logos={logos}
            last={i === experience.length - 1}
            key={`${role.company}-${role.start.iso}`}
          />
        ))}
      </Box>
    </Section>
  );
}
