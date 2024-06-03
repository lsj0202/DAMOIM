import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/common';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args: {
    onSubmit: () => console.log('onSubmit'),
  },
};
