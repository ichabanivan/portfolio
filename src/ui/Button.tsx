import { Box, type BoxProps } from './Box';
import { vars } from './theme.css';

type Props = BoxProps<'a'> & {
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
};

/** Pill-shaped call to action. Always a link: every button on the site navigates somewhere. */
export function Button({ variant = 'secondary', size = 'medium', ...props }: Props) {
  const primary = variant === 'primary';
  const small = size === 'small';
  return (
    <Box
      as="a"
      display={{ default: 'inline-flex', print: 'none' }}
      alignItems="center"
      justifyContent="center"
      gap="3"
      minHeight={small ? 40 : 48}
      padding={small ? '0 5' : '0 6'}
      border="1px solid"
      borderColor={
        primary
          ? { default: vars.color.accent, hover: '#e3123a' }
          : { default: vars.color.line, hover: 'rgba(255, 255, 255, 0.5)' }
      }
      borderRadius={999}
      background={primary ? { default: vars.color.accent, hover: '#e3123a' } : undefined}
      color={primary ? '#fff' : undefined}
      fontSize={small ? 14 : 15}
      fontWeight={600}
      letterSpacing="0.01em"
      whiteSpace="nowrap"
      transform={{ hover: 'translateY(-2px)' }}
      transition={`background-color 0.3s, border-color 0.3s, color 0.3s, transform 0.3s ${vars.ease}`}
      {...props}
    />
  );
}
