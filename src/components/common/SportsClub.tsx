import { useUpdateHeart } from '@/hooks/sportsClub/useCreateHeart';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ForwardedRef, forwardRef } from 'react';
import { FaHeart } from 'react-icons/fa';
import Flex from './Flex';

export type SportsClubProps = {
  id: string;
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
  const { createHeartMutate } = useUpdateHeart();

  const handleCreateHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    createHeartMutate(id);
  };

  return (
    <div
      ref={ref}
      onClick={() => router.push(`/sportsClubs/${id}`)}
      className={`flex h-[400px] w-[280px] cursor-pointer flex-col rounded-lg bg-white p-4 shadow-lg ${className}`}
      {...props}
    >
      <div className="relative size-full grow">
        {imageUrl?.length > 0 ? (
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="mt-1 min-h-[200px] rounded-lg"
          />
        ) : (
          <div className="size-full rounded-lg bg-slate-300" />
        )}
      </div>
      <div className="mt-3">
        <h4 className="truncate text-lg font-bold">{title}</h4>
        <p className="truncate-2-lines min-h-[40px] text-sm text-gray-600">
          {subTitle}
        </p>
        <Flex justify="end" className="mt-2">
          <div
            className="flex items-center rounded-lg px-3 py-2 shadow-md"
            onClick={handleCreateHeart}
          >
            <FaHeart size={17} className="text-red-500" />
            <div className="ml-1">{heart}</div>
          </div>
        </Flex>
      </div>
    </div>
  );
});

export default SportsClub;
