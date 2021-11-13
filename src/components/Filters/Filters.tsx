import React from "react";
import { Filters as FiltersT } from "utils/models/Filters";
import styles from "./Filters.module.css";

type FiltersProps = {
  filters: FiltersT;
  setFilters: React.Dispatch<React.SetStateAction<FiltersT>>;
};

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Filters</p>
      <div className={styles.row}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={filters.showOnlyAvailableVehicles}
          onChange={(e) =>
            setFilters({
              ...filters,
              showOnlyAvailableVehicles: e.target.checked,
            })
          }
        />
        show only available vehicles
      </div>
      <div className={styles.row}>
        <input
          type="number"
          className={styles["range-input"]}
          value={filters.vehicleMinKmRange || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              vehicleMinKmRange: parseFloat(e.target.value) ?? null,
            })
          }
        />
        minimum range in KM
      </div>
    </div>
  );
};
