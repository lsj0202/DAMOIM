import { myProfile } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [myProfile] });
      alert('로그아웃 되었습니다.');
    },
  });

  return { logoutMutate };
};
