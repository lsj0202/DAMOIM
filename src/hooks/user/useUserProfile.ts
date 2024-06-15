import { UserProfile } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';

const user = async (userId: string) => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('*')
    .eq('id', userId)
    .single();

  if (!error) return data;
};

export const useUserProfile = (userId: string) => {
  const { data, ...queries } = useQuery({
    queryKey: [UserProfile, userId],
    queryFn: () => user(userId),
  });

  return { data, ...queries };
};
