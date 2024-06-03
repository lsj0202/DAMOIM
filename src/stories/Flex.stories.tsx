import { Button, Flex } from '@/components/common';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Flex',
  component: Flex,
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFlex: Story = {
  args: {
    items: 'center',
    justify: 'center',
    direction: 'col',
    gap: '1rem',
  },

  render: (args) => (
    <Flex {...args} className="h-screen w-full">
      <Button>플렉스 박스 버튼 1</Button>
      <Button>플렉스 박스 버튼 2</Button>
    </Flex>
  ),
};
