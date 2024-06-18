import { sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateHeart = async (id: number) => {
  const { data, error } = await supabase
    .from('sportsclub')
    .select('heart')
    .eq('id', id)
    .single();

  if (error) return;

  const newHeartValue = data.heart + 1;

  const { error: UpdateError } = await supabase
    .from('sportsclub')
    .update({ heart: newHeartValue })
    .eq('id', id);
  return UpdateError;
};

export const useUpdateHeart = () => {
  const queryClient = useQueryClient();

  const { mutate: createHeartMutate } = useMutation({
    mutationFn: (id: number) => updateHeart(id),
    mutationKey: [sportsClub],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [sportsClub] });
    },
  });

  return { createHeartMutate };
};
