import { Loader } from "components/Loader";
import { Map } from "components/Map";
import React, { useEffect, useState } from "react";
import { getVehicles } from "services/api";
import { ErrorMessages } from "utils/enums/errorMessages";
import { Vehicle } from "utils/models/vehicle.model";
import styles from "./App.module.css";

type State = "idle" | "loading" | "error";

export const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [state, setState] = useState<State>("idle");

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

  return (
    <div className={styles["map-container"]}>
      {state === "loading" && <Loader />}
      {state === "error" && ErrorMessages.VEHICLES_FETCH_ERROR}
      {vehicles.length !== 0 && <Map vehicles={vehicles} />}
    </div>
  );
};
