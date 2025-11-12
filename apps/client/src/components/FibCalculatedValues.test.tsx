import { render, screen } from "@testing-library/react";

import * as useFibValuesHook from "~/hooks/use-fib-values";

import FibCalculatedValues from "./FibCalculatedValues";

type FibCalculatedValuesResponse = ReturnType<
  typeof useFibValuesHook.useFibCalculatedValues
>;

vi.mock("~/hooks/use-fib-values");
const mockUseFibCalculatedValues = vi.mocked(
  useFibValuesHook.useFibCalculatedValues,
);

function mockUseFibCalculatedValuesResponse(
  data?: Partial<FibCalculatedValuesResponse>,
) {
  mockUseFibCalculatedValues.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: null,
    ...data,
  } as FibCalculatedValuesResponse);
}

function setup() {
  render(<FibCalculatedValues />);
}

beforeAll(() => {
  mockUseFibCalculatedValuesResponse();
});

test("renders nothing when no data is available", function () {
  setup();
  expect(screen.queryByText("Calculated Values:")).not.toBeInTheDocument();
  expect(
    screen.queryByText("No calculated values found, yet."),
  ).not.toBeInTheDocument();
});

test("renders empty state when no calculated values found", function () {
  mockUseFibCalculatedValuesResponse({
    data: { message: "success", data: {} },
  });
  setup();
  expect(screen.getByText("Calculated Values:")).toBeInTheDocument();
  expect(
    screen.getByText("No calculated values found, yet."),
  ).toBeInTheDocument();
});

test("renders list of calculated values when data is available", function () {
  mockUseFibCalculatedValuesResponse({
    data: { message: "success", data: { "5": "5", "8": "21", "10": "55" } },
  });
  setup();
  expect(screen.getByText("Calculated Values:")).toBeInTheDocument();
  expect(
    screen.getByText("For index 5, the fibonacci value is 5"),
  ).toBeInTheDocument();
  expect(
    screen.getByText("For index 8, the fibonacci value is 21"),
  ).toBeInTheDocument();
  expect(
    screen.getByText("For index 10, the fibonacci value is 55"),
  ).toBeInTheDocument();
  expect(
    screen.queryByText("No calculated values found, yet."),
  ).not.toBeInTheDocument();
});

test("renders single calculated value correctly", function () {
  mockUseFibCalculatedValuesResponse({
    data: { message: "success", data: { "7": "13" } },
  });
  setup();
  expect(screen.getByText("Calculated Values:")).toBeInTheDocument();
  expect(
    screen.getByText("For index 7, the fibonacci value is 13"),
  ).toBeInTheDocument();
  expect(
    screen.queryByText("No calculated values found, yet."),
  ).not.toBeInTheDocument();
});
