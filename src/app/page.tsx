'use client';

import { Container, Footer, Header } from '@/components';
import { Button, Flex, Text } from '@/components/common';
import { faker } from '@faker-js/faker';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const SportsClub = dynamic(() => import('@/components/common/SportsClub'), {
  ssr: false,
});

const Home = () => {
  const { ref: clubRef, inView } = useInView({ threshold: 0 });

  useGSAP(() => {
    gsap.from('#walking', { x: -100, duration: 1 });

    const TextTl = gsap.timeline();
    TextTl.from('.mainT', { opacity: 0, y: -50, duration: 0.7 })
      .from('.subT', { opacity: 0, y: -20, duration: 0.4 })
      .from('.mainB', { opacity: 0, y: -20, duration: 0.4 });
  }, []);

  useGSAP(() => {
    if (inView) {
      const itemTl = gsap.timeline();
      itemTl
        .from('.club', {
          opacity: 0,
          y: -60,
          duration: 1,
          stagger: 0.2,
          onComplete: () => {
            gsap.to('.club', { opacity: 1, y: 0 });
          },
        })
        .from('.subB', { opacity: 0, y: -20 });
    }
  }, [inView]);

  return (
    <>
      <Header />
      <Flex
        className="h-screen bg-gradient-to-r-orange pt-[60px]"
        items="center"
        justify="center"
      >
        <Container className="flex h-[80vh] items-center">
          <Flex className="h-[400px] w-2/3" direction="col">
            <Text className="mainT" size="xl" weight="semibold" color="white">
              쉽고, 간편하게 찾아보는 <br />
              스포츠 클럽
            </Text>
            <Text className="subT mt-7" size="md" weight="medium" color="white">
              다모임을 사용하여 다양한 사람들과 다양한 스포츠를 즐겨보세요!
            </Text>
            <Button
              size="lg"
              color="orange"
              bgColor="white"
              className="mainB mt-12"
            >
              <Link href="/clubs">다모임 시작하기</Link>
            </Button>
          </Flex>
          <Flex className="w-1/3" items="center" justify="center">
            <Image
              id="walking"
              src="/walking.webm"
              width={350}
              height={160}
              alt=""
              priority
            />
          </Flex>
        </Container>
      </Flex>
      <div className="bg-slate-50" style={{ minHeight: 'calc(100vh - 60px )' }}>
        <Container className="flex flex-col">
          <Text className="my-10" size="lg" weight="semibold">
            현재 인기있는 스포츠 클럽들을 추천해 드릴게요 🔥
          </Text>
          <Flex wrap="wrap" gap={12} ref={clubRef}>
            {[...Array(4)].map((_, index) => (
              <SportsClub
                key={index}
                className="club"
                imageUrl={faker.image.avatar()}
                title="주 4회 헬스클럽 오픈!"
                subTitle="우리동네 헬스장에서 같이 운동해요! 모든 문의는 채팅을 통해 주세요!"
              />
            ))}
          </Flex>
          <Flex items="center" justify="center" className="my-8">
            <Button
              size="lg"
              bgColor="orange"
              color="white"
              className="subB mt-12"
            >
              <Link href="/clubs">다모임 시작하기</Link>
            </Button>
          </Flex>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Home;
