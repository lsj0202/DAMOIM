import { useGetApplicationPeople } from '@/hooks/sportsClub/useGetApplicationPeople';
import { ModalProps } from '@/types/Modal';
import { useParams } from 'next/navigation';
import { MdClose } from 'react-icons/md';
import { Flex, Text } from '../common';
import ModalWrapper from '../layout/ModalWrapper';
import ApplicationUser from './ApplicationUser';

export type ApplicationUserType = {
  user_id: string;
};

const ViewApplicationUsers = ({ isOpen, close }: ModalProps) => {
  const { id } = useParams();
  const { data } = useGetApplicationPeople(Number(id));
  const applicationPeopleData: ApplicationUserType[] = data?.data || [];

  return (
    isOpen && (
      <ModalWrapper isOpen={isOpen} close={close}>
        <Flex
          className="h-[600px] w-[500px] rounded-lg bg-white p-5"
          direction="col"
        >
          <Flex items="center" justify="between">
            <Text size="md">가입 신청 유저</Text>
            <Text size="lg" className="cursor-pointer">
              <MdClose onClick={close} />
            </Text>
          </Flex>
          <div className="min-h-[500px] w-full overflow-y-auto pt-4">
            {applicationPeopleData?.map((data) => (
              <ApplicationUser key={data.user_id} data={data} />
            ))}
          </div>
        </Flex>
      </ModalWrapper>
    )
  );
};

export default ViewApplicationUsers;
