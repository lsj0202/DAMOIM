'use client';

import { Container, Footer, Header, SportsClubMap } from '@/components';
import SportsClubMarkers from '@/components/SportsClubs/SportsClubMarker';
import { Button, Flex, Text } from '@/components/common';
import Image from 'next/image';
import { useState } from 'react';

const DetailSportsClub = () => {
  const [map, setMap] = useState(null);

  const clubLocation = {
    C_NAME: '스포츠 클럽 위치',
    X_CNTS: 35.17308711,
    Y_DNTS: 129.12775978,
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
            className="h-[350px] w-1/3 bg-slate-100"
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
        <Flex className="h-[450px]">
          <Flex
            className="h-full w-1/2 bg-gray-300"
            direction="col"
            items="center"
          >
            <Text size="md" weight="semibold" className="mt-2">
              주요 활동 지역
            </Text>
            <Flex className="mt-3 w-[90%]">
              <SportsClubMap setMap={setMap} />
              <SportsClubMarkers location={clubLocation} map={map} />
            </Flex>
          </Flex>
          <Flex
            className="h-full w-1/2"
            items="center"
            justify="center"
            direction="col"
            gap={5}
          >
            <Text size="md">월요일: 10:00 AM ~ 5:00 PM</Text>
            <Text size="md">화요일: 10:00 AM ~ 5:00 PM</Text>
            <Text size="md">수요일: 10:00 AM ~ 5:00 PM</Text>
            <Text size="md">목요일: 10:00 AM ~ 5:00 PM</Text>
            <Text size="md">금요일: 10:00 AM ~ 5:00 PM</Text>
            <Text size="md">토요일: 10:00 AM ~ 5:00 PM</Text>
            <Text size="md">일요일: 휴무</Text>
          </Flex>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default DetailSportsClub;
