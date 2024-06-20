import { UserProfile, application, sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type ApplicationVariables = {
  userId: string;
  clubId: number;
};

const applicationSportsClub = async ({
  userId,
  clubId,
}: ApplicationVariables) => {
  const { data } = await supabase
    .from('application')
    .insert([{ user_id: userId, club_id: clubId, status: 'pending' }]);

  return { data };
};

export const useApplicationSportsClub = () => {
  const queryClient = useQueryClient();

  const { mutate: applicationSportsClubMutate } = useMutation({
    mutationFn: ({ userId, clubId }: ApplicationVariables) =>
      applicationSportsClub({ userId, clubId }),
    mutationKey: [sportsClub, application],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [sportsClub] });
      queryClient.invalidateQueries({ queryKey: [UserProfile] });
      queryClient.invalidateQueries({ queryKey: [application] });
      alert('신청이 완료됐어요!');
    },
  });

  return { applicationSportsClubMutate };
};
