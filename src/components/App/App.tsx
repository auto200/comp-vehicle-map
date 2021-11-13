import { Filters } from "components/Filters";
import { Loader } from "components/Loader";
import { Map } from "components/Map";
import { VehicleDetails } from "components/VehicleDetails";
import React, { useEffect, useState } from "react";
import { getVehicles } from "services/api";
import { ErrorMessages } from "utils/enums/errorMessages";
import { VehicleStatus } from "utils/enums/VehicleStatus";
import { Filters as FiltersT } from "utils/models/Filters";
import { Vehicle } from "utils/models/vehicle.model";
import styles from "./App.module.css";

type State = "idle" | "loading" | "error";

export const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [state, setState] = useState<State>("idle");
  const [filtredVehicles, setFiltredVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<FiltersT>({
    showOnlyAvailableVehicles: false,
    vehicleMinKmRange: null,
  });
  const [selectedVehicleId, setSelectedVehicleId] = useState("");

  const selectedVehicle = filtredVehicles.find(
    ({ id }) => selectedVehicleId === id
  );

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
    <div className={styles["map-container"]}>
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
          {selectedVehicle && <VehicleDetails vehicle={selectedVehicle} />}
        </>
      )}
    </div>
  );
};
