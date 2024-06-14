import { myProfile } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '../account/useSession';

const user = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

export const useMyProfile = () => {
  const { data: session } = useSession();

  const { data, ...queries } = useQuery({
    queryKey: [myProfile],
    queryFn: () => user,
    enabled: !!session,
  });

  return { data, ...queries };
};
