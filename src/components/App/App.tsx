import { Filters } from "components/Filters";
import { Loader } from "components/Loader";
import { Map } from "components/Map";
import React, { useEffect, useState } from "react";
import { getVehicles } from "services/api";
import { ErrorMessages } from "utils/enums/errorMessages";
import { VehicleStatus } from "utils/enums/VehicleStatus";
import { FiltersModel as FiltersT } from "utils/models/Filters.model";
import { VehicleModel } from "utils/models/vehicle.model";
import styles from "./App.module.css";

type State = "idle" | "loading" | "error";

export const App = () => {
  const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [state, setState] = useState<State>("idle");
  const [filtredVehicles, setFiltredVehicles] = useState<VehicleModel[]>([]);
  const [filters, setFilters] = useState<FiltersT>({
    showOnlyAvailableVehicles: false,
    vehicleMinKmRange: null,
  });
  const [selectedVehicleId, setSelectedVehicleId] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        setState("loading");
        const vehicles = await getVehicles();
        setVehicles(vehicles);
        setState("idle");
      } catch (err) {
        console.log(err);
        setState("error");
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (vehicles.length === 0) {
      return;
    }

    let filtredVehicles = vehicles;

    if (filters.showOnlyAvailableVehicles) {
      filtredVehicles = filtredVehicles.filter(
        (vehicle) => vehicle.status === VehicleStatus.AVAILABLE
      );
    }

    if (filters.vehicleMinKmRange) {
      filtredVehicles = filtredVehicles.filter(
        (vehicle) => vehicle.rangeKm > filters.vehicleMinKmRange!
      );
    }

    setFiltredVehicles(filtredVehicles);
  }, [vehicles, filters]);

  return (
    <div className={styles.container} data-testid="app">
      {state === "loading" && <Loader />}
      {state === "error" && ErrorMessages.VEHICLES_FETCH_ERROR}
      {vehicles.length !== 0 && (
        <>
          <Map
            vehicles={filtredVehicles}
            selectedVehicleId={selectedVehicleId}
            setSelectedVehicleId={setSelectedVehicleId}
          />
          <Filters filters={filters} setFilters={setFilters} />
        </>
      )}
    </div>
  );
};
