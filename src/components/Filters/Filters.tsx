import React from "react";
import { FiltersModel } from "utils/models/Filters.model";
import styles from "./Filters.module.css";

type FiltersProps = {
  filters: FiltersModel;
  setFilters: React.Dispatch<React.SetStateAction<FiltersModel>>;
};

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      showOnlyAvailableVehicles: e.target.checked,
    });
  };

  const handleKmRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      vehicleMinKmRange: parseFloat(e.target.value) ?? null,
    });
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Filters</p>
      <div className={styles.row}>
        <input
          type="checkbox"
          id="filters-availability-checkbox"
          className={styles.checkbox}
          checked={filters.showOnlyAvailableVehicles}
          onChange={handleAvailabilityChange}
        />
        <label htmlFor="filters-availability-checkbox">
          Show only available vehicles
        </label>
      </div>
      <div className={styles.row}>
        <input
          type="number"
          id="filters-range-input"
          className={styles["range-input"]}
          value={filters.vehicleMinKmRange ?? ""}
          onChange={handleKmRangeChange}
        />
        <label htmlFor="filters-range-input">Minimum range in KM</label>
      </div>
    </div>
  );
};
