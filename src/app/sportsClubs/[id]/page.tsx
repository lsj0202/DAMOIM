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
import SportsClubDashBoard from '@/components/SportsClubs/SportsClubDashBoard';
import SportsClubReview from '@/components/SportsClubs/SportsClubReview';
import ViewApplicationUsers from '@/components/SportsClubs/ViewApplicationUsers';
import { Button, Flex, Text } from '@/components/common';
import { useApplicationSportsClub } from '@/hooks/sportsClub/useApplicationSportsClub';

import { useGetClubDetail } from '@/hooks/sportsClub/useGetClubDetail';
import { useMyProfile } from '@/hooks/user/useMyProfile';
import { useOverlay } from '@toss/use-overlay';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const DetailSportsClub = () => {
  const { id } = useParams();
  const { data } = useGetClubDetail(String(id));
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
      applicationSportsClubMutate({
        userId: myProfile.id,
        clubId: sportsClub.id,
      });
    }
  };

  const overlay = useOverlay();

  const handleViewApplicationUsers = () => {
    overlay.open(({ isOpen, close }) => (
      <ViewApplicationUsers isOpen={isOpen} close={close} />
    ));
  };

  const handleReviewModal = () => {
    overlay.open(({ isOpen, close }) => (
      <SportsClubReview isOpen={isOpen} close={close} />
    ));
  };

  const handleDashBoard = () => {
    overlay.open(({ isOpen, close }) => (
      <SportsClubDashBoard isOpen={isOpen} close={close} />
    ));
  };

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (sportsClub?.reviews) {
      const total = sportsClub.reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      setAverageRating(total / sportsClub.reviews.length);
    }
  }, [sportsClub?.reviews]);

  return (
    <>
      <Header />
      <Container
        className="pt-[60px]"
        style={{ minHeight: 'calc(100vh - 60px )' }}
      >
        <Flex className="border-b">
          <Flex items="center" justify="center" className="w-2/3">
            <Flex direction="col" className="mr-6 h-[290px] w-full">
              <Text size="x" weight="semibold" className="my-4">
                {sportsClub?.title}
              </Text>
              <Text className="min-h-[30px]">{sportsClub?.subTitle}</Text>
              <Text className="mb-2 mt-4">
                총 리뷰: <span className="mr-[2px] text-yellow-400">★</span>
                {averageRating.toFixed(1)}
              </Text>
              <Text>멤버 수: {sportsClub?.members?.length}명</Text>
              {sportsClub?.members?.some(
                (member) => member?.id === myProfile?.id,
              ) ? (
                <Flex className="mt-10 w-full" gap={15}>
                  <Button size="md" bgColor="black" onClick={handleReviewModal}>
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
                  <Button bgColor="gray" onClick={handleDashBoard}>
                    게시판
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
            {sportsClub?.reviews?.map((review) => (
              <SportsClubReviewItem
                key={review.id}
                name={review.name}
                review={review.review}
                rating={review.rating}
                avatar_url={review.avatar_url}
              />
            )) ?? <Text>리뷰가 없습니다.</Text>}
          </div>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default DetailSportsClub;
