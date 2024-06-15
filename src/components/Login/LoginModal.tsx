'use client';

import { LoginElement } from '@/constants/InputElement';
import { useLogin } from '@/hooks/account/useLogin';
import { ModalProps } from '@/types/Modal';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { Button, Flex, Text } from '../common';
import ModalWrapper from '../layout/ModalWrapper';

type LoginModalProps = {
  email: string;
  password: string;
};

const LoginModal = ({ isOpen, close }: ModalProps) => {
  const { register, handleSubmit, setValue } = useForm<LoginModalProps>();

  const { loginMutate } = useLogin({ isOpen, close });

  const onSubmit = (formData: LoginModalProps) => {
    loginMutate(formData);
  };

  useEffect(() => {
    setValue('email', '');
    setValue('password', '');
  }, [setValue]);

  return (
    isOpen && (
      <ModalWrapper isOpen={isOpen} close={close}>
        <Flex
          direction="col"
          className="size-[400px] rounded-xl bg-white p-5"
          items="center"
          justify="center"
        >
          <Flex items="center" justify="between" className="mb-5 w-4/5">
            <Text size="md">로그인</Text>
            <Text size="lg" className="cursor-pointer">
              <MdClose onClick={close} />
            </Text>
          </Flex>
          <form
            className="flex h-[225px] flex-col items-center justify-end gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {LoginElement.map((inputData) => (
              <Flex key={inputData.id} direction="col" gap={3}>
                <Text>{inputData.title}</Text>
                <input
                  className="w-[280px] flex-1 rounded-md border p-3"
                  {...register(inputData.InputValue as keyof LoginModalProps, {
                    required: inputData.InputText,
                  })}
                  type={inputData.InputValue}
                  placeholder={inputData.InputText}
                />
              </Flex>
            ))}
            <Button size="md" className="mt-3">
              로그인
            </Button>
          </form>
        </Flex>
      </ModalWrapper>
    )
  );
};

export default LoginModal;
