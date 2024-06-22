import { useCreateReview } from '@/hooks/sportsClub/useCreateReview';
import { useMyProfile } from '@/hooks/user/useMyProfile';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { ModalProps } from '@/types/Modal';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { Button, Flex, Text } from '../common';
import StarRating from '../common/StarRating';
import ModalWrapper from '../layout/ModalWrapper';

export type ReviewData = {
  review: string;
  rating: number;
  name: string;
};

const SportsClubReview = ({ isOpen, close }: ModalProps) => {
  const { register, handleSubmit, setValue } = useForm<ReviewData>();
  const [score, setScore] = useState(0);
  const { createReviewMutate } = useCreateReview();
  const { data: userProfile } = useMyProfile();
  const { data: myProfile } = useUserProfile(String(userProfile?.id));
  const { id } = useParams();

  useEffect(() => {
    setValue('rating', score);
  }, [score, setValue]);

  const onSubmit = (data: ReviewData) => {
    if (userProfile?.id && id) {
      createReviewMutate({
        userId: userProfile.id,
        name: userProfile?.user_metadata.name,
        clubId: id as string,
        avatar_url: myProfile.avatar_url,
        review: data.review,
        rating: data.rating,
      });
    }
    close();
  };

  return (
    <ModalWrapper isOpen={isOpen} close={close}>
      <Flex className="size-[500px] rounded-lg bg-white p-5" direction="col">
        <Flex items="center" justify="between" className="mb-4">
          <Text size="md" weight="semibold">
            리뷰 작성
          </Text>
          <MdClose className="cursor-pointer text-xl" onClick={close} />
        </Flex>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <StarRating score={score} setScore={setScore} />
          <textarea
            {...register('review', { required: true })}
            className="min-h-[280px] resize-none rounded border border-gray-300 p-2 text-base"
            placeholder="리뷰를 작성해주세요."
          />
          <Button className="w-full">리뷰 작성</Button>
        </form>
      </Flex>
    </ModalWrapper>
  );
};

export default SportsClubReview;
