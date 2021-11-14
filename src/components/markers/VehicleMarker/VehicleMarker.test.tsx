import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { mockVehicles } from "test/mock/vehicles";
import { VehicleMarker } from "./VehicleMarker";

const mockVehicle = mockVehicles[0];

const onClick = jest.fn();
const onPopupClose = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders VehicleMarker with clickable button", () => {
  render(
    <VehicleMarker
      lat={1}
      lng={1}
      active={false}
      onClick={onClick}
      onPopupClose={onPopupClose}
      vehicle={mockVehicle}
    />
  );

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  userEvent.click(button);
  expect(onClick).toBeCalledTimes(1);
});
