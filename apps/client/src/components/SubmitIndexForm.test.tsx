import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as useFibValuesHook from "~/hooks/use-fib-values";

import SubmitIndexForm from "./SubmitIndexForm";

type UseSubmitFibIndexResponse = ReturnType<
  typeof useFibValuesHook.useSubmitFibIndex
>;

vi.mock("~/hooks/use-fib-values");
const mockUseSubmitFibIndex = vi.mocked(useFibValuesHook.useSubmitFibIndex);

function mockUseSubmitFibIndexResponse(
  data?: Partial<UseSubmitFibIndexResponse>,
) {
  mockUseSubmitFibIndex.mockReturnValue({
    mutate: vi.fn(),
    ...data,
  } as UseSubmitFibIndexResponse);
}

function setup() {
  render(<SubmitIndexForm />);
  return userEvent.setup();
}

beforeAll(() => {
  mockUseSubmitFibIndexResponse();
});

test("renders form with heading and input field", function () {
  setup();
  expect(screen.getByText("Submit a new index")).toBeInTheDocument();
  expect(screen.getByLabelText("Enter your index:")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter a number")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Submit")).toBeInTheDocument();
});

test("input has correct attributes", function () {
  setup();
  const input = screen.getByLabelText("Enter your index:");
  expect(input).toHaveAttribute("type", "number");
  expect(input).toHaveAttribute("name", "inputField");
  expect(input).toHaveAttribute("min", "1");
  expect(input).toHaveAttribute("placeholder", "Enter a number");
});

test("submit button is disabled when input is empty", function () {
  setup();
  const submitButton = screen.getByDisplayValue("Submit");
  expect(submitButton).toBeDisabled();
});

test("submit button is enabled when input has value", async function () {
  const { type } = setup();
  const input = screen.getByLabelText("Enter your index:");
  const submitButton = screen.getByDisplayValue("Submit");

  await type(input, "5");

  expect(submitButton).not.toBeDisabled();
  expect(input).toHaveValue(5);
});

test("calls mutate with correct value when form is submitted", async function () {
  const mockMutate = vi.fn();
  mockUseSubmitFibIndexResponse({ mutate: mockMutate });
  const { type, click } = setup();

  await type(screen.getByLabelText("Enter your index:"), "7");
  await click(screen.getByDisplayValue("Submit"));

  expect(mockMutate).toHaveBeenCalledTimes(1);
  expect(mockMutate).toHaveBeenCalledWith(7);
});
