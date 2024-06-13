import '@/styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';
import Provider from './provider';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'DAMOIM',
  description: '스포츠 동호회 인원을 모집해봐요!',
  icons: {
    icon: '/DAMOIM.png',
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
