import { ModalProps } from '@/types/Modal';
import { LocalStorage } from '@/utils/localstorage';
import supabase from '@/utils/supabase';
import { useMutation } from '@tanstack/react-query';

type LoginProps = {
  email: string;
  password: string;
};

type Session = {
  access_token: string;
  refresh_token: string;
};

type AuthResponse = {
  data: {
    user: any;
    session: Session | null;
  };
  error: any;
};

export const login = async ({
  email,
  password,
}: LoginProps): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const useLogin = ({ close }: ModalProps) => {
  const storage = new LocalStorage();

  const { mutate: loginMutate } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { data } = response;
      // console.log('data_data', data.user.user_metadata);
      if (data && data.session) {
        storage.setItem('access_token', data.session.access_token);
        storage.setItem('refresh_token', data.session.refresh_token);
      }
      alert('로그인에 성공하셨어요!');
      close();
    },
    onError: () => {
      alert('다시 로그인 해주세요.');
    },
  });

  return { loginMutate };
};
