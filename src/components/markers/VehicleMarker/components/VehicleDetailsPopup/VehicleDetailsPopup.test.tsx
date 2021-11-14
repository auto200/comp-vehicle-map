import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { mockVehicles } from "test/mock/vehicles";
import { VehicleDetailsPopup } from "./VehicleDetailsPopup";

const mockVehicle = mockVehicles[0];

const onPopupClose = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders VehicleDetailsPopup with close button", () => {
  render(<VehicleDetailsPopup vehicle={mockVehicle} onClose={onPopupClose} />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  userEvent.click(button);
  expect(onPopupClose).toBeCalledTimes(1);
});

test("renders VehicleDetailsPopup with vehicle details", () => {
  render(<VehicleDetailsPopup vehicle={mockVehicle} onClose={onPopupClose} />);

  const name = screen.getByText(`Name: ${mockVehicle.name}`);
  expect(name).toBeInTheDocument();

  const type = screen.getByText(`Type: ${mockVehicle.type}`);
  expect(type).toBeInTheDocument();

  const batterylevel = screen.getByText(
    `Battery level: ${mockVehicle.batteryLevelPct}%`
  );
  expect(batterylevel).toBeInTheDocument();

  const range = screen.getByText(`Range: ${mockVehicle.rangeKm}km`);
  expect(range).toBeInTheDocument();
});
