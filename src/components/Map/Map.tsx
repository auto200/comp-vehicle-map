import { ClusterMarker, VehicleMarker } from "components/markers";
import { BBox } from "geojson";
import GoogleMapReact from "google-map-react";
import React, { useRef, useState } from "react";
import useSupercluster from "use-supercluster";
import { VehicleModel } from "utils/models/vehicle.model";
import {
  CLAUSTER_MARKER_SIZE,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
} from "./constants";
import { convertVehicleToPoint } from "./utils";

type MapProps = {
  vehicles: VehicleModel[];
  selectedVehicleId: string;
  setSelectedVehicleId: React.Dispatch<React.SetStateAction<string>>;
};

export const Map = ({
  vehicles,
  selectedVehicleId,
  setSelectedVehicleId,
}: MapProps) => {
  const [zoom, setZoom] = useState(DEFAULT_MAP_ZOOM);
  const [bounds, setBounds] = useState<BBox | undefined>();

  const mapRef = useRef();

  const points = vehicles.map((vehicle) => convertVehicleToPoint(vehicle));

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
  });

  return (
    <GoogleMapReact
      // bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY as string }}
      defaultCenter={DEFAULT_MAP_CENTER}
      defaultZoom={DEFAULT_MAP_ZOOM}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map }) => (mapRef.current = map)}
      onChange={({ zoom, bounds }) => {
        setZoom(zoom);
        setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
      }}
    >
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const isCluster = cluster.properties?.cluster;
        const pointCount = cluster.properties?.point_count;

        if (isCluster) {
          return (
            <ClusterMarker
              key={cluster.id}
              lat={lat}
              lng={lng}
              pointCount={pointCount}
              size={CLAUSTER_MARKER_SIZE}
            />
          );
        }

        const vehicle = cluster.properties?.vehicle;

        return (
          <VehicleMarker
            key={vehicle.id}
            lat={vehicle.location.latitude}
            lng={vehicle.location.longitude}
            vehicle={vehicle}
            active={vehicle.id === selectedVehicleId}
            onClick={() => setSelectedVehicleId(vehicle.id)}
            onPopupClose={() => setSelectedVehicleId("")}
          />
        );
      })}
    </GoogleMapReact>
  );
};
