import { Box, type BoxProps } from './Box';
import { vars } from './theme.css';

const underline = (thickness: string) =>
  `linear-gradient(${vars.color.accent}, ${vars.color.accent}) no-repeat 0 100% / 100% ${thickness}`;

/** Inline link with an accent underline that fills the text on hover. */
export function TextLink(props: BoxProps<'a'>) {
  return (
    <Box
      as="a"
      color={{ default: vars.color.text, hover: '#fff' }}
      background={{ default: underline('1px'), print: 'none' }}
      backgroundSize={{ hover: '100% 100%' }}
      paddingBottom="1"
      transition={`background-size 0.4s ${vars.ease}, color 0.3s`}
      {...props}
    />
  );
}

export { underline };
