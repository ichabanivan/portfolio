import { Box, type BoxProps } from '../ui';

/**
 * The I/C monogram: a solid upright for the I and an open ring for the C, on a dark tile.
 * public/favicon.svg draws the same shapes, so keep the two in sync.
 */
export default function LogoMark(props: BoxProps<'svg'>) {
  return (
    <Box as="svg" viewBox="0 0 64 64" aria-hidden focusable="false" {...props}>
      <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="#131315" stroke="rgba(255,255,255,0.14)" />
      <rect x="13" y="17" width="8" height="30" rx="1.5" fill="#f4f4f5" />
      <path d="M48.4 22.1A13 13 0 1 0 48.4 41.9" fill="none" stroke="#cd0d2e" strokeWidth="8" />
    </Box>
  );
}
