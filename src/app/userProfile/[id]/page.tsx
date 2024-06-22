'use client';

import { Container, Footer, Header } from '@/components';
import { CreateSportsClub } from '@/components/SportsClubs/CreateSportsClub';
import EditUserProfile from '@/components/User/EditUserProfile';
import { Button, Flex, SportsClub, Text, UserIcon } from '@/components/common';
import { useLogout } from '@/hooks/account/useLogout';
import { useGetSportsClub } from '@/hooks/sportsClub/useGetSportsClub';
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
  const { data: sportsClub } = useGetSportsClub();
  const { logoutMutate } = useLogout();

  const userInfo: UserProfile = userProfile;

  const overlay = useOverlay();

  const handleEditUserProfileModal = () => {
    overlay.open(({ isOpen, close }) => (
      <EditUserProfile isOpen={isOpen} close={close} />
    ));
  };

  const dataSportsClub: CreateSportsClub[] = sportsClub?.data ?? [];

  const userClubs = dataSportsClub.filter((club) =>
    club.members.some((member) => member.id === userProfile?.id),
  );

  console.log('dataSportsClub', dataSportsClub);

  return (
    <>
      <Header />
      <Container
        className="flex w-full flex-col pt-[60px]"
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        <Flex
          className="relative min-h-[200px] rounded-b-lg bg-orange-100"
          justify="between"
        >
          <Flex>
            <div className="absolute left-8 mt-[40px]">
              {userInfo?.avatar_url?.length > 0 ? (
                <Image
                  className="rounded-lg"
                  src={userInfo?.avatar_url}
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
                <Text className="mt-2">{userInfo?.introduce}</Text>
              </Flex>
            </Flex>
          </Flex>
          {myProfile && myProfile.id === userId && (
            <Flex className="mr-7" justify="end" items="center">
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
          <div className="mb-14 mt-8 grid grid-cols-4 gap-4">
            {userClubs.map((club, idx) => (
              <SportsClub
                key={idx}
                id={club.id}
                heart={club.heart}
                imageUrl={String(club.clubPoster)}
                title={club.title}
                subTitle={String(club.subTitle)}
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
