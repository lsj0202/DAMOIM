import { myProfile } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../account/useAuth';

const user = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

export const useMyProfile = () => {
  const { user: enabledUser } = useAuth();

  const { data, ...queries } = useQuery({
    queryKey: [myProfile],
    queryFn: user,
    enabled: !!enabledUser,
  });

  return { data, ...queries };
};
