import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import classNames from 'classnames';
import { forwardRef } from 'react';

type ButtonProps = {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  color?: 'orange' | 'black' | 'white' | 'gray';
  bgColor?: 'orange' | 'black' | 'white' | 'gray';
  className?: string;
  children: React.ReactNode;
};

const ButtonVariants = cva('', {
  variants: {
    size: {
      xl: 'w-48 rounded-xl py-5 font-bold',
      lg: 'w-40 rounded-lg py-4 font-semibold',
      md: 'w-36 rounded-lg py-3 font-semibold',
      sm: 'w-28 rounded-md py-2 font-medium',
    },
    color: {
      white: 'text-white',
      black: 'text-black',
      orange: 'text-orange-500',
      gray: 'text-slate-300',
    },
    bgColor: {
      white: 'bg-white',
      black: 'bg-black',
      orange: 'bg-orange-500',
      gray: 'bg-slate-300',
    },
  },
  compoundVariants: [
    { bgColor: 'white', class: 'transition ease-in-out hover:bg-gray-100' },
    { bgColor: 'black', class: 'transition ease-in-out hover:bg-gray-900' },
    { bgColor: 'orange', class: 'transition ease-in-out hover:bg-orange-600' },
    { bgColor: 'gray', class: 'transition ease-in-out hover:bg-slate-400' },
  ],
  defaultVariants: {
    size: 'lg',
    color: 'white',
    bgColor: 'orange',
  },
});

const Button = forwardRef(function Button(
  { size, color, bgColor, className, children }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      className={cn(
        classNames(ButtonVariants({ size, color, bgColor }), className),
      )}
    >
      {children}
    </button>
  );
});

export default Button;
