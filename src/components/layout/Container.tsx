import { cn } from '@/utils';
import classNames from 'classnames';

type ContainerProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Container = ({ children, className, style }: ContainerProps) => {
  return (
    <section
      className={cn(
        classNames('w-full mx-auto max-w-[1200px] px-5', className),
      )}
      style={style}
    >
      {children}
    </section>
  );
};

export default Container;
