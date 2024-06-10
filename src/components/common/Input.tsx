import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import classNames from 'classnames';
import { CSSProperties, ForwardedRef, forwardRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoSearchSharp } from 'react-icons/io5';

type InputProps = {
  width?: number;
  height?: number;
  color?: 'orange' | 'gray' | 'white' | 'black';
  iconColor?: 'orange' | 'gray' | 'white' | 'black';
  className?: string;
  onFocus?: () => void;
  onSubmit: SubmitHandler<{ search: string }>;
};

const InputVariants = cva('', {
  variants: {
    color: {
      orange: 'border-orange-500',
      gray: 'border-gray-400',
      white: 'border-white',
      black: 'border-black',
    },
    iconColor: {
      orange: 'text-orange-500',
      gray: 'text-gray-400',
      white: 'text-white',
      black: 'text-black',
    },
  },
});

const Input = forwardRef(function Input(
  {
    width = 250,
    height,
    color = 'orange',
    iconColor = 'orange',
    className,
    onFocus,
    onSubmit,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { register, handleSubmit } = useForm<{ search: string }>();

  const inputWidth = width - 45;
  const Style: CSSProperties = { width, height };

  return (
    <div
      className={cn(
        classNames(InputVariants({ color }), className, 'border-2 flex'),
      )}
      style={Style}
      ref={ref}
      {...props}
    >
      <form
        className="flex justify-between p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('search')}
          placeholder="검색어를 입력해주세요"
          className="outline-0"
          onFocus={onFocus}
          style={{ width: inputWidth }}
        />
        <button type="submit" className="pl-1">
          <IoSearchSharp
            className={cn(
              classNames(InputVariants({ iconColor }), 'cursor-pointer'),
            )}
            size={22}
          />
        </button>
      </form>
    </div>
  );
});

export default Input;
