import { cn } from '@/utils';
import classNames from 'classnames';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section
      className={cn(
        classNames('w-full mx-auto max-w-[1200px] px-5', className),
      )}
    >
      {children}
    </section>
  );
};

export default Container;
