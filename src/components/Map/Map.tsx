import { ClusterMarker, VehicleMarker } from "components/markers";
import { BBox } from "geojson";
import GoogleMapReact from "google-map-react";
import React, { useRef, useState } from "react";
import useSupercluster from "use-supercluster";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "utils/constants";
import { Vehicle } from "utils/models/vehicle.model";
import { convertVehicleToPoint } from "./utils";

type MapProps = {
  vehicles: Vehicle[];
};

export const Map = ({ vehicles }: MapProps) => {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [bounds, setBounds] = useState<BBox | undefined>();

  const mapRef = useRef();

  const points = vehicles.map((vehicle) => convertVehicleToPoint(vehicle));

  const getClausterMakerSize = (pointCount: number) => {
    const BASE = 10;
    const PERCENT_OF_ALL = pointCount / points.length;
    const MULTIPLIER = 100;
    const MAX_SIZE = 25;

    const size = BASE + PERCENT_OF_ALL * MULTIPLIER;
    return Math.min(size, MAX_SIZE);
  };

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });
  console.log(clusters);

  return (
    <GoogleMapReact
      // bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY as string }}
      defaultCenter={DEFAULT_CENTER}
      defaultZoom={DEFAULT_ZOOM}
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
              size={getClausterMakerSize(pointCount)}
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
          />
        );
      })}
    </GoogleMapReact>
  );
};
