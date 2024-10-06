import React from "react";
import "./index.scss";

interface ColorSwatchProps {
  name: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    }}
  >
    <div
      className={`color-palette ${name}`}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "25px",
        marginRight: "10px",
      }}
    ></div>
    <span
      style={{
        color: "#707070",
        fontWeight: "bold",
      }}
    >
      {name}
    </span>
  </div>
);

export interface ColorPaletteProps {
  colors: Array<{ name: string }>;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => (
  <div>
    {colors.map((color) => (
      <ColorSwatch key={color.name} name={color.name} />
    ))}
  </div>
);
