'use client';

import { Container, Header } from '@/components';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { ref: clubRef, inView } = useInView({ threshold: 0 });

  useGSAP(() => {
    gsap.from('#walking', { x: -100, duration: 1 });

    const TextTl = gsap.timeline();
    TextTl.from('#main_text', { opacity: 0, y: -50, duration: 0.7 })
      .from('#sub_text', { opacity: 0, y: -20, duration: 0.4 })
      .from('#main_button', { opacity: 0, y: -20, duration: 0.4 });
  }, []);

  useGSAP(() => {
    if (inView) {
      const itemTl = gsap.timeline();

      itemTl
        .from('.item', {
          opacity: 0,
          y: -60,
          duration: 1,
          stagger: 0.2,
          onComplete: () => {
            gsap.to('.item', { opacity: 1, y: 0 });
          },
        })
        .from('#sub_button', { opacity: 0, y: -20 });
    }
  }, [inView]);

  return (
    <>
      <Header />
      <div className="flex h-screen items-center justify-center bg-gradient-to-r-orange pt-[60px]">
        <Container className="flex h-[80vh] items-center">
          <div className="flex h-[400px] w-2/3 flex-col">
            <div
              id="main_text"
              className="text-5xl font-semibold leading-[55px] text-white"
            >
              쉽고, 간편하게 찾아보는 <br />
              스포츠 클럽
            </div>
            <div id="sub_text" className="mt-7 text-lg font-medium text-white">
              다모임을 사용하여 다양한 사람들과 다양한 스포츠를 즐겨보세요!
            </div>
            <button
              id="main_button"
              className="mt-10 w-40 rounded-lg bg-white py-4 font-semibold text-orange-500 hover:bg-slate-100"
            >
              다모임 시작하기
            </button>
          </div>
          <div className="flex w-1/3 items-center justify-center">
            <Image
              id="walking"
              src="/walking.gif"
              width={350}
              height={160}
              alt=""
            />
          </div>
        </Container>
      </div>
      <div className="bg-slate-50" style={{ minHeight: 'calc(100vh - 60px )' }}>
        <Container className="flex flex-col">
          <div className="my-10 text-xl font-semibold">
            현재 인기있는 스포츠 클럽들을 추천해 드릴게요 🔥
          </div>
          <div className="flex flex-wrap gap-3" ref={clubRef}>
            <div className="item h-[400px] w-[280px] rounded-lg bg-white shadow-lg">
              인기 스포츠 클럽 영역
            </div>
            <div className="item h-[400px] w-[280px] rounded-lg bg-white shadow-lg">
              인기 스포츠 클럽 영역
            </div>
            <div className="item h-[400px] w-[280px] rounded-lg bg-white shadow-lg">
              인기 스포츠 클럽 영역
            </div>
            <div className="item h-[400px] w-[280px] rounded-lg bg-white shadow-lg">
              인기 스포츠 클럽 영역
            </div>
          </div>
          <div className="my-8 flex items-center justify-center">
            <button
              id="sub_button"
              className="mt-10 w-40 rounded-lg bg-orange-500 py-4 font-semibold text-white hover:bg-orange-600"
            >
              다모임 시작하기
            </button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
