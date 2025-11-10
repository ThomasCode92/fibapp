import { render, screen } from "@testing-library/react";

import * as FibCalculator from "~/components/FibCalculator";

import App from "./App";

const fibCalculatorSpy = vi
  .spyOn(FibCalculator, "default")
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

test("should render the FibCalculator component", () => {
  render(<App />);
  expect(fibCalculatorSpy).toHaveBeenCalledOnce();
});
