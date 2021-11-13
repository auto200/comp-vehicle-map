import { Vehicle } from "utils/models/vehicle.model";
import styles from "./VehicleDetailsPopup.module.css";

type VehicleDetailsPopupProps = {
  vehicle: Vehicle;
};

export const VehicleDetailsPopup = ({ vehicle }: VehicleDetailsPopupProps) => {
  return (
    <div className={styles.wrapper}>
      <p>Name: {vehicle.name}</p>
      <p>Type: {vehicle.type}</p>
      <p>Battery level: {vehicle.batteryLevelPct}%</p>
      <p>Range: {vehicle.rangeKm}km</p>
    </div>
  );
};
