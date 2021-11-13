import { ChildComponentProps } from "google-map-react";
import React from "react";
import { getMarkerBaseStyles } from "../shared";

type ClusterMarkerProps = {
  pointCount: number;
  size: number;
} & ChildComponentProps;

export const ClusterMarker: React.FC<ClusterMarkerProps> = ({
  pointCount,
  size,
}) => {
  console.log(size);
  return (
    <div
      style={{
        ...getMarkerBaseStyles(size),
        border: "6px solid yellow",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 18,
      }}
    >
      {pointCount}
    </div>
  );
};
