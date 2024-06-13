import { ModalProps } from '@/types/Modal';
import { Flex } from '../common';
import ModalWrapper from '../layout/ModalWrapper';

const LoginModal = ({ isOpen, close }: ModalProps) => {
  return (
    isOpen && (
      <ModalWrapper isOpen={isOpen} close={close}>
        <Flex
          direction="col"
          className="size-[400px] rounded-xl bg-white p-5"
        ></Flex>
      </ModalWrapper>
    )
  );
};

export default LoginModal;
