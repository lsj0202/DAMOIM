import { InputElement } from '@/constants/InputElement';
import { useSignUp } from '@/hooks/account/useSignUp';
import { ModalProps } from '@/types/Modal';
import { UserProfile } from '@/types/UserProfile';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { Button, Flex, Text } from '../common';
import ModalWrapper from '../layout/ModalWrapper';

const SignUpModal = ({ isOpen, close }: ModalProps) => {
  const { register, handleSubmit } = useForm<UserProfile>();

  const { signUpMutate } = useSignUp({ isOpen, close });

  const onSubmit = async (formData: UserProfile) => {
    await signUpMutate(formData);
  };

  return (
    isOpen && (
      <ModalWrapper isOpen={isOpen} close={close}>
        <Flex
          direction="col"
          items="center"
          justify="center"
          className="h-[600px] w-[400px] rounded-xl bg-white p-5"
        >
          <Flex items="center" justify="between" className="mb-5 w-4/5">
            <Text size="md">회원가입</Text>
            <Text size="lg" className="cursor-pointer">
              <MdClose onClick={close} />
            </Text>
          </Flex>
          <form
            className="flex flex-col items-center gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {InputElement.map((inputData) => (
              <Flex key={inputData.id} direction="col" gap={3}>
                <Text>{inputData.title}</Text>
                <input
                  className="w-[280px] flex-1 rounded-md border p-3"
                  {...register(inputData.InputValue as keyof UserProfile, {
                    required: inputData.InputText,
                  })}
                  type={inputData.InputValue}
                  placeholder={inputData.InputText}
                />
              </Flex>
            ))}
            <Button size="md" className="mt-3">
              회원가입
            </Button>
          </form>
        </Flex>
      </ModalWrapper>
    )
  );
};

export default SignUpModal;
