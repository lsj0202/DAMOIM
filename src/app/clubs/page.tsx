'use client';

import { ClubBanner, Container, DamoimBanner, Header } from '@/components';
import SearchClubList from '@/components/Clubs/SearchClubList';
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

const ClubsPage = () => {
  const swiperRef = useRef<SwiperClass | null>();
  const banners = renderBanners();

  return (
    <>
      <Header />
      <Container className="flex w-full flex-col justify-end pt-[60px]">
        <SearchClubList />
        <div className="mt-6 flex w-full flex-col justify-center">
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
        </div>
      </Container>
    </>
  );
};

export default ClubsPage;
