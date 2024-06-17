import { CreateSportsClub } from '@/components/SportsClubs/CreateSportsClub';
import { UserProfile, sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createSportsClub = async (data: CreateSportsClub) => {
  const { error } = await supabase.from('sportsclub').insert(data);
  return { error };
};

type EditUserProfileProps = {
  close: () => void;
};

export const useCreateSportsClub = ({ close }: EditUserProfileProps) => {
  const queryClient = useQueryClient();

  const { mutate: createSportsClubMutate } = useMutation({
    mutationFn: ({ data }: { data: CreateSportsClub }) =>
      createSportsClub(data),
    mutationKey: [sportsClub],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UserProfile] });
      queryClient.invalidateQueries({ queryKey: [sportsClub] });
      alert('스포츠클럽 등록이 완료되었어요!');
      close();
    },
    onError: () => {
      alert('스포츠클럽 등록에 실패했어요.');
    },
  });

  return { createSportsClubMutate };
};
