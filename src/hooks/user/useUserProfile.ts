import { UserProfile } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';

const user = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data;
};

export const useUserProfile = () => {
  const { data, ...queries } = useQuery({
    queryKey: [UserProfile],
    queryFn: () => user,
  });

  return { data, ...queries };
};
