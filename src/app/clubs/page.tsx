'use client';

import { Container, Header } from '@/components';
import DamoimBanner from '@/components/Banners/DamoimBanner';
import { Flex, Input } from '@/components/common';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';

const ClubsPage = () => {
  const swiperRef = useRef<SwiperClass | null>();

  const handleSubmit = (data: { search: string }) => {
    console.log('Submitted data:', data);
  };

  return (
    <>
      <Header />
      <Container className="flex w-full flex-col justify-end pt-[60px]">
        <Flex items="center" justify="center" className="w-full">
          <Input
            className="mt-6"
            width={400}
            color="orange"
            iconColor="orange"
            onSubmit={handleSubmit}
          />
        </Flex>
        <div className="relative mt-6 flex w-full flex-col justify-center">
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
            {[...Array(3)].map((_, idx) => (
              <SwiperSlide key={idx}>
                <DamoimBanner />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </>
  );
};

export default ClubsPage;
