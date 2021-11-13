import { Vehicle } from "utils/models/vehicle.model";
import styles from "./VehicleDetails.module.css";

type VehicleDetailsProps = {
  vehicle: Vehicle;
};

export const VehicleDetails = ({ vehicle }: VehicleDetailsProps) => {
  return (
    <div className={styles.wrapper}>
      <p>Name: {vehicle.name}</p>
      <p>Type: {vehicle.type}</p>
      <p>Battery level: {vehicle.batteryLevelPct}%</p>
      <p>Range: {vehicle.rangeKm}km</p>
    </div>
  );
};
