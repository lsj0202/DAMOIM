import { EditUserPrfileElement } from '@/constants/InputElement';
import { useMyProfile } from '@/hooks/user/useMyProfile';
import { ModalProps } from '@/types/Modal';
import { EditUserProfile, UserProfile } from '@/types/UserProfile';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Text } from '../common';
import ModalWrapper from '../layout/ModalWrapper';

const EditUserProfileModal = ({ isOpen, close }: ModalProps) => {
  const { data: myProfile } = useMyProfile();
  const myProfileInfo = myProfile?.user_metadata as UserProfile;
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
    if (myProfileInfo) {
      Object.keys(myProfileInfo).forEach((key) => {
        setValue(
          key as keyof EditUserProfile,
          myProfileInfo[key as keyof UserProfile],
        );
      });
    }
  }, [myProfileInfo, setValue]);

  const onSubmit = async (data: EditUserProfile) => {
    console.log(data);
  };

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    myProfileInfo?.avatar_url,
  );

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];
    // if (file) {
    //   const newFileName = uuid();
    //   const { data, error } = await supabase.storage
    //     .from('Image')
    //     .upload(`products/${newFileName}`, file);
    //   if (error) {
    //     console.log('파일이 업로드 되지 않습니다.', error);
    //     return;
    //   }
    //   const {
    //     data: { publicUrl },
    //   } = supabase.storage.from('Image').getPublicUrl(data.path);
    //   if (publicUrl) {
    //     setAvatarPreview(publicUrl);
    //     setValue('avatar_url', publicUrl);
    //   }
    // }
  };

  return (
    isOpen && (
      <ModalWrapper isOpen={isOpen} close={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            className="h-[550px] w-[450px] rounded-lg bg-white p-5"
            direction="col"
            gap={10}
          >
            <Text size="md" weight="semibold">
              프로필 수정하기
            </Text>
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

            {EditUserPrfileElement.map((inputData) => (
              <Flex key={inputData.id} direction="col" gap={3}>
                <Text>{inputData.title}</Text>
                <input
                  className="w-[full] flex-1 rounded-md border p-3"
                  {...register(inputData.InputValue as keyof EditUserProfile, {
                    required: inputData.InputText,
                  })}
                  defaultValue={
                    myProfileInfo?.[
                      inputData.InputValue as keyof UserProfile
                    ] || ''
                  }
                  type={inputData.InputValue === 'age' ? 'number' : 'text'}
                  placeholder={inputData.InputText}
                />
              </Flex>
            ))}
            <button
              type="submit"
              className="mt-5 rounded-md bg-orange-500 p-3 text-white"
            >
              제출하기
            </button>
          </Flex>
        </form>
      </ModalWrapper>
    )
  );
};

export default EditUserProfileModal;
