import { sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';

const getSportsClub = async () => {
  const { data } = await supabase.from('sportsclub').select('*');
  return { data };
};

export const useGetSportsClub = () => {
  const { data, ...queries } = useQuery({
    queryKey: [sportsClub],
    queryFn: getSportsClub,
  });

  return { data, ...queries };
};
