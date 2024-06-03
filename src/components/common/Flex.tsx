import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import classNames from 'classnames';
import { CSSProperties, ForwardedRef, forwardRef } from 'react';

type FlexProps = {
  items?: 'start' | 'end' | 'center' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'between' | 'evenly' | 'around';
  direction?: 'col' | 'row';
  gap?: CSSProperties['gap'];
  className?: string;
  children?: React.ReactNode;
};

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
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
    },
  },
});

const Flex = forwardRef(function Flex(
  { items, justify, direction, gap, className, children, ...props }: FlexProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const StyleGap: CSSProperties = { gap };

  return (
    <div
      ref={ref}
      className={cn(
        classNames(FlexVariants({ items, justify, direction }), className),
      )}
      style={StyleGap}
      {...props}
    >
      {children}
    </div>
  );
});

export default Flex;
