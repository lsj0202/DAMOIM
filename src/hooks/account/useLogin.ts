import { myProfile } from '@/constants/UserKey';
import { ModalProps } from '@/types/Modal';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type LoginProps = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const useLogin = ({ close }: ModalProps) => {
  const queryClient = useQueryClient();

  const { mutate: loginMutate } = useMutation({
    mutationFn: login,
    mutationKey: [myProfile],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [myProfile] });
      alert('로그인에 성공하셨어요!');
      close();
    },
    onError: () => {
      alert('다시 로그인 해주세요.');
    },
  });

  return { loginMutate };
};
