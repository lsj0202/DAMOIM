import Image from 'next/image';
import { Flex, Text } from '../common';

type SportsClubReviewItemProps = {
  name: string;
  clubName: string;
  rating: string; // 추후에 number로 변경
  imageSrc: string;
  reviewText: string;
};

const SportsClubReviewItem = ({
  name,
  clubName,
  rating,
  imageSrc,
  reviewText,
}: SportsClubReviewItemProps) => {
  return (
    <Flex
      direction="col"
      className="h-[250px] rounded-xl bg-slate-100 p-4 last:mb-8"
    >
      <Flex gap={15} items="center">
        <Image
          src={imageSrc}
          width={100}
          height={100}
          alt=""
          className="rounded-lg"
        />
        <Flex direction="col" gap={5}>
          <Text size="lg" weight="semibold">
            {name}
          </Text>
          <Text size="sm">{clubName}</Text>
          <Text size="md">{rating}</Text>
        </Flex>
      </Flex>
      <Flex className="mt-3 whitespace-pre-wrap border-t border-gray-300">
        <Text className="mt-3">{reviewText}</Text>
      </Flex>
    </Flex>
  );
};

export default SportsClubReviewItem;
