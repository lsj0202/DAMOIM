import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';

const session = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: session,
    staleTime: 1000 * 60 * 60,
  });
};
