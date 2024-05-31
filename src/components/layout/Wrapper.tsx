import classNames from 'classnames';

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <section className={classNames('w-full', className)}>{children}</section>
  );
};

export default Wrapper;
