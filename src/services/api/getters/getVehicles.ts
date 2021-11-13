import { Vehicle } from "utils/models/vehicle.model";
import { fetcher } from "../fetcher";

type VehiclesResponse = {
  objects: Vehicle[];
};

export const getVehicles = async () => {
  const vehiclesResponse = await fetcher("/map?objectType=VEHICLE");
  const vehicles = (await vehiclesResponse.json()) as VehiclesResponse;
  return vehicles.objects;
};
