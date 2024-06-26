import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import classNames from 'classnames';
import { CSSProperties, ForwardedRef, HTMLAttributes, forwardRef } from 'react';

type FlexProps = {
  items?: 'start' | 'end' | 'center' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'between' | 'evenly' | 'around';
  direction?: 'col' | 'row';
  wrap?: 'wrap' | 'noWrap';
  gap?: CSSProperties['gap'];
  className?: string;
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const FlexVariants = cva('flex', {
  variants: {
    items: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      evenly: 'justify-evenly',
      around: 'justify-around',
    },
    direction: {
      col: 'flex-col',
      row: 'flex-row',
    },
    wrap: {
      wrap: 'flex-wrap',
      noWrap: 'flex-nowrap',
    },
  },
});

const Flex = forwardRef(function Flex(
  {
    items,
    justify,
    direction,
    gap,
    wrap,
    className,
    children,
    ...props
  }: FlexProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const StyleGap: CSSProperties = { gap };

  return (
    <div
      ref={ref}
      className={cn(
        classNames(
          FlexVariants({ items, justify, wrap, direction }),
          className,
        ),
      )}
      style={StyleGap}
      {...props}
    >
      {children}
    </div>
  );
});

export default Flex;
