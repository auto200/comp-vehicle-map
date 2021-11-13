import { Vehicle } from "utils/models/vehicle.model";
import styles from "./VehicleDetailsPopup.module.css";

type VehicleDetailsPopupProps = {
  vehicle: Vehicle;
  onClose: () => void | Promise<void>;
};

export const VehicleDetailsPopup = ({
  vehicle,
  onClose,
}: VehicleDetailsPopupProps) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles["close-button"]} onClick={onClose}>
        X
      </button>
      <p>Name: {vehicle.name}</p>
      <p>Type: {vehicle.type}</p>
      <p>Battery level: {vehicle.batteryLevelPct}%</p>
      <p>Range: {vehicle.rangeKm}km</p>
    </div>
  );
};
