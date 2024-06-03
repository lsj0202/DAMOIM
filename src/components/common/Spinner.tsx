import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/utils/style';

type SpinnerProps = {
  size?: 'lg' | 'md' | 'sm';
};

const SpinnerVariants = cva(
  'animate-spin rounded-full border-2 border-solid border-orange-500 border-t-slate-50',
  {
    variants: {
      size: {
        lg: 'size-4',
        md: 'size-5',
        sm: 'size-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const Spinner = forwardRef(function Spinner(
  { size }: SpinnerProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className="flex items-center justify-center">
      <span className={cn(SpinnerVariants({ size }))} />
    </div>
  );
});

export default Spinner;
