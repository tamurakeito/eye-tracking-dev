import React from "react";
import { ColorPalette, ColorPaletteProps } from ".";
import { StoryObj, Meta } from "@storybook/react";

export default {
  title: "Design System/ColorPalette",
  component: ColorPalette,
} as Meta<typeof ColorPalette>;

export const Default: StoryObj<{ args: ColorPaletteProps }> = {
  args: {
    colors: [
      // { name: "peel" },
      // { name: "outer-flesh" },
      // { name: "inner-flesh" },
      // { name: "outer-seed" },
      // { name: "inner-seed" },
    ],
  },
};
