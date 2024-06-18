import { sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';

const getClubDetail = async (id: number) => {
  const { data, error } = await supabase
    .from('sportsclub')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

export const useGetClubDetail = (id: number) => {
  const { data, ...queries } = useQuery({
    queryKey: [sportsClub, id],
    queryFn: () => getClubDetail(id),
    enabled: !!id,
  });

  return { data, ...queries };
};
