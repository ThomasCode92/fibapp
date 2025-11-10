import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import * as queries from "~/api/queries";

import FibCalculator from "./FibCalculator";

vi.mock("~/api/queries");

const { fetchAllValues } = vi.mocked(queries);

function setup() {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <FibCalculator />
    </QueryClientProvider>,
  );
}

test("renders nothing when no data is available", () => {
  fetchAllValues.mockResolvedValue({ message: "success", data: [] });
  setup();
  // Should not render anything initially when query is loading
  expect(screen.queryByText("Indices I have seen:")).not.toBeInTheDocument();
  expect(screen.queryByText("No indices found, yet.")).not.toBeInTheDocument();
});

test("renders empty state when no indices found", async () => {
  fetchAllValues.mockResolvedValue({ message: "success", data: [] });
  setup();
  expect(await screen.findByText("Indices I have seen:")).toBeInTheDocument();
  expect(screen.getByText("No indices found, yet.")).toBeInTheDocument();
});

test("renders list of indices when data is available", async () => {
  fetchAllValues.mockResolvedValue({ message: "success", data: [1, 2, 5, 8] });
  setup();
  expect(await screen.findByText("Indices I have seen:")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(screen.getByText("8")).toBeInTheDocument();
  expect(screen.queryByText("No indices found, yet.")).not.toBeInTheDocument();
});

test("renders single index correctly", async () => {
  fetchAllValues.mockResolvedValue({ message: "success", data: [42] });
  setup();
  expect(await screen.findByText("Indices I have seen:")).toBeInTheDocument();
  expect(screen.getByText("42")).toBeInTheDocument();
  expect(screen.queryByText("No indices found, yet.")).not.toBeInTheDocument();
});
