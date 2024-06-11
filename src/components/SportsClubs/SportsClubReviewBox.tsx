import Image from 'next/image';
import { Flex, Text } from '../common';

const SportsClubReviewBox = () => {
  return (
    <Flex className="min-h-[400px]" direction="col">
      <Text size="lg" weight="semibold" className="my-3">
        리뷰 보기
      </Text>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <Flex
            key={index}
            direction="col"
            className="h-[250px] rounded-xl bg-slate-100 p-4 last:mb-8"
          >
            <Flex gap={15} items="center">
              <Image
                src="/imgs/mockImg.jpeg"
                width={100}
                height={100}
                alt=""
                className="rounded-lg"
              />
              <Flex direction="col" gap={5}>
                <Text size="lg" weight="semibold">
                  이상진
                </Text>
                <Text size="md">★★★★★</Text>
              </Flex>
            </Flex>
            <Flex className="mt-3 whitespace-pre-wrap border-t border-gray-300">
              <Text className="mt-3">
                지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수
                있게 되었습니다. 지금 당장 가입하세요! 테니스 클럽에 가입하고 더
                나은 삶을 살 수 있게 되었습니다.
              </Text>
            </Flex>
          </Flex>
        ))}
      </div>
    </Flex>
  );
};

export default SportsClubReviewBox;
