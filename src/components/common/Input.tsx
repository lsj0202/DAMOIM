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
      ref={ref}
      className={cn(classNames(InputVariants({ color }), 'border-2 flex'))}
      style={Style}
      {...props}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between p-2"
      >
        <input
          {...register('search')}
          placeholder="검색어를 입력해주세요"
          className="outline-0"
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
