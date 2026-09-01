import * as React from "react";

// import { IconSvgProps } from "../../types";
import { getSiteURL } from "../config/site";

export const Logo: React.FC<{ width?: number; height?: number }> = ({
  width = 180,
  height = 48,
}) => {
  return (
    <img
      alt="Logo"
      height={height}
      src={getSiteURL('/images/logo.png')}
      style={{ objectFit: 'contain' }}
      width={width}
    />
  );
};
