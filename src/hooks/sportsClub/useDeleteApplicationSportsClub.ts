import { UserProfile, application, sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApplicationVariables } from './useApplicationSportsClub';

const deleteApplication = async ({ userId, clubId }: ApplicationVariables) => {
  const { data: applicationData } = await supabase
    .from('application')
    .delete()
    .eq('user_id', userId)
    .eq('club_id', clubId)
    .single();

  const { data: memberData } = await supabase
    .from('members')
    .insert([{ user_id: userId, club_id: clubId }]);

  return { applicationData, memberData };
};

export const useDeleteApplicationSportsClub = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteApplicationMutate } = useMutation({
    mutationFn: ({ userId, clubId }: ApplicationVariables) =>
      deleteApplication({ userId, clubId }),
    mutationKey: [sportsClub, application],
    onSuccess: () => {
      alert('거절되었어요!');
      queryClient.invalidateQueries({ queryKey: [sportsClub] });
      queryClient.invalidateQueries({ queryKey: [UserProfile] });
      queryClient.invalidateQueries({ queryKey: [application] });
    },
  });

  return { deleteApplicationMutate };
};
