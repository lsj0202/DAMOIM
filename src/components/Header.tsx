'use client';

import { cn } from '@/utils';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Container from './layout/Container';
import Wrapper from './layout/Wrapper';

const Header = () => {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    });

    return () => {
      removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <Wrapper
      className={cn(
        classNames(
          'fixed transition ease-in-out bg-white z-50',
          showShadow && 'shadow-md ease-in-out',
        ),
      )}
    >
      <Container>
        <header className="flex h-[60px] items-center justify-between">
          <Image
            src="/logo.svg"
            alt="logo"
            width={150}
            height={40}
            className="cursor-pointer"
          />
          <div className="cursor-pointer">로그인</div>
        </header>
      </Container>
    </Wrapper>
  );
};

export default Header;
