import { render, screen } from "@testing-library/react";
import React from "react";
import { ClusterMarker } from "./ClusterMarker";

test("renders ClusterMarker with number of points", () => {
  const pointCount = 23;

  render(<ClusterMarker lat={1} lng={1} pointCount={pointCount} size={20} />);

  const clusterMarkerElement = screen.getByTestId("cluster-marker-point-count");
  expect(clusterMarkerElement).toHaveTextContent(pointCount.toString());
});
