import { ChildComponentProps } from "google-map-react";
import React from "react";
import { Vehicle } from "utils/models/vehicle.model";

type VegicleMarkerProps = {
  vehicle: Vehicle;
} & ChildComponentProps;

export const VehicleMarker = ({ vehicle }: VegicleMarkerProps) => {
  return (
    <button
      style={{
        width: 40,
        height: 40,
        border: "2px solid black",
        borderRadius: "50%",
      }}
    ></button>
  );
};
