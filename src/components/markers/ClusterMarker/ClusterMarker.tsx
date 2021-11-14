import { ChildComponentProps } from "google-map-react";
import React from "react";
import { getCenterMarkerStyles } from "../shared";
import styles from "./ClusterMarker.module.css";

type ClusterMarkerProps = {
  pointCount: number;
  size: number;
} & ChildComponentProps;

export const ClusterMarker: React.FC<ClusterMarkerProps> = ({
  pointCount,
  size,
}) => {
  return (
    <div
      className={styles.marker}
      style={{
        ...getCenterMarkerStyles(size),
      }}
    >
      <span data-testid="cluster-marker-point-count">{pointCount}</span>
    </div>
  );
};
