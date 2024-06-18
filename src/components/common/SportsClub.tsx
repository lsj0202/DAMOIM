import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ForwardedRef, forwardRef } from 'react';
import { CiHeart } from 'react-icons/ci';
import Flex from './Flex';

export type SportsClubProps = {
  id: number;
  isMyClub?: boolean;
  imageUrl: string;
  title: string;
  subTitle: string;
  heart?: number;
  className?: string;
};

const SportsClub = forwardRef(function SportsClub(
  {
    id,
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
  const router = useRouter();

  return (
    <div
      ref={ref}
      onClick={() => router.push(`/sportsClubs/${id}`)}
      className={`flex h-[400px] w-[280px] cursor-pointer flex-col rounded-lg bg-white p-4 shadow-lg ${className}`}
      {...props}
    >
      <div className="relative size-full grow">
        {imageUrl.length > 0 ? (
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="mt-1 rounded-lg"
          />
        ) : (
          <div className="size-full rounded-lg bg-slate-300" />
        )}
      </div>
      <div className="mt-3">
        <h4 className="truncate text-lg font-bold">{title}</h4>
        <p className="truncate-2-lines text-sm text-gray-600">{subTitle}</p>
        <Flex justify="end" className="mt-2">
          <div className="flex items-center rounded-lg px-3 py-2 shadow-md">
            <CiHeart size={17} />
            <div className="ml-1">{heart}</div>
          </div>
        </Flex>
      </div>
    </div>
  );
});

export default SportsClub;
