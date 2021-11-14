import { render, screen } from "@testing-library/react";
import React from "react";
import { Loader } from "./Loader";

test("renders Loader element with default text", () => {
  render(<Loader />);
  const loaderElement = screen.getByText("Loading...");
  expect(loaderElement).toBeInTheDocument();
});

test("renders Loader element with custom text", () => {
  const text = "Loading please wait...";
  render(<Loader text={text} />);
  const loaderElement = screen.getByText(text);
  expect(loaderElement).toBeInTheDocument();
});
