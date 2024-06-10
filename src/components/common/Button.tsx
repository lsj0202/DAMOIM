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
  disabled?: boolean;
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
      gray: 'bg-slate-400',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
  },
  compoundVariants: [
    { bgColor: 'white', disabled: false, class: 'hover:bg-gray-300' },
    { bgColor: 'black', disabled: false, class: 'hover:bg-gray-900' },
    { bgColor: 'orange', disabled: false, class: 'hover:bg-orange-600' },
    { bgColor: 'gray', disabled: false, class: 'hover:bg-slate-600' },
  ],
  defaultVariants: {
    size: 'lg',
    color: 'white',
    bgColor: 'orange',
    disabled: false,
  },
});

const Button = forwardRef(function Button(
  {
    size,
    color,
    bgColor,
    className,
    children,
    disabled,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        classNames(
          ButtonVariants({
            size,
            color,
            bgColor,
            disabled,
          }),
          className,
        ),
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
