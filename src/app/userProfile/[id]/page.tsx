'use client';

import { Container, Footer, Header, SportsClubReviewItem } from '@/components';
import { Flex, Text } from '@/components/common';
import Image from 'next/image';

const UserProfilePage = () => {
  const reviews = [
    {
      name: '이상진',
      rating: '★★★★★',
      clubName: '테니스 클럽',
      imageSrc: '/imgs/mockImg.jpeg',
      reviewText:
        '지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다. 지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다.',
    },
    {
      name: '이상진',
      rating: '★★★★★',
      clubName: '탁구 클럽',
      imageSrc: '/imgs/mockImg.jpeg',
      reviewText:
        '지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다. 지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다.',
    },
    {
      name: '이상진',
      rating: '★★★★★',
      clubName: '헬스 클럽',
      imageSrc: '/imgs/mockImg.jpeg',
      reviewText:
        '지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다. 지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다.',
    },
  ];

  return (
    <>
      <Header />
      <Container
        className="flex w-full flex-col pt-[60px]"
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        <Flex className="relative min-h-[200px] rounded-b-lg bg-yellow-300">
          <div className="absolute left-8 mt-[40px]">
            <Image
              className="rounded-lg"
              src="/imgs/mockImg.jpeg"
              width={200}
              height={200}
              alt=""
            />
          </div>
          <Flex className="ml-[220px] px-8" items="center">
            <Flex direction="col" gap={6}>
              <Text size="x" weight="semibold">
                이상진
              </Text>
              <Flex gap={15} className="mt-5">
                <Text>18살</Text> | <Text>부산 거주중</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="mt-12 min-h-[300px]" direction="col">
          <Text size="lg" weight="semibold" className="my-3">
            스포츠 클럽 활동
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

export default UserProfilePage;
