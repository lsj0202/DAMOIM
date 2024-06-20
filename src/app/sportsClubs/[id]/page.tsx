'use client';

import {
  Container,
  Footer,
  Header,
  SportsClubReviewItem,
  SportsClubSchedule,
} from '@/components';
import { shareKakao } from '@/components/ShareKakao';
import { CreateSportsClub } from '@/components/SportsClubs/CreateSportsClub';
import ViewApplicationUsers from '@/components/SportsClubs/ViewApplicationUsers';
import { Button, Flex, Text } from '@/components/common';
import { useApplicationSportsClub } from '@/hooks/sportsClub/useApplicationSportsClub';
import { useGetClubDetail } from '@/hooks/sportsClub/useGetClubDetail';
import { useMyProfile } from '@/hooks/user/useMyProfile';
import { useOverlay } from '@toss/use-overlay';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const DetailSportsClub = () => {
  const reviews = [
    {
      name: '이상진',
      rating: '★★★★★',
      clubName: '헬스 클럽',
      imageSrc: '/imgs/mockImg.jpeg',
      reviewText:
        '지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다. 지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다.',
    },
  ];

  const { id } = useParams();
  const { data } = useGetClubDetail(Number(id));
  const { data: myProfile } = useMyProfile();

  const sportsClub: CreateSportsClub = data?.data;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { applicationSportsClubMutate } = useApplicationSportsClub();

  const handleJoinSportsClub = () => {
    if (myProfile) {
      const variables = {
        userId: myProfile.id,
        clubId: sportsClub.id as number,
      };
      applicationSportsClubMutate(variables);
    }
  };

  const overlay = useOverlay();

  const handleViewApplicationUsers = () => {
    overlay.open(({ isOpen, close }) => (
      <ViewApplicationUsers isOpen={isOpen} close={close} />
    ));
  };

  return (
    <>
      <Header />
      <Container
        className="pt-[60px]"
        style={{ minHeight: 'calc(100vh - 60px )' }}
      >
        <Flex className="border-b">
          <Flex items="center" justify="center" className="w-2/3">
            <Flex direction="col" className="h-[290px] w-full">
              <Text size="x" weight="semibold" className="my-4">
                {sportsClub?.title}
              </Text>
              <Text className="min-h-[30px]">{sportsClub?.subTitle}</Text>
              <Text className="mb-2 mt-4">
                총 리뷰: <span className="mr-[2px] text-yellow-400">★</span>
                {sportsClub?.avgReview}
              </Text>
              <Text>멤버 수: {sportsClub?.members.length}명</Text>
              {sportsClub?.members.some(
                (member) => member.id === myProfile?.id,
              ) ? (
                <Flex className="mt-10 w-full" gap={15}>
                  <Button size="md" bgColor="black">
                    리뷰 작성하기
                  </Button>
                  <Button
                    size="md"
                    bgColor="gray"
                    onClick={() => shareKakao(sportsClub)}
                  >
                    공유하기
                  </Button>
                  <Button onClick={handleViewApplicationUsers}>
                    신청자 목록 확인하기
                  </Button>
                </Flex>
              ) : (
                <Button
                  className="mt-10"
                  size="md"
                  onClick={handleJoinSportsClub}
                >
                  가입하기
                </Button>
              )}
            </Flex>
          </Flex>
          <Flex
            items="center"
            justify="center"
            className="h-[350px] w-1/3 bg-gray-100"
          >
            {sportsClub?.clubPoster && (
              <Image
                className="rounded-lg"
                src={sportsClub?.clubPoster || ''}
                width={300}
                height={300}
                alt=""
              />
            )}
          </Flex>
        </Flex>
        <SportsClubSchedule
          location={sportsClub?.location}
          latitude={sportsClub?.latitude}
          longitude={sportsClub?.longitude}
          schedules={sportsClub?.schedules}
        />
        <Flex className="min-h-[400px]" direction="col">
          <Text size="lg" weight="semibold" className="my-3">
            리뷰 보기
          </Text>
          <div className="grid grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <SportsClubReviewItem
                key={index}
                name={review.name}
                clubName={review.clubName}
                rating={review.rating}
                imageSrc={review.imageSrc}
                reviewText={review.reviewText}
              />
            ))}
          </div>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default DetailSportsClub;
