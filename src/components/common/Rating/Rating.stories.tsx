import type { Meta, StoryObj } from '@storybook/react';
import { Rating, Metacritic } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Common/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 8.5,
    max: 10,
  },
};

export const HighRating: Story = {
  args: {
    value: 9.5,
    max: 10,
  },
};

export const MediumRating: Story = {
  args: {
    value: 6.5,
    max: 10,
  },
};

export const LowRating: Story = {
  args: {
    value: 4.0,
    max: 10,
  },
};

export const SmallSize: Story = {
  args: {
    value: 8.5,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    value: 8.5,
    size: 'lg',
  },
};

export const BarVariant: Story = {
  args: {
    value: 8.5,
    variant: 'bar',
  },
};

export const WithoutValue: Story = {
  args: {
    value: 7.5,
    showValue: false,
  },
};

export const MetacriticHigh: Story = {
  render: () => <Metacritic score={92} size="lg" />,
};

export const MetacriticMedium: Story = {
  render: () => <Metacritic score={65} size="lg" />,
};

export const MetacriticLow: Story = {
  render: () => <Metacritic score={42} size="lg" />,
};
