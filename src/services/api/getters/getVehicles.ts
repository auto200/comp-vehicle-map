import { VehicleModel } from "utils/models/vehicle.model";
import { fetcher } from "../fetcher";

type VehiclesResponse = {
  objects: VehicleModel[];
};

export const getVehicles = async () => {
  const vehiclesResponse = await fetcher("/map?objectType=VEHICLE");
  const vehicles = (await vehiclesResponse.json()) as VehiclesResponse;
  return vehicles.objects;
};
