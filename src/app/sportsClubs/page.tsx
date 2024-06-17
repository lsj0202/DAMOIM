'use client';

import {
  ClubBanner,
  Container,
  DamoimBanner,
  Footer,
  Header,
  SearchSportsClubList,
} from '@/components';
import { Flex, SportsClub } from '@/components/common';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';

const renderBanners = () => {
  return [
    <ClubBanner key="clubBanner" />,
    <DamoimBanner key="DamooimBanner" />,
  ];
};

const SportsClubsPage = () => {
  const swiperRef = useRef<SwiperClass | null>();
  const banners = renderBanners();

  return (
    <>
      <Header />
      <Container
        className="flex w-full flex-col pt-[60px]"
        style={{ minHeight: 'calc(100vh - 60px )' }}
      >
        <SearchSportsClubList />
        <Flex className="mt-6 w-full" direction="col" justify="center">
          <Swiper
            navigation={true}
            modules={[Autoplay, Navigation]}
            spaceBetween={25}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>{banner}</SwiperSlide>
            ))}
          </Swiper>
        </Flex>
        <div className="mb-14 mt-8 grid grid-cols-4 gap-4">
          {[...Array(12)].map((_, index) => (
            <SportsClub
              key={index}
              imageUrl="/imgs/mockImg.jpeg"
              title="주 4회 헬스클럽 오픈!"
              subTitle="우리동네 헬스장에서 같이 운동해요! 모든 문의는 채팅을 통해 주세요!"
            />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default SportsClubsPage;
