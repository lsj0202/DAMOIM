import { ModalProps } from '@/types/Modal';
import { UserProfile } from '@/types/UserProfile';
import supabase from '@/utils/supabase';
import { useMutation } from '@tanstack/react-query';

export const signUp = async ({
  email,
  password,
  name,
  avatar_url,
  age,
  location,
  introduce,
}: UserProfile) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar_url,
        age,
        location,
        introduce,
      },
    },
  });

  return { data, error };
};

export const useSignUp = ({ close }: ModalProps) => {
  const { mutate: signUpMutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      close();
      alert('회원 가입에 성공하셨어요!');
    },
    onError: () => {
      alert('회원가입에 실패하셨어요.');
    },
  });

  return { signUpMutate };
};
