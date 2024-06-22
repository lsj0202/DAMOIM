import { useOutSideClick } from '@/hooks';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Flex, Input, Text } from '../common';

const SearchSportsClubList = () => {
  const searchRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState('');

  const handleSubmit = (data: { search: string }) => {
    setSearch(data.search);
  };

  const onCloseInput = () => setIsFocused(false);

  useOutSideClick(searchRef, onCloseInput);

  const texts = [
    {
      id: 0,
      name: '부산소프트웨어 마이스터고등학교',
    },
    {
      id: 1,
      name: '헬스동아리',
    },
  ];

  return (
    <Flex
      items="center"
      justify="center"
      className="relative w-full"
      direction="col"
    >
      <div className="relative" ref={searchRef}>
        <Input
          className="relative mt-6"
          width={400}
          color="orange"
          iconColor="orange"
          onSubmit={handleSubmit}
          onFocus={() => setIsFocused(true)}
        />
        <div
          className={classNames(
            'absolute mt-2 w-full border border-gray-300 bg-white z-10 h-[400px]',
            { hidden: !isFocused },
          )}
        >
          {isFocused && (
            <div className="flex h-full flex-col">
              <Flex
                className="h-[30px] border-b border-gray-300 pl-2"
                items="center"
              >
                <Text color="orange">최근 검색어</Text>
              </Flex>
              <div className="h-full overflow-y-scroll">
                {texts.map((data) => (
                  <Flex
                    key={data.id}
                    className="h-[25px]"
                    items="center"
                    justify="between"
                  >
                    <Text className="cursor-pointer pl-2">{data.name}</Text>
                    <Text className="cursor-pointer pr-2">
                      <MdClose />
                    </Text>
                  </Flex>
                ))}
              </div>
              <Flex
                className="h-[30px] border-t border-gray-300 px-[10px]"
                items="center"
                justify="between"
              >
                <Text className="cursor-pointer" color="orange" size="xs">
                  전체삭제
                </Text>
                <Text
                  onClick={onCloseInput}
                  className="cursor-pointer"
                  color="orange"
                  size="xs"
                >
                  닫기
                </Text>
              </Flex>
            </div>
          )}
        </div>
      </div>
    </Flex>
  );
};

export default SearchSportsClubList;
