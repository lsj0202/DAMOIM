import { sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApplicationVariables } from './useApplicationSportsClub';

interface CreateDashboardParams extends ApplicationVariables {
  avatar_url?: string;
  message: string;
  name: string;
}

const createDashBoard = async ({
  userId,
  clubId,
  avatar_url,
  message,
  name,
}: CreateDashboardParams) => {
  try {
    const { data: clubData, error: clubError } = await supabase
      .from('sportsclub')
      .select('message')
      .eq('id', clubId)
      .single();

    if (clubError) throw clubError;

    const currentMessages = clubData?.message || [];

    const updatedMessages = [
      ...currentMessages,
      {
        id: userId,
        avatar_url,
        message,
        name,
      },
    ];

    const { data: updateData, error: updateError } = await supabase
      .from('sportsclub')
      .update({ message: updatedMessages })
      .eq('id', clubId)
      .single();

    if (updateError) throw updateError;

    return { updateData };
  } catch (error) {
    console.error('Error updating reviews:', error);
    throw error;
  }
};

export const useCreateDashBoard = () => {
  const queryClient = useQueryClient();

  const { mutate: createDashBoardMutate } = useMutation({
    mutationFn: ({
      userId,
      clubId,
      avatar_url,
      message,
      name,
    }: CreateDashboardParams) =>
      createDashBoard({ userId, clubId, avatar_url, message, name }),
    mutationKey: [sportsClub],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [sportsClub] });
      alert('게시글이 작성되었어요!');
    },
  });

  return { createDashBoardMutate };
};
