import type { Meta, StoryObj } from '@storybook/react';

import { Flex, SportsClub } from '@/components/common';

const meta = {
  title: 'SportsClub',
  component: SportsClub,
  tags: ['autodocs'],
} satisfies Meta<typeof SportsClub>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSportsClub: Story = {
  args: {
    isMyClub: false,
    imageUrl:
      'https://i.pinimg.com/originals/bc/5d/f5/bc5df5527019d75dfc4f24f67fd4dc27.jpg',
    title: '주 4회 헬스클럽 오픈!',
    subTitle:
      '우리동네 헬스장에서 같이 운동해요! 모든 문의는 채팅을 통해 주세요!',
    heart: 0,
  },

  render: (args) => (
    <Flex items="center" justify="center" className="h-screen w-full">
      <SportsClub {...args} />
    </Flex>
  ),
};
