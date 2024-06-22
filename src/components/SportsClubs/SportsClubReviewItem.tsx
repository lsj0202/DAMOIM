import Image from 'next/image';
import { Flex, Text, UserIcon } from '../common';

type SportsClubReviewItemProps = {
  review: string;
  rating: number;
  avatar_url: string;
  name: string;
};

const SportsClubReviewItem = ({
  review,
  rating,
  avatar_url,
  name,
}: SportsClubReviewItemProps) => {
  return (
    <Flex
      direction="col"
      className="h-[250px] rounded-xl bg-slate-100 p-4 last:mb-8"
    >
      <Flex gap={15} items="center">
        {avatar_url ? (
          <Image
            src={avatar_url}
            width={60}
            height={60}
            className="cursor-pointer rounded-full border border-black"
            alt=""
          />
        ) : (
          <UserIcon size={60} iconSize={30} className="cursor-pointer" />
        )}
        <Flex direction="col" gap={5}>
          <Text size="lg" weight="semibold">
            {name}
          </Text>
          <Text size="md">
            <Text className="mr-[3px] text-yellow-500">★</Text>
            <Text>{rating}</Text>
          </Text>
        </Flex>
      </Flex>
      <Flex className="mt-3 whitespace-pre-wrap border-t border-gray-300 leading-5">
        <Text className="mt-3">{review}</Text>
      </Flex>
    </Flex>
  );
};

export default SportsClubReviewItem;
