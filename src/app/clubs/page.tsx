'use client';

import { Container, Header } from '@/components';
import ClubBanner from '@/components/Banners/ClubBanner';
import { Flex, Input } from '@/components/common';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
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
            modules={[Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full"
          >
            {[...Array(3)].map((_, idx) => (
              <SwiperSlide key={idx}>
                <ClubBanner />
              </SwiperSlide>
            ))}
          </Swiper>
          <Flex className="mt-7">
            {/* <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="mr-3 flex size-10 items-center justify-center rounded-full bg-white text-black shadow-md"
            >
              {'<'}
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex size-10 items-center justify-center rounded-full bg-white text-black shadow-md"
            >
              {'>'}
            </button> */}
          </Flex>
        </div>
      </Container>
    </>
  );
};

export default ClubsPage;
