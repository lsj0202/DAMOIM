import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import classNames from 'classnames';
import { forwardRef } from 'react';

type TextProps = {
  size?: 'xl' | 'x' | 'lg' | 'md' | 'sm' | 'xs';
  color?: 'white' | 'black' | 'orange' | 'gray';
  weight?: 'bold' | 'semibold' | 'medium' | 'light';
  className?: string;
  children: React.ReactNode;
};

const TextVariants = cva('', {
  variants: {
    size: {
      xl: 'text-5xl leading-[55px]',
      x: 'text-4xl leading-[38px]',
      lg: 'text-xl',
      md: 'text-lg',
      sm: 'text-base',
      xs: 'text-sm',
    },
    color: {
      white: 'text-white',
      black: 'text-black',
      orange: 'text-orange-500',
      gray: 'text-slate-300',
    },
    weight: {
      bold: 'font-bold',
      semibold: 'font-semibold',
      medium: 'font-medium',
      light: 'font-light',
    },
    defaultVariants: {
      size: 'md',
      color: 'black',
      weight: 'medium',
    },
  },
});

const Text = forwardRef(function Text(
  { size, color, weight, className, children, ...props }: TextProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  return (
    <span
      ref={ref}
      {...props}
      className={cn(
        classNames(TextVariants({ size, color, weight }), className),
      )}
    >
      {children}
    </span>
  );
});

export default Text;
