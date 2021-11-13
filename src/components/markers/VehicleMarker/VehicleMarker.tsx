import clsx from "clsx";
import { ChildComponentProps } from "google-map-react";
import React from "react";
import { VehicleStatus } from "utils/enums/VehicleStatus";
import { Vehicle } from "utils/models/vehicle.model";
import { getCenterMarkerStyles } from "../shared";
import styles from "./VehicleMarker.module.css";

type VegicleMarkerProps = {
  vehicle: Vehicle;
  size?: number;
  onClick?: () => void | Promise<void>;
  active: boolean;
} & ChildComponentProps;

export const VehicleMarker = ({
  vehicle,
  size = 20,
  onClick,
  active,
}: VegicleMarkerProps) => {
  const classNames = clsx(
    styles.marker,
    {
      //add styles according to vehicle status
      [styles.available]: vehicle.status === VehicleStatus.AVAILABLE,
    },
    active && styles.active
  );

  return (
    <button
      className={classNames}
      style={{
        ...getCenterMarkerStyles(size),
      }}
      onClick={onClick}
    ></button>
  );
};
