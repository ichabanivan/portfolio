import type { ReactNode } from 'react';
import { Box, Text, vars } from '../ui';

interface Props {
  dates: ReactNode;
  duration?: ReactNode;
  /** Pass-through for the live duration refresh in src/lib/tenure.ts */
  tenure?: { start: string; end?: string };
  location: string;
}

/** Left column of a timeline entry: dates, time spent and place. Sticks while the entry scrolls. */
export default function Period({ dates, duration, tenure, location }: Props) {
  return (
    <Box
      position={{ default: 'static', lg: 'sticky', print: 'static' }}
      top={`calc(${vars.space.headerH} + 24px)`}
      alignSelf="start"
      display={{ default: 'grid', print: 'flex' }}
      gap={{ default: '2', print: '4' }}
    >
      <Text
        fontSize={14}
        fontWeight={600}
        letterSpacing="0.06em"
        textTransform="uppercase"
        color={vars.color.accentText}
      >
        {dates}
      </Text>
      {duration && (
        <Text
          fontSize={14}
          fontWeight={600}
          color={vars.color.text}
          data-tenure-start={tenure?.start}
          data-tenure-end={tenure?.end}
        >
          {duration}
        </Text>
      )}
      <Text variant="meta">{location}</Text>
    </Box>
  );
}
