import { VehicleMarker } from "components/markers/VehicleMarker/VehicleMarker";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { getVehicles } from "services/api";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "utils/constants";
import { Vehicle } from "utils/models/vehicle.model";
import styles from "./App.module.css";

type State = "idle" | "loading" | "error";

const App = () => {
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
      <GoogleMapReact
        // bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY as string }}
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={DEFAULT_ZOOM}
      >
        {vehicles.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id}
            lat={vehicle.location.latitude}
            lng={vehicle.location.longitude}
            vehicle={vehicle}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default App;
