import { application, sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';

const getApplicationPeople = async (id: number) => {
  const { data, error } = await supabase
    .from('application')
    .select('user_id')
    .eq('club_id', id);

  return { data };
};

export const useGetApplicationPeople = (id: number) => {
  const { data, ...queries } = useQuery({
    queryKey: [sportsClub, application],
    queryFn: () => getApplicationPeople(id),
  });

  return { data, ...queries };
};
