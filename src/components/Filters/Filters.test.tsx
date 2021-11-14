import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FiltersModel } from "utils/models/Filters.model";
import { Filters } from "./Filters";

const filters: FiltersModel = {
  showOnlyAvailableVehicles: true,
  vehicleMinKmRange: 50,
};
const setFilters = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders filter fields", () => {
  render(<Filters filters={filters} setFilters={setFilters} />);

  const availabilityCheckbox = screen.getByLabelText(
    "Show only available vehicles"
  );
  expect(availabilityCheckbox).toBeInTheDocument();

  const kmInput = screen.getByLabelText("Minimum range in KM");
  expect(kmInput).toBeInTheDocument();
});

test("changing filters calls setFilters", () => {
  render(<Filters filters={filters} setFilters={setFilters} />);

  const availabilityCheckbox = screen.getByLabelText(
    "Show only available vehicles"
  );
  const kmInput = screen.getByLabelText("Minimum range in KM");

  userEvent.click(availabilityCheckbox);
  expect(setFilters).toBeCalledTimes(1);

  userEvent.type(kmInput, "234");
  expect(setFilters).toBeCalledTimes(4);
});
