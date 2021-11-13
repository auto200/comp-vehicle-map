import { GeoJsonProperties } from "geojson";
import { PointFeature } from "supercluster";
import { Vehicle } from "utils/models/vehicle.model";

export const convertVehicleToPoint = (
  vehicle: Vehicle
): PointFeature<GeoJsonProperties> => ({
  type: "Feature",
  properties: {
    cluster: false,
    vehicle,
  },
  geometry: {
    type: "Point",
    coordinates: [vehicle.location.longitude, vehicle.location.latitude],
  },
});
