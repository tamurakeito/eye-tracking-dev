import type { Meta, StoryObj } from "@storybook/react";
import Text, { textSizes } from "ui/atoms/text";

const meta = {
  title: "Atom/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text_h1: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.h1,
  },
};

export const Text_h2: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.h2,
  },
};

export const Text_h3: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.h3,
  },
};

export const Text_h4: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.h4,
  },
};

export const Text_h5: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.h5,
  },
};

export const Text_h6: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.h6,
  },
};

export const Text_lg: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.lg,
  },
};

export const Text_md: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.md,
  },
};

export const Text_sm: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.sm,
  },
};

export const Text_xs: Story = {
  args: {
    children: "学習を開始する",
    size: textSizes.xs,
  },
};
