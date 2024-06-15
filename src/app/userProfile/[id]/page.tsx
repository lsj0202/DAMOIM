'use client';

import { Container, Footer, Header, SportsClubReviewItem } from '@/components';
import EditUserProfile from '@/components/User/EditUserProfile';
import { Button, Flex, Text, UserIcon } from '@/components/common';
import { useLogout } from '@/hooks/account/useLogout';
import { useMyProfile } from '@/hooks/user/useMyProfile';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { UserProfile } from '@/types/UserProfile';
import { useOverlay } from '@toss/use-overlay';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const UserProfilePage = () => {
  const { id } = useParams();
  const userId = id as string;

  const { data: myProfile } = useMyProfile();
  const { data: userProfile } = useUserProfile(userId);

  const { logoutMutate } = useLogout();

  const userInfo: UserProfile = userProfile;

  const overlay = useOverlay();

  const handleEditUserProfileModal = () => {
    overlay.open(({ isOpen, close }) => (
      <EditUserProfile isOpen={isOpen} close={close} />
    ));
  };

  const reviews = [
    {
      name: '이상진',
      rating: '★★★★★',
      clubName: '테니스 클럽',
      imageSrc: '/imgs/mockImg.jpeg',
      reviewText:
        '지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다. 지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다.',
    },
    {
      name: '이상진',
      rating: '★★★★★',
      clubName: '탁구 클럽',
      imageSrc: '/imgs/mockImg.jpeg',
      reviewText:
        '지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다. 지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다.',
    },
    {
      name: '이상진',
      rating: '★★★★★',
      clubName: '헬스 클럽',
      imageSrc: '/imgs/mockImg.jpeg',
      reviewText:
        '지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다. 지금 당장 가입하세요! 테니스 클럽에 가입하고 더 나은 삶을 살 수 있게 되었습니다.',
    },
  ];

  return (
    <>
      <Header />
      <Container
        className="flex w-full flex-col pt-[60px]"
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        <Flex className="relative min-h-[200px] rounded-b-lg bg-orange-100">
          <div className="absolute left-8 mt-[40px]">
            {userInfo?.avatar_url.length > 0 ? (
              <Image
                className="rounded-lg"
                src="/imgs/mockImg.jpeg"
                width={200}
                height={200}
                alt=""
              />
            ) : (
              <Flex
                items="center"
                justify="center"
                className="size-[200px] rounded-lg bg-slate-100"
              >
                <UserIcon size={150} iconSize={80} />
              </Flex>
            )}
          </div>
          <Flex className="ml-[220px] px-8" items="center">
            <Flex direction="col" gap={6}>
              <Text size="x" weight="semibold">
                {userInfo?.name}
              </Text>
              <Flex gap={15} className="mt-5" items="center">
                <Text size="md">{userInfo?.age}살</Text> |
                <Text size="md">{userInfo?.location} 거주</Text>
              </Flex>
            </Flex>
          </Flex>

          {myProfile && myProfile.id === userId && (
            <Flex className="w-1/2" justify="end" items="center">
              <Flex direction="col" gap={10}>
                <Button size="md" onClick={handleEditUserProfileModal}>
                  편집하기
                </Button>
                <Button size="md" bgColor="gray" onClick={() => logoutMutate()}>
                  로그아웃
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Flex className="mt-12 min-h-[300px]" direction="col">
          <Text size="lg" weight="semibold" className="my-3">
            스포츠 클럽 활동
          </Text>
          <div className="grid grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <SportsClubReviewItem
                key={index}
                name={review.name}
                clubName={review.clubName}
                rating={review.rating}
                imageSrc={review.imageSrc}
                reviewText={review.reviewText}
              />
            ))}
          </div>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default UserProfilePage;
