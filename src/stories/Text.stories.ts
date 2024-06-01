import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@/components/common';

const meta = {
  title: 'Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'Hello, World!',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultText: Story = {
  args: {
    size: 'md',
    color: 'black',
    weight: 'bold',
  },
};
