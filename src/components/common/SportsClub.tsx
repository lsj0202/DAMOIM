import Image from 'next/image';
import { ForwardedRef, forwardRef } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import Flex from './Flex';

export type SportsClubProps = {
  isMyClub?: boolean;
  imageUrl: string;
  title: string;
  subTitle: string;
  heart?: number;
  className?: string;
};

const SportsClub = forwardRef(function SportsClub(
  {
    isMyClub = false,
    imageUrl,
    title,
    subTitle,
    heart = 0,
    className,
    ...props
  }: SportsClubProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={`flex h-[400px] w-[280px] flex-col rounded-lg bg-white p-4 shadow-lg ${className}`}
      {...props}
    >
      <Flex justify="end">
        <AiOutlineEllipsis className="cursor-pointer" size={20} />
      </Flex>
      <div className="relative size-full grow">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="mt-1 rounded-lg"
        />
      </div>
      <div className="mt-3">
        <h4 className="truncate text-lg font-bold">{title}</h4>
        <p className="truncate-2-lines text-sm text-gray-600">{subTitle}</p>

        <Flex justify="end" className="mt-2">
          <div className="flex items-center rounded-lg px-3 py-2 shadow-md">
            <CiHeart className="cursor-pointer" size={17} />
            <div className="ml-1">{heart}</div>
          </div>
        </Flex>
      </div>
    </div>
  );
});

export default SportsClub;
