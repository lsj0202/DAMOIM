import { useEditUserProfile } from '@/hooks/user/useEditUserProfile';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { ModalProps } from '@/types/Modal';
import { EditUserProfile } from '@/types/UserProfile';
import supabase from '@/utils/supabase';
import { nanoid } from 'nanoid';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { Flex, Text } from '../common';
import ModalWrapper from '../layout/ModalWrapper';

const EditUserProfileModal = ({ isOpen, close }: ModalProps) => {
  const { id } = useParams();

  const { data: myProfile } = useUserProfile(String(id));

  const myProfileInfo = myProfile as EditUserProfile;
  const myId = myProfile?.id as string;

  const { register, handleSubmit, setValue } = useForm<EditUserProfile>({
    defaultValues: {
      name: '',
      age: 0,
      introduce: '',
      location: '',
      avatar_url: '',
    },
  });

  useEffect(() => {
    setValue('name', myProfileInfo?.name);
    setValue('age', myProfileInfo?.age);
    setValue('location', myProfileInfo?.location);
    setValue('introduce', myProfileInfo?.introduce);
    setValue('avatar_url', myProfileInfo?.avatar_url);
  }, [myProfileInfo, setValue]);

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    myProfileInfo?.avatar_url,
  );

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFileName = nanoid();
      const { data, error } = await supabase.storage
        .from('damoim')
        .upload(`products/${newFileName}`, file);
      if (error) return;

      const {
        data: { publicUrl },
      } = supabase.storage.from('damoim').getPublicUrl(data.path);
      if (publicUrl) {
        setAvatarPreview(publicUrl);
        setValue('avatar_url', publicUrl);
      }
    }
  };

  const { editUserProfileMutate } = useEditUserProfile({ close });

  const handleEditUserProfile = (formData: EditUserProfile) => {
    editUserProfileMutate({ data: formData, id: myId });
  };

  return (
    isOpen && (
      <ModalWrapper isOpen={isOpen} close={close}>
        <form onSubmit={handleSubmit(handleEditUserProfile)}>
          <Flex
            className="h-[550px] w-[450px] rounded-lg bg-white p-5"
            direction="col"
            gap={10}
          >
            <Flex justify="between" items="center">
              <Text size="md" weight="semibold">
                프로필 수정하기
              </Text>
              <Text size="lg" weight="semibold" className="cursor-pointer">
                <MdClose onClick={close} />
              </Text>
            </Flex>
            <label htmlFor="avatarInput">
              <Flex
                className="relative size-[100px] rounded-full bg-gray-200"
                items="center"
                justify="center"
                style={{
                  backgroundImage: `url(${avatarPreview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 100,
                }}
              >
                <input
                  id="avatarInput"
                  type="file"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                />
                <Text className="text-gray-500">이미지 업로드</Text>
              </Flex>
            </label>
            <Flex direction="col" gap={3}>
              <Text>이름</Text>
              <input
                className="w-[full] flex-1 rounded-md border p-3"
                {...register('name', {
                  required: '이름을 입력해주세요',
                })}
                type="text"
                placeholder="이름을 입력해주세요"
              />
            </Flex>
            <Flex direction="col" gap={3}>
              <Text>나이</Text>
              <input
                className="w-[full] flex-1 rounded-md border p-3"
                {...register('age', {
                  required: '나이를 입력해주세요',
                })}
                type="number"
                placeholder="나이를 입력해주세요"
              />
            </Flex>
            <Flex direction="col" gap={3}>
              <Text>지역</Text>
              <input
                className="w-[full] flex-1 rounded-md border p-3"
                {...register('location', {
                  required: '지역을 입력해주세요',
                })}
                type="text"
                placeholder="지역을 입력해주세요"
              />
            </Flex>
            <Flex direction="col" gap={3}>
              <Text>자기소개</Text>
              <input
                className="w-[full] flex-1 rounded-md border p-3"
                {...register('introduce', {
                  required: '자기소개를 입력해주세요',
                })}
                type="text"
                placeholder="자기소개를 입력해주세요"
              />
            </Flex>
            <button
              type="submit"
              className="mt-5 rounded-md bg-orange-500 p-3 text-white"
            >
              수정하기
            </button>
          </Flex>
        </form>
      </ModalWrapper>
    )
  );
};

export default EditUserProfileModal;
