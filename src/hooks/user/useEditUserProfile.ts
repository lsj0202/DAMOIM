import { UserProfile, myProfile } from '@/constants/UserKey';
import { EditUserProfile } from '@/types/UserProfile';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editUserProfile = async (data: EditUserProfile, id: string) => {
  const { error } = await supabase.from('userinfo').update(data).eq('id', id);
  return { error };
};

type EditUserProfileProps = {
  close: () => void;
};

export const useEditUserProfile = ({ close }: EditUserProfileProps) => {
  const queryClient = useQueryClient();

  const { mutate: editUserProfileMutate } = useMutation({
    mutationFn: ({ data, id }: { data: EditUserProfile; id: string }) =>
      editUserProfile(data, id),
    mutationKey: [myProfile],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [myProfile] });
      queryClient.invalidateQueries({ queryKey: [UserProfile] });
      alert('프로필 수정이 완료되었어요!');
      close();
    },
    onError: () => {
      alert('프로필 수정에 실패했어요.');
    },
  });

  return { editUserProfileMutate };
};
