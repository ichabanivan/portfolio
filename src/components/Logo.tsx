import { Box, logoStyles as s, type BoxProps } from '../ui';

const ARC = 'M48 24v-5a7 7 0 0 0-7-7h-6a7 7 0 0 0-7 7v26a7 7 0 0 0 7 7h6a7 7 0 0 0 7-7v-5';

export default function LogoMark(props: BoxProps<'svg'>) {
  return (
    <Box as="svg" viewBox="0 0 64 64" aria-hidden focusable="false" {...props}>
      <rect className={s.tile} x="0.5" y="0.5" width="63" height="63" rx="15.5" />
      <rect className={s.stem} x="12" y="8" width="8" height="48" />
      <path className={s.arc} d={ARC} pathLength={1} />
    </Box>
  );
}
