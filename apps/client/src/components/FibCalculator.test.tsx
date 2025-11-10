import { render, screen } from "@testing-library/react";

import * as useFibValuesHook from "~/hooks/use-fib-values";

import FibCalculator from "./FibCalculator";

type FibValuesResponse = ReturnType<typeof useFibValuesHook.useFibValues>;

vi.mock("~/hooks/use-fib-values");
const mockUseFibValues = vi.mocked(useFibValuesHook.useFibValues);

function mockUseFibValuesResponse(data?: Partial<FibValuesResponse>) {
  mockUseFibValues.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: null,
    ...data,
  } as FibValuesResponse);
}

function setup() {
  render(<FibCalculator />);
}

beforeAll(() => {
  mockUseFibValuesResponse();
});

test("renders nothing when no data is available", () => {
  setup();
  // Should not render anything initially when query is loading
  expect(screen.queryByText("Indices I have seen:")).not.toBeInTheDocument();
  expect(screen.queryByText("No indices found, yet.")).not.toBeInTheDocument();
});

test("renders empty state when no indices found", async () => {
  mockUseFibValuesResponse({ data: { message: "success", data: [] } });
  setup();
  expect(screen.getByText("Indices I have seen:")).toBeInTheDocument();
  expect(screen.getByText("No indices found, yet.")).toBeInTheDocument();
});

test("renders list of indices when data is available", async () => {
  mockUseFibValuesResponse({ data: { message: "success", data: [3, 7, 11] } });
  setup();
  expect(screen.getByText("Indices I have seen:")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("7")).toBeInTheDocument();
  expect(screen.getByText("11")).toBeInTheDocument();
  expect(screen.queryByText("No indices found, yet.")).not.toBeInTheDocument();
});

test("renders single index correctly", async () => {
  mockUseFibValuesResponse({ data: { message: "success", data: [42] } });
  setup();
  expect(screen.getByText("Indices I have seen:")).toBeInTheDocument();
  expect(screen.getByText("42")).toBeInTheDocument();
  expect(screen.queryByText("No indices found, yet.")).not.toBeInTheDocument();
});
