import { tenure } from '../lib/tenure';
import { Box, Text, vars } from '../ui';

export const PERIOD_WIDTH = '260px';

interface DateLabel {
  label: string;
  iso?: string;
}

interface Props {
  start: Required<DateLabel>;
  end: DateLabel;
  location: string;
  showDuration?: boolean;
}

const Time = ({ date }: { date: DateLabel }) =>
  date.iso ? <time dateTime={date.iso}>{date.label}</time> : <>{date.label}</>;

export default function Period({ start, end, location, showDuration }: Props) {
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
        <Time date={start} /> - <Time date={end} />
      </Text>
      {showDuration && (
        <Text
          fontSize={14}
          fontWeight={600}
          color={vars.color.text}
          data-tenure-start={start.iso}
          data-tenure-end={end.iso}
        >
          {tenure(start.iso, end.iso)}
        </Text>
      )}
      <Text variant="meta">{location}</Text>
    </Box>
  );
}
