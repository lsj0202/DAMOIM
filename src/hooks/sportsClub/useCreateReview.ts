import { type ReviewData } from '@/components/SportsClubs/SportsClubReview';
import { sportsClub } from '@/constants/UserKey';
import supabase from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApplicationVariables } from './useApplicationSportsClub';

const createReview = async ({
  userId,
  clubId,
  avatar_url,
  review,
  rating,
  name,
}: ApplicationVariables &
  ReviewData & { avatar_url: string; name: string }) => {
  const { data: clubData } = await supabase
    .from('sportsclub')
    .select('reviews')
    .eq('id', clubId)
    .single();
  const currentReviews = clubData?.reviews || [];

  const updatedReviews = [
    ...currentReviews,
    {
      id: userId,
      avatar_url: avatar_url,
      review: review,
      rating: rating,
      name: name,
    },
  ];

  const { data: updateData } = await supabase
    .from('sportsclub')
    .update({ reviews: updatedReviews })
    .eq('id', clubId);

  return { updateData };
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  const { mutate: createReviewMutate } = useMutation({
    mutationFn: ({
      userId,
      clubId,
      avatar_url,
      review,
      rating,
      name,
    }: ApplicationVariables &
      ReviewData & { avatar_url: string; name: string }) =>
      createReview({ userId, clubId, avatar_url, review, rating, name }),
    mutationKey: [sportsClub],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [sportsClub] });
      alert('리뷰가 작성되었어요!');
    },
  });

  return { createReviewMutate };
};
