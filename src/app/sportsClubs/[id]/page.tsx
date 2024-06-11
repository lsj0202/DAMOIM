'use client';

import { Container, Footer, Header } from '@/components';
import SportsClubReviewBox from '@/components/SportsClubs/SportsClubReviewBox';
import SportsClubSchedule from '@/components/SportsClubs/SportsClubSchedule';
import { Button, Flex, Text } from '@/components/common';
import Image from 'next/image';

const DetailSportsClub = () => {
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
                테니스 클럽 🎾
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
        <SportsClubReviewBox />
      </Container>
      <Footer />
    </>
  );
};

export default DetailSportsClub;
