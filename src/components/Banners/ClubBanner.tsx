import Image from 'next/image';
import { Text } from '../common';

const ClubBanner = () => {
  return (
    <div className="flex h-[300px] w-full items-center bg-slate-100 p-6">
      <div className="flex w-1/2 items-center justify-center">
        <Image src="/imgs/sports_club.svg" width={280} height={280} alt="" />
      </div>
      <Text size="x" className="ml-10" weight="semibold">
        스포츠클럽에 가입하여
        <br />
        <Text color="orange">건강한</Text> 생활을 해보아요!
      </Text>
    </div>
  );
};

export default ClubBanner;
