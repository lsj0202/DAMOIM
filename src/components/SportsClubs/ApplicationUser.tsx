import { useAcceptApplication } from '@/hooks/sportsClub/useAcceptApplicationSportsClub';
import { useDeleteApplicationSportsClub } from '@/hooks/sportsClub/useDeleteApplicationSportsClub';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { UserProfile } from '@/types/UserProfile';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button, Flex, Text, UserIcon } from '../common';
import { type ApplicationUserType } from './ViewApplicationUsers';

const ApplicationUser = ({ data }: { data: ApplicationUserType }) => {
  const { data: userProfile } = useUserProfile(data.user_id);
  const userProfileInfo: UserProfile = userProfile;
  const { id } = useParams();

  const { acceptApplicationMutate } = useAcceptApplication();
  const { deleteApplicationMutate } = useDeleteApplicationSportsClub();

  const handleAcceptApplication = () => {
    acceptApplicationMutate({ userId: userProfile?.id, clubId: Number(id) });
  };

  const handleDeleteApplication = () => {
    deleteApplicationMutate({ userId: userProfile?.id, clubId: Number(id) });
  };

  return (
    <Flex
      className="mb-2 min-h-[90px] rounded-lg bg-slate-50 p-3"
      items="center"
      justify="between"
    >
      <Flex>
        {userProfileInfo?.avatar_url?.length > 0 ? (
          <Image
            className="rounded-lg"
            src={userProfileInfo?.avatar_url}
            width={80}
            height={80}
            alt=""
          />
        ) : (
          <Flex
            items="center"
            justify="center"
            className="size-[80px] rounded-lg bg-slate-100"
          >
            <UserIcon size={60} iconSize={30} />
          </Flex>
        )}
        <Flex direction="col" gap={5} className="ml-3">
          <Text weight="semibold" size="md">
            {userProfileInfo?.name}
          </Text>
          <Text>{userProfileInfo?.age} 살</Text>
          <Text>{userProfileInfo?.location} 거주</Text>
        </Flex>
      </Flex>
      <Flex direction="col" gap={5}>
        <Button size="sm" onClick={handleAcceptApplication}>
          수락하기
        </Button>
        <Button size="sm" bgColor="gray" onClick={handleDeleteApplication}>
          거절하기
        </Button>
      </Flex>
    </Flex>
  );
};

export default ApplicationUser;
