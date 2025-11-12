import { render, screen } from "@testing-library/react";

import * as FibCalculatedValues from "~/components/FibCalculatedValues";
import * as FibIndices from "~/components/FibIndices";

import App from "./App";

const fibIndicesSpy = vi.spyOn(FibIndices, "default").mockReturnValue(<div />); // mock to avoid invoking api calls

const fibCalculatedValuesSpy = vi
  .spyOn(FibCalculatedValues, "default")
  .mockReturnValue(<div />); // mock to avoid invoking api calls

beforeEach(() => {
  vi.clearAllMocks();
});

test("should render the correct heading and description", () => {
  render(<App />);
  const headingEl = screen.getByRole("heading", { name: /fibapp/i });
  const descriptionEl = screen.getByText(/find out the value/i);
  expect(headingEl).toBeInTheDocument();
  expect(descriptionEl).toBeInTheDocument();
});

test("should render the FibIndices component", () => {
  render(<App />);
  expect(fibIndicesSpy).toHaveBeenCalledOnce();
});

test("should render the FibCalculatedValues component", () => {
  render(<App />);
  expect(fibCalculatedValuesSpy).toHaveBeenCalledOnce();
});
