import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardImage, CardContent, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Common/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardContent>
        <h3>Card Title</h3>
        <p>This is some card content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card padding="none">
      <CardImage
        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"
        alt="Gaming setup"
      />
      <CardContent>
        <h3>Game Title</h3>
        <p>A short description of the game.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card padding="none">
      <CardImage
        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"
        alt="Gaming"
      />
      <CardContent>
        <h3>Game Title</h3>
        <p>Description</p>
      </CardContent>
      <CardFooter>
        <span>⭐ 9.5</span>
        <span>$59.99</span>
      </CardFooter>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card padding="none" hoverable>
      <CardImage
        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"
        alt="Gaming"
      />
      <CardContent>
        <h3>Hoverable Card</h3>
        <p>Hover over me!</p>
      </CardContent>
    </Card>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card padding="none" hoverable onClick={() => alert('Card clicked!')}>
      <CardImage
        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"
        alt="Gaming"
      />
      <CardContent>
        <h3>Clickable Card</h3>
        <p>Click me!</p>
      </CardContent>
    </Card>
  ),
};
