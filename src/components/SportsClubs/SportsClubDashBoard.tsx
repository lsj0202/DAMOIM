import { useCreateDashBoard } from '@/hooks/sportsClub/useCreateDashBoard';
import { useGetClubDetail } from '@/hooks/sportsClub/useGetClubDetail';
import { useMyProfile } from '@/hooks/user/useMyProfile';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { ModalProps } from '@/types/Modal';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Button, Flex, Text } from '../common';
import ModalWrapper from '../layout/ModalWrapper';

const SportsClubDashBoard = ({ isOpen, close }: ModalProps) => {
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const { data: myProfile } = useMyProfile();
  const { data: myProfileData } = useUserProfile(String(myProfile?.id));
  const { data: sportsClubData } = useGetClubDetail(String(id));
  const { createDashBoardMutate } = useCreateDashBoard();

  const messageArray: {
    avatar_url: string;
    id: string;
    message: string;
    name: string;
  }[] = sportsClubData?.data?.message || [];

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    console.log('Input changed:', e.target.value);
  };

  const handleSubmit = () => {
    createDashBoardMutate({
      userId: myProfileData.id,
      name: myProfileData.name || '',
      clubId: id as string,
      avatar_url: myProfileData.avatar_url || '',
      message: message,
    });
    setMessage('');
  };

  return (
    isOpen && (
      <ModalWrapper isOpen={isOpen} close={close}>
        <div className="flex h-[700px] w-[500px] flex-col rounded-lg bg-white p-5">
          <Flex items="center" justify="between" className="mb-3 w-full">
            <Text size="md" weight="semibold">
              공지사항 게시판
            </Text>
            <Text size="lg" className="cursor-pointer">
              <MdClose onClick={close} />
            </Text>
          </Flex>
          <div className="h-[90%] w-full overflow-y-scroll">
            {messageArray.map((message) => (
              <div
                key={message.id}
                className="mb-2 flex h-[100px] w-full gap-5 rounded-lg bg-slate-100 p-3"
              >
                <Image
                  width={70}
                  height={70}
                  src={message.avatar_url}
                  alt={message.name}
                  className="rounded-lg"
                />
                <Flex direction="col" justify="center" gap={5}>
                  <Text weight="semibold" size="lg">
                    {message.name}
                  </Text>
                  <Text>{message.message}</Text>
                </Flex>
              </div>
            ))}
          </div>
          <div className="flex h-[6%] w-full gap-3">
            <input
              className="flex-1 rounded-lg border-2 p-3"
              value={message}
              onChange={onChangeInput}
            />
            <Button size="sm" onClick={handleSubmit}>
              등록하기
            </Button>
          </div>
        </div>
      </ModalWrapper>
    )
  );
};

export default SportsClubDashBoard;
