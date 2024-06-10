import type { Meta, StoryObj } from '@storybook/react';

import { StarRating } from '@/components/common';

const meta = {
  title: 'StarRating',
  component: StarRating,
  tags: ['autodocs'],
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStarRating: Story = {};
