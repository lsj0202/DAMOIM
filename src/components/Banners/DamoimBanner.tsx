import Image from 'next/image';
import { Text } from '../common';

const DamoimBanner = () => {
  return (
    <div className="flex h-[300px] w-full items-center bg-slate-100 p-6">
      <div className="flex w-1/2 items-center justify-center">
        <Image src="/imgs/logo.svg" width={280} height={80} alt="" />
      </div>
      <Text size="x" className="ml-10" weight="semibold">
        다모임을 가입하고
        <br />
        <Text color="orange">새로운</Text> 취미를 찾아보아요!
      </Text>
    </div>
  );
};

export default DamoimBanner;
