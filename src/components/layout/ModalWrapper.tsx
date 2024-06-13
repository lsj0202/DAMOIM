import { ModalProps } from '@/types/Modal';

export type ModalWrapperProps = {
  children: React.ReactNode;
} & ModalProps;

const ModalWrapper = ({ isOpen, close, children }: ModalWrapperProps) => {
  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={close}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    )
  );
};

export default ModalWrapper;
