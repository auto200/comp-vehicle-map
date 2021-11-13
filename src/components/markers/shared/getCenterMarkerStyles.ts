import { CSSProperties } from "react";

// initially any map object has left top corner at lat lng coordinates
// it's on us to set object origin to 0,0 coordinates
export const getCenterMarkerStyles = (size: number): CSSProperties => ({
  position: "absolute",
  width: size,
  height: size,
  left: -size / 2,
  top: -size / 2,
});
