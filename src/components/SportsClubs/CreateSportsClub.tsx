import { useCreateSportsClub } from '@/hooks/sportsClub/useCreateSportsClub';
import useDebounce from '@/hooks/useDebounce';
import { useMyProfile } from '@/hooks/user/useMyProfile';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { ModalProps } from '@/types/Modal';
import { UserProfile } from '@/types/UserProfile';
import supabase from '@/utils/supabase';
import { nanoid } from 'nanoid';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { Button, Flex, Text } from '../common';
import ModalWrapper from '../layout/ModalWrapper';

export type Schedule = {
  day: string;
  start: string;
  end: string;
};

export type CreateSportsClub = {
  id: string;
  title: string;
  subTitle?: string;
  location: string;
  latitude: number;
  longitude: number;
  schedules?: Schedule[];
  heart: number;
  avgAge: number;
  avgReview: number;
  clubPoster?: string;
  members: UserProfile[];
  reviews?: {
    id: string;
    rating: number;
    review: string;
    avatar_url: string;
    name: string;
  }[];
};

declare global {
  interface Window {
    kakao: any;
  }
}

const CreateSportsClub = ({ isOpen, close }: ModalProps) => {
  const { register, control, handleSubmit, watch, setValue } =
    useForm<CreateSportsClub>({
      defaultValues: {
        title: '',
        subTitle: '',
        location: '',
        latitude: 0,
        longitude: 0,
        schedules: [{ day: '월요일', start: '00:00', end: '00:00' }],
        heart: 0,
        avgAge: 0,
        avgReview: 0,
        clubPoster: '',
      },
    });

  const { fields, append, remove } = useFieldArray({
    name: 'schedules',
    control,
  });

  const location = watch('location');
  const debouncedValue = useDebounce({ value: location, delay: 200 });
  const { data: myProfile } = useMyProfile();
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);

  useEffect(() => {
    if (debouncedValue && isKakaoMapLoaded) {
      geocodeLocation(debouncedValue);
    }
  }, [debouncedValue, isKakaoMapLoaded]);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      setIsKakaoMapLoaded(true);
    });
  };

  const geocodeLocation = (address: string) => {
    if (!isKakaoMapLoaded) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setValue('latitude', result[0].y);
        setValue('longitude', result[0].x);
      }
    });
  };

  const [clubPoster, setClubPoster] = useState('');

  const handleAddClubPoster = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
        setClubPoster(publicUrl);
        setValue('clubPoster', publicUrl);
      }
    }
  };

  const { data: userInfo } = useUserProfile(String(myProfile?.id));

  const { createSportsClubMutate } = useCreateSportsClub({ close });

  const onSubmit: SubmitHandler<CreateSportsClub> = async (data) => {
    const sportsClubData: CreateSportsClub = {
      ...data,
      members: [{ ...userInfo, id: String(myProfile?.id) }],
    };

    createSportsClubMutate({ data: sportsClubData });
  };

  return (
    isOpen && (
      <>
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services&autoload=false`}
          onReady={loadKakaoMap}
        />
        <ModalWrapper isOpen={isOpen} close={close}>
          <Flex
            className="h-[600px] w-[800px] rounded-lg bg-white p-6 shadow-lg"
            direction="col"
          >
            <Flex items="center" justify="between" className="mb-4">
              <Text size="lg" weight="semibold">
                스포츠 클럽 생성
              </Text>
              <MdClose className="cursor-pointer text-xl" onClick={close} />
            </Flex>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 overflow-y-auto"
            >
              <Flex
                className="relative size-[100px] cursor-pointer rounded-full bg-gray-200"
                items="center"
                justify="center"
                style={{
                  backgroundImage: `url(${clubPoster})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 100,
                }}
              >
                <input
                  id="avatarInput"
                  type="file"
                  onChange={handleAddClubPoster}
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                />
                <Text className="text-gray-500">이미지 업로드</Text>
              </Flex>
              <Flex direction="col" gap={5}>
                <label>스포츠 클럽명</label>
                <input
                  {...register('title')}
                  className="block w-full rounded-lg border border-gray-300 p-2.5"
                />
              </Flex>
              <Flex direction="col" gap={5}>
                <label>스포츠클럽 소개</label>
                <input
                  {...register('subTitle')}
                  className="block w-full rounded-lg border border-gray-300 p-2.5"
                />
              </Flex>
              <Flex direction="col" gap={5}>
                <label>위치</label>
                <input
                  {...register('location')}
                  className="block w-full rounded-lg border border-gray-300 p-2.5"
                />
              </Flex>
              <input {...register('latitude')} type="hidden" />
              <input {...register('longitude')} type="hidden" />
              <div className="min-h-[210px] overflow-y-auto">
                <label className="block text-sm font-medium text-gray-700">
                  일정
                </label>
                {fields.map((field, index) => (
                  <div key={field.id} className="mb-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        {...register(`schedules.${index}.day`)}
                        defaultValue={field.day}
                        className="block w-1/3 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                      />
                      <input
                        type="time"
                        {...register(`schedules.${index}.start`)}
                        defaultValue={field.start}
                        className="block w-1/3 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                      />
                      <input
                        type="time"
                        {...register(`schedules.${index}.end`)}
                        defaultValue={field.end}
                        className="block w-1/3 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                      />
                      <Button onClick={() => remove(index)} className="ml-2">
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}
                <Flex
                  onClick={() => append({ day: '', start: '', end: '' })}
                  className="mt-2 max-w-[100px] cursor-pointer rounded-lg bg-orange-500 px-[17px] py-[15px] hover:bg-orange-600"
                  items="center"
                  justify="center"
                >
                  <Text color="white" weight="semibold">
                    일정 추가
                  </Text>
                </Flex>
              </div>
              <Flex justify="end">
                <Button>생성하기</Button>
              </Flex>
            </form>
          </Flex>
        </ModalWrapper>
      </>
    )
  );
};

export default CreateSportsClub;
