import { ChildComponentProps } from "google-map-react";
import React from "react";
import { Vehicle } from "utils/models/vehicle.model";
import { getMarkerBaseStyles } from "../shared";

type VegicleMarkerProps = {
  vehicle: Vehicle;
  size?: number;
} & ChildComponentProps;

export const VehicleMarker = ({ vehicle, size = 20 }: VegicleMarkerProps) => {
  return (
    <button
      style={{
        ...getMarkerBaseStyles(size),
        border: "2px solid black",
        borderRadius: "50%",
      }}
    ></button>
  );
};
