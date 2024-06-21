import { application, sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApplicationVariables } from './useApplicationSportsClub';

const acceptApplication = async ({ userId, clubId }: ApplicationVariables) => {
  const { data: applicationData } = await supabase
    .from('application')
    .delete()
    .eq('user_id', userId)
    .eq('club_id', clubId)
    .single();

  const { data: userProfile } = await supabase
    .from('userinfo')
    .select('name, age, location, avatar_url')
    .eq('id', userId)
    .single();

  const { data: clubData } = await supabase
    .from('sportsclub')
    .select('members')
    .eq('id', clubId)
    .single();

  const currentMembers = clubData?.members || [];

  const updatedMembers = [
    ...currentMembers,
    {
      id: userId,
      name: userProfile?.name,
      age: userProfile?.age,
      location: userProfile?.location,
      avatar_url: userProfile?.avatar_url,
    },
  ];

  const { data: updatedClubData } = await supabase
    .from('sportsclub')
    .update({ members: updatedMembers })
    .eq('id', clubId);

  return { updatedClubData };
};

export const useAcceptApplication = () => {
  const queryClient = useQueryClient();

  const { mutate: acceptApplicationMutate } = useMutation({
    mutationFn: ({ userId, clubId }: ApplicationVariables) =>
      acceptApplication({ userId, clubId }),
    mutationKey: [sportsClub, application],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [sportsClub] });
      queryClient.invalidateQueries({ queryKey: [application] });
      alert('수락되었어요!');
    },
  });

  return { acceptApplicationMutate };
};
