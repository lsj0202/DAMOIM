import type { Meta, StoryObj } from '@storybook/react';

import { UserIcon } from '@/components/common';

const meta = {
  title: 'UserIcon',
  component: UserIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof UserIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultUserIcon: Story = {
  args: {
    size: 60,
    iconSize: 30,
  },
};
