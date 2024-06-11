import classNames from 'classnames';

type WrapperProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Wrapper = ({ children, style, className }: WrapperProps) => {
  return (
    <section className={classNames('w-full', className)} style={style}>
      {children}
    </section>
  );
};

export default Wrapper;
