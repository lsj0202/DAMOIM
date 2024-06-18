'use client';

import {
  Container,
  Footer,
  Header,
  SportsClubReviewItem,
  SportsClubSchedule,
} from '@/components';
import { CreateSportsClub } from '@/components/SportsClubs/CreateSportsClub';
import { Button, Flex, Text } from '@/components/common';
import { useGetClubDetail } from '@/hooks/sportsClub/useGetClubDetail';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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
  console.log('datadata', data?.data);
  const sportsClub = data?.data as CreateSportsClub;

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
              <Text size="md" weight="semibold">
                지금 가입해보세요!
              </Text>
              <Text size="x" weight="semibold" className="mt-4">
                {sportsClub?.title}
              </Text>
              <Text className="mt-10">평균 나이: 23세</Text>
              <Text className="mt-3">총 리뷰: ★4.5</Text>
              <Button className="mt-5" size="md">
                가입하기
              </Button>
              <Flex className="mt-3 w-full" gap={15}>
                <Button size="md" bgColor="black">
                  리뷰 작성하기
                </Button>
                <Button size="md" bgColor="gray">
                  공유하기
                </Button>
                <Button size="md" bgColor="gray">
                  찜하기
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            items="center"
            justify="center"
            className="h-[350px] w-1/3 bg-gray-100"
          >
            <Image
              className="rounded-lg"
              src="/imgs/mockImg.jpeg"
              width={300}
              height={300}
              alt=""
            />
          </Flex>
        </Flex>
        <SportsClubSchedule />
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
